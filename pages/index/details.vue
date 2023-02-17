
<template>
	<view>
		<view class="mask" v-if="visible"></view>
		<view class="bond-wrap" v-if="visible">
			<view class="top" @click="jumprule()">
				<view>支付保证金即表示同意《保证金规则》《竞拍规则》</view>
				<image src="../../static/index/16.png" mode="aspectFill"></image>
			</view>
			<view class="payment" @click="paymentBond()">去支付保证金</view>
			<view class="bottom-line"></view>			
			<view class="bond-bottom" @click="cancel()">取消</view>
		</view>
		<swiper class="lunb" indicator-dots indicator-color="#fff" indicator-active-color="red" autoplay interval="2000" circular>
		  <swiper-item v-for="(item,index) in listItem.slider" :key="index">
		    <view class="swiperitem"><image :src=item mode="aspectFill" class="header-top"></image></view>
		  </swiper-item>
		</swiper>
		<view class="time">
			<view class="left">
				<view>
					<view class="one" v-if="scene == 1">{{listItem.auction_status.name}}</view>
					<view class="two">
						当前价:
					</view>
				</view>
				<view class="span-wrap">
					￥<span>{{listItem.curr_price}}</span>
				</view>
				<!-- <span>￥</span><span>{{listItem.start_price}}</span> -->
			</view>
			<view class="right-wrap">
				<view class="right">
					<view class="one">距离结束还剩</view>
					<view class="two">
						<view class="kuang">{{end_time.day}}</view>
						<view class="kuang-view">天</view>
						<view class="kuang">{{end_time.hou}}</view>
						<view class="dian">:</view>
						<view class="kuang">{{end_time.min}}</view>
						<view class="dian">:</view>
						<view class="kuang">{{end_time.sec}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="title-wrap" v-if="scene == 1">
			<!-- <view class="title">{{listItem.remark}}</view> -->
			<view class="mian">
				<view>{{listItem.region[0]}}{{listItem.region[1]}}{{listItem.region[2]}}{{listItem.region[3]}}{{listItem.region[4]}}{{listItem.town}}{{listItem.village}}{{listItem.address}}</view>
				<image src="../../static/index/9.png" mode="aspectFit" @click="handleMapLocation()"></image>
			</view>
		</view>
		<view class="offer-wrap" v-if="scene == 1">
			<view class="offer">
				<view>出价记录({{cjrecord.length}})</view>
				<view>
					<view @click="seeall()">查看全部</view>
					<view></view>
				</view>
			</view>
			<view class="record" v-for="(item,index) in cjrecord" :key="index" v-if="index <3">
				<view class="img"><image :src=item.headimg mode="aspectFill"></image></view>
				<view class="name">{{item.nickname}}</view>
				<view :class="index == 0 ? 'money' : 'money1'">￥{{item.price}}</view>
				<view :class="[index== 0? 'frbutton':'stbutton']">
					<view v-if="index == 0">领先</view>
					<view v-if="index != 0">出局</view>
				</view>
				<view :class="index == 0 ? 'times' : 'times1'">{{item.create_at}}</view>
			</view>
			
		</view>
		
		<view class="mation" v-if="scene == 1">
			<view class="title">拍卖信息</view>
			<view class="mian">
				<view class="one">
					保证金:￥{{listItem.margin}}
				</view>
				<view style="display: flex;width: auto;">
					<view class="two">
						<view>起拍价：￥{{listItem.start_price}}</view>
						<view>拍卖方式：{{listItem.auction_type_name}}</view>
					</view>
					<view class="two">
						<view>加价幅度：￥{{listItem.add_price}}</view>
						<view>延迟周期：{{listItem.delay_period}}分钟一次</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="details-wrap">
			<view class="details-title6"><view v-if="scene == 1">拍品详情</view><view v-else>商品详情</view><button class="separate-fl" plain="true" :data-id=land_id data-name="shareBtn" open-type="share">分享</button></view>
			<view class="details-title">{{listItem.name}}</view>
			<view class="details-title1" v-if="scene == 1">面积:{{listItem.acreage}}平方米</view>
			<view class="details-title1" v-if="scene == 1 && listItem.remark">备注:{{listItem.remark}}</view>
			<view class="details-title1" v-if="scene == 1">前瞻作物:{{listItem.plant}}</view>
			<view class="details">
				<rich-text :nodes="listItem.content"></rich-text>
				<!-- <view class="cont">{{listItem.content}}</view> -->
				<image :src=listItem.cover mode="widthFix" style="width: 100%;margin: 20rpx auto;"></image>
				<view style="width: 100%;height: auto;" v-for="(item,index) in listItem.slider" :key="index">
					<image :src=item mode="widthFix" style="width: 100%;margin: 20rpx auto;"></image>
				</view>
				<view style="margin-bottom: 30rpx;"></view>
			</view>
		</view>
		<view style="width: 100%;height: 200rpx;"></view>
		<view class="bottom-button">
			<!-- @click="participate()" -->
			<view class="ton" @click="dialogue()"><view v-if="scene == 1">参与竞拍</view><view v-else>购买商品</view></view>
		</view>
		<modal v-if="areaShow" title="出价金额" confirm-text="竞拍" cancel-text="取消" @cancel="cancelAdd" @confirm="confirmAdd">
		<input type="text" v-model="areaTxt" placeholder="请输入金额(元)" class="intxt"/>
		</modal>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				listItem:"",
				end_time:{
					day:"",
					hou:"",
					min:"",
					sec:""
				},
				areaTxt:"",//竞拍金额
				areaShow:false,
				visible:false,
				cjrecord:"",//出价记录
				ajudge:"1",//全部出价记录是否跳转
				land_id:"",
				res:"",
				log:"",//经度
				lat:"",//纬度
				scene:"",
			}
		},
		onLoad(option) {
			this.details(option.deid);
			console.log(option.deid,"option.deid");
			this.land_id = option.deid;
			// this.details(1)
			this.bidRecord(option.deid);
		},
		
		//内容分享
		 onShareAppMessage: function( options ){
		      console.log('options??',options)
		      var that = this;
		      // 设置菜单中的转发按钮触发转发事件时的转发内容
		      var shareObj = {
		        title: that.listItem.name,    // 默认是小程序的名称(可以写slogan等)
		        path: '/pages/index/details?deid='+eData.id,    // 默认是当前页面，必须是以‘/'开头的完整路径
		        imageUrl: '',   //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
		        success: function(res){
		          // 转发成功之后的回调
		          if(res.errMsg == 'shareAppMessage:ok'){
					  that.$common.showLoading("转发成功了!");
		          }else{
					  that.$common.showLoading("转发失败");
				  }
		        },
		        fail: function(){
		          // 转发失败之后的回调
		          if(res.errMsg == 'shareAppMessage:fail cancel'){
		            // 用户取消转发
		          }else if(res.errMsg == 'shareAppMessage:fail'){
		            // 转发失败，其中 detail message 为详细失败信息
		          }
		        }
		    };
		      // 来自页面内的按钮的转发
		      if( options.from == 'button' ){
		        var eData = options.target.dataset;
		        // 此处可以修改 shareObj 中的内容
		        shareObj.path = '/pages/index/details?deid='+eData.id;
		      }
		      // 返回shareObj
		      return shareObj;
		    },
		
		onShow() {
			this.getAuctionStatus();
			// this.scene = getApp().globalData.scene;
		},
		methods:{
			getAuctionStatus(){
				this.$http.request({
					url:"getAuctionStatus",
					method:'GET',
					header:{
						'Content-Type':'applicktion/json'
					}
				}).then(res=>{
					this.scene = res.data.data.data;
				})
			},
			//参与竞拍
			dialogue(){
				if(this.listItem.auction_status.name != "拍卖中"){
					 this.$common.showToast(this.listItem.auction_status.name);
					 return;
				}
				this.$http.request({
						 url:"isMargin",
						 method:"GET",
						 header:{
							 'Content-Type':'applicktion/json'
						 },
						 data:{
							 land_id:this.land_id,
						 }
					}).then(res=>{
						if(res.data.code == 202){
							//202 没有缴纳保证金
							this.visible = true;
						}else if(res.data.code == 200){
							this.areaShow = true;
						}else{
							that.$common.showToast(res.data.info)
						}
					})
			},
			//取消
			 cancelAdd(){
				 this.areaShow = false;
			 },
			 //确定
			 confirmAdd(){
				 var that = this;
				 uni.showModal({
				 	title: '提示',
				 	content: '确认竞拍吗?',
				 	success: function (res) {
				 		if (res.confirm) {
				 			if(that.areaTxt && isNaN(that.areaTxt) == false){
								 console.log(that.land_id,"that.land_id");
								that.$http.request({
									 url:"addLandBid",
									 method:"POST",
									 header:{
										 'Content-Type':'applicktion/json'
									 },
									 data:{
										 land_id:that.land_id,
										 price:that.areaTxt
									 }
								}).then(res=>{
									if(res.data.code == 200){
										that.bidRecord(that.land_id);
										that.details(that.land_id);
										that.$common.showToast(res.data.info);
									}else{
										that.$common.showToast(res.data.info);
									}
										that.areaShow = false;
								})
				 			}else{
								 that.$common.showToast('请输入数字拍卖金额');
								 return;
				 			}
				 		} else if (res.cancel) {
							that.areaShow = false;
				 			that.$common.showToast("取消");
				 		}
				 	}
				 });
			 },
			//跳转规则页面
			jumprule(){
				this.$common.navigateTo("/pages/index/rule?deid="+this.land_id+"&state="+ 1);
			},
			//支付保证金 获取订单号
			paymentBond(){
				this.$http.request({
					url:"isAgreeRule",
					method:"GET",
					header:{
						'Content-Type':'applicktion/json'
					},
					data:{
							land_id:this.land_id
					}
				}).then(res=>{
					//未同意保证金规则
					console.log(res.data.code,res,"res.data.code--land_id");
					if(res.data.code == 202){
						this.$common.navigateTo("/pages/index/rule?deid="+this.land_id+"&state="+ 2);	
					}else if(res.data.code == 200){
						console.log(res,"已经同意")
						this.addMargin();
					}else{
						this.$common.showToast(res.data.info)
					}
				})
			},
			//添加购买订单
			addMargin(){
				this.$http.request({
						url:"addMargin",
						method:"POST",
						header:{
							'Content-Type':'applicktion/json'
						},
						data:{
							land_id:this.land_id
						}
					}).then(res=>{
						if(res.data.code == 200){
							this.ordernumber(res.data.data.order_no);
						}else{
							this.visible = false;
							uni.showToast({
								title:res.data.info,
								icon: 'none',
								duration: 3500
							});
						}
					})	
			},
			//微信支付
			ordernumber(res){
				this.$http.request({
					url:"preparedPay",
					method:"POST",
					header:{
						'Content-type': 'application/x-www-form-urlencoded',
					},
					data:{
						order_no:res
					}
				}).then(logres=>{
					var that = this;
					if(logres.data.code == 201){
						that.$common.showToast(logres.data.info);
					}
					if(logres.data.code == 200){
						var res = logres.data.data;
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: res.timeStamp,
							nonceStr: res.nonceStr,
							package: res.package,
							signType: res.signType,
							paySign: res.sign,
							success: function (res) {
								uni.showToast({
									title: '支付成功!',
									duration: 2000
						             });
								that.visible = false;
							},
							fail: function (err) {
								uni.showToast({
									title: '支付失败',
									duration: 2000,
									icon:'none'
								     });
							}
						});
					}else{
						that.$common.showToast(logres.data.info)
					}
				})
			},
			//参与
			participate(){
				this.visible = true;
			},
			//取消
			cancel(){
				this.visible = false;
			},
			//查看全部
			seeall(){
				if(this.ajudge == 1){
					this.$common.showToast('这里是全部出价记录了');
				}else if(this.ajudge == 2){
					this.$common.navigateTo('../index/morerecord?id='+this.land_id)
				}
			},
			//出价记录
			bidRecord(reslog){
				this.$http.request({
					url:"getLandBidLst",
					method:'GET',
					header:{
						'Content-Type' : 'applicktion/json'
					},
					data:{
						land_id:reslog,	
						page:"1",	
						limit:"10"
					}
				}).then(res=>{
					if(res.data.code == 200){
						res.data.data.data.forEach(item=>{
							item.price = this.$common.moneysion(item.price);
						})
						this.cjrecord = res.data.data.data;
						if(res.data.data.data.length > 3){
							this.ajudge = 2;
						}
					}else{
						this.$common.showToast(res.data.info);
					}
				})
			},
			setTime(){
				var that = this;
				that.countdown();
				setInterval(function(){
					that.countdown();
				},1000)	
			},
			
			countdown(res){
				//获取当前毫秒数
				var newTime = new Date().getTime();
					// for(let i=0;i<this.list.length;i++){
					//获取活动结束时间的毫秒数
					let endTime = new Date(this.listItem.end_time).getTime();
					let obj = {};
					//活动时间未结束，对时间进行处理
					if(endTime - newTime > 0){
						let time = (endTime - newTime) / 1000;
						let day = parseInt(time / (60 * 60 * 24));
						let hou = parseInt(time % (60 * 60 * 24) / 3600);
						let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
						let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
						obj = {
						   day: this.timeFormat(day),
						   hou: this.timeFormat(hou),
						   min: this.timeFormat(min),
						   sec: this.timeFormat(sec)
						  }
					}else{
						 obj = {
						   day: '00',
						   hou: '00',
						   min: '00',
						   sec: '00'
						  }
					}
					this.end_time.day = obj.day;
					this.end_time.hou = obj.hou;
					this.end_time.min = obj.min;
					this.end_time.sec = obj.sec;
					this.ecd = obj.sec;
					// }
				// })
				// console.log(this.list,"this.list7869");
			},
			//第一次是16秒下面就是22秒了 6秒钟的延迟
			//小于10的格式化函数
			timeFormat(param){//小于10的格式化函数
			 return param < 10 ? '0' + param : param; 
			 },
			
			
			details(id){
				uni.showLoading({
					title:"加载中..."
				})
				this.$http.request({
					url:"getLandInfo",
					method:'GET',
					header:{
						'Content-Type' : 'multipart/form-data'
					},
					data:{
						id:id
					}
				}).then(res=>{
					if(res.data.code == 200){
						res.data.data.curr_price = this.$common.moneysion(res.data.data.curr_price);
						this.listItem = res.data.data;
						console.log(this.listItem,"this.listItem");
						this.setTime();
					}else{
						this.$common.showToast(res.data.info)
					}
					uni.hideLoading();
				})
			},
			//地图导航
			handleMapLocation() {
				console.log('进入导航')
				//  经纬度暂时写死，后面介入数据
				let latitude = Number(this.listItem.lat);
				let longitude = Number(this.listItem.lng);
				let address = this.listItem.region[0]+this.listItem.region[1]+this.listItem.region[2];
				// 获取定位信息
					uni.openLocation({
						// 传入你要去的纬度
						latitude: latitude,
						// 传入你要去的经度
						longitude: longitude,
						// 传入你要去的地址信息 不填则为空
						address: address,
						// 缩放大小
						scale: 18,
						success: function() {
							console.log('成功的回调success');
						}
					});
			},
			

		}
	}
</script>
<style lang="less">
	
	.details-title6{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 41rpx auto 25rpx auto;
		width: 670rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 800;
		color: #333333;
	}
	
	
	.separate-fl{
		width: auto;
		height: auto;
		font-size: 23rpx;
		font-family: PingFang SC;
		text-align: right;
		margin: 0;
		padding: 0;
	}
	.separate-fl[plain]{ 
		border:0;
		color: #249964;
	}
	
	.lunb{
		width: 100%;
		height: 360rpx;
	}
	.mask{
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 100;
		background-color: black;
		opacity: .5;
	}
	.bond-wrap{
		width: 100%;
		height: auto;
		background-color: white;
		position: fixed;
		bottom: 0;
		z-index: 120;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		.bond-bottom{
			width: 100%;
			height: 66rpx;
			text-align: center;
			line-height: 66rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
			font-size: 26rpx;
		}
		.bottom-line{
			width: 100%;
			height: 10rpx;
			background: #D3D3D3;
		}
		.payment{
			width: 100%;
			height: 90rpx;
			font-size: 26rpx;
			background: #FFFFFF;
			font-family: PingFang SC;
			font-weight: 800;
			color: #64B067;
			text-align: center;
			line-height: 90rpx;
			border-top: 2rpx solid #999999;
		}
		.top{
			display: flex;
			align-items: center;
			width:100%;
			justify-content: center;
			margin: auto;
			height: 90rpx;
			font-size: 23rpx;
			color: #999999;
			image{
				width: 27rpx;
				height: 27rpx;
				margin-left: 8rpx;
			}
		}
		
	}
	.cont{
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		margin: 0 auto;
		word-wrap:break-word;
	}
</style>

<style lang="scss" scoped>
	.span-wrap{
		height: auto;
		margin: 26rpx 0 0 6rpx;
		font-size: 30rpx;
		color: white;
		span:last-child{
			font-size: 46rpx;
		}
	}
	
	.kuang-view{
		font-size: 22rpx;
		margin: 0 2rpx;
	}
	.header-top{
		width: 100%;
		height: 360rpx;
		display:block;
	}
	.time{
		width: 100%;
		height: 123rpx;
		overflow: hidden;
		background-color: #64B067;
		display: flex;
		align-items: center;
		justify-content: center;
		.left{
			width: 461rpx;
			height: 78rpx;
			margin-left: 40rpx;
			display: flex;
			align-content: space-between;
			.one{
				width: 100rpx;
				height: 36rpx;
				background: #FFFFFF;
				border-radius: 4rpx;
				font-size: 23rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #64B067;
				text-align: center;
				line-height: 36rpx;
			}
			.two{
				font-size: 22rpx;
				height: 46rpx;
				color: white;
				display: table-cell;
				vertical-align: bottom;
			}
		}
		.right-wrap{
			width: 249rpx;
			height: 123rpx;
			display: flex;
			align-items: center;
			background-color: #FBE4AA;
			.right{
				width: 249rpx;
				height: 86rpx;
				margin-left: 30rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.one{
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #000000;
				}
				.two{
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					width: auto;
					align-items: center;
					.kuang{
						width: 37rpx;
						height: 37rpx;
						background-color: #000000;
						text-align: center;
						line-height: 37rpx;
						font-size: 23rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
					}
					.dian{
						height: 37rpx;
						display: flex;
						align-items: center;
					}
				}
			}
		}
	}
	.title-wrap{
		width: 100%;
		height: auto;
		background-color: #FFFFFF;
		overflow: hidden;
		.title{
			width: 670rpx;
			margin: 37rpx auto 0 auto;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #333333;
		}
		.mian{
			width: 670rpx;
			height: 46rpx;
			margin: 27rpx auto 30rpx auto;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			view:first-child{
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}
			image{
				width: 46rpx;
				height: 46rpx;
			}
		}
	}
	.offer-wrap{
		width: 750rpx;
		height: 314rpx;
		background: #FFFFFF;
		overflow: hidden;
		margin-top: 20rpx;
		.offer{
			width: 670rpx;
			height: 41rpx;
			margin: 37rpx auto 19rpx auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			:first-child{
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 800;
				color: #333333;
			}
			:last-child{
				width: 110rpx;
				height: 23rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				:first-child{
					height: 24rpx;
					line-height: 23rpx;
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
				}
				:last-child{
					width: 11rpx;
					height: 11rpx;
					border: 1px solid #999999;
					border-left: none;
					border-bottom: none;
					transform: rotate(45deg);
				}
			}
		}
	}
	.record{
		width: 670rpx;
		height: 49rpx;
		display: flex;
		align-items: center;
		margin: 18rpx auto 0 auto;
		.img{
			width: 49rpx;
			height: 49rpx;
			border-radius: 100%;
			image{
				width: 100%;
				height: 100%;
				border-radius: 100%;
			}
		}
		.name{
			width: 120rpx;
			height: 49rpx;
			line-height: 49rpx;
			margin-left: 12rpx;
			font-size: 24rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #000000;
			overflow:hidden;
			 white-space:nowrap; 
			text-overflow:ellipsis;
		}
		.money{
			width: 176rpx;
			text-align: center;
			height: 49rpx;
			line-height: 49rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #FF9275;
		}
		.money1{
			width: 176rpx;
			text-align: center;
			height: 49rpx;
			line-height: 49rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #999999;
		}
		.times{
			height: 24rpx;
			font-size: 22rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #333333;
			margin-left: 15rpx;
		}
		.times1{
			height: 24rpx;
			font-size: 22rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #999999;
			margin-left: 15rpx;
		}
	}
	.frbutton{
			width: 80rpx;
			height: 40rpx;
			background: #FF9275;
			border-radius: 20rpx;
			font-size: 21rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
			line-height: 40rpx;
		}
	.stbutton{
			width: 80rpx;
			height: 40rpx;
			border-radius: 20rpx;
			font-size: 21rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #999999;
			text-align: center;
			line-height: 40rpx;
		}
	.mation{
		width: 750rpx;
		height: 251rpx;
		margin-top: 20rpx;
		background: #FFFFFF;
		overflow: hidden;
		.title{
			width: 670rpx;
			margin: 32rpx auto 20rpx auto;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #333333;
		}
		.mian{
			width: 670rpx;
			margin: 0 auto;
			height: 109rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.one{
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}
			.two{
				width: 100%;
				height: 180rpx;
				display: flex;
				align-content: center;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				display: table-cell;
				vertical-align: bottom;
				view{
					width: 100%;
					margin-top: 13rpx;
				}			
			}
		}
	}
	.details-wrap{
		margin-top: 20rpx;
		width: 100%;
		height: auto;
		background-color: #FFFFFF;
		overflow: hidden;
		.details-title{
			margin: 41rpx auto 25rpx auto;
			width: 670rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #333333;
		}
		.details-title1{
			margin: 10rpx auto 25rpx auto;
			width: 670rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #333333;
		}
		.details{
			width: 670rpx;
			height: auto;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			margin: 0 auto;
		}
	}
	.bottom-button{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 98rpx;
		background-color: white;
		bottom:0;
		margin-top: 40rpx;
		overflow: hidden;
		.ton{
			width: 672rpx;
			height: 81rpx;
			line-height: 81rpx;
			margin: 8.5rpx auto;
			background: #64B067;
			border-radius: 10rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			text-align: center;
		}
	}
</style>
<style>
	page{
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		background-color: #EFEFEF;;
	}
</style>

<!-- // this.$http.request({
				// 	url:"addMargin",
				// 	method:"POST",
				// 	header:{
				// 		'Content-Type':'applicktion/json'
				// 	},
				// 	data:{
				// 		land_id:this.land_id
				// 	}
				// }).then(res=>{
				// 	if(res.data.code == 200){
				// 		this.ordernumber(res.data.data.order_no);
				// 	}else if(res.data.code == 203){
				// 		uni.navigateTo({
				// 			url:"/pages/index/contract?id="+this.land_id
				// 		})
				// 	}else{
				// 		this.visible = false;
				// 		uni.showToast({
				// 			title:res.data.info,
				// 			icon: 'none',
				// 			duration: 3500
				// 		});
				// 		// this.$common.showToast(res.data.info);
				// 	}
				// }) -->