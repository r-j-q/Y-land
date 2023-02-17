
<template>
	<view class="content">
		<swiper class="lunb" indicator-dots indicator-color="#fff" indicator-active-color="red" autoplay interval="2000" circular>
		  <swiper-item v-for="(item,index) in swiperephoto" :key="index">
		    <view class="swiperitem"><image :src=item.img class="image"></image></view>
		  </swiper-item>
		</swiper>
		<!-- <image src="../../static/index/1.png" mode="aspectFill" class="image"></image> -->
		<view class="tion flex justify-content align" v-if="scene == 1">
			<view class="tion-wrap1" @click="listItem(2)">
				<view>默认排序</view>
				<image src="../../static/index/2.png" mode="aspectFill"></image>
			</view>
			<view class="tion-wrap2">
				<view @click="screen()">所在地</view>
				<image src="../../static/index/3.png" mode="aspectFill"></image>
			</view>
			<view class="tion-wrap1" @click="openmeas()">
				<view>土地面积</view>
				<image src="../../static/index/3.png" mode="aspectFill" class="image"></image>
			</view>
			<view class="tion-wrap3" @click="nametext()">
				<view>名称</view>
				<image src="../../static/index/3.png" mode="aspectFill" class="image"></image>
			</view>
			<!-- <view class="tion-wrap3">
				<view>更多</view>
				<image src="../../static/index/4.png" mode="aspectFill"></image>
			</view> -->
		</view>
		<view class="mian-wrap flex align" v-for="(item,index) in list" :key="index" @click="jump(index,item.id)">
			<view class="mian flex justify-content align">
				<image :src=item.cover mode="aspec0tFill"></image>
				<view class="right">
					<view class="one">{{item.name}}</view>
					<view class="two">
						<image src="../../static/index/5.png" mode="aspectFill"></image>
						<view>{{item.region[0]}}{{item.region[1]}}{{item.region[2]}}{{item.region[3]}}{{item.region[4]}}{{item.address}}</view>
					</view>
					<view class="three">
						当前价<span>￥</span><span>{{item.curr_price}}</span>
					</view>
					<view class="four">
						<view v-if="scene == 1">{{item.auction_status.name}}</view>
						<view>距离结束还剩{{item.day}}天{{item.hou}}时{{item.min}}分{{item.sec}}秒</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="tipsShow" class="tips">没有更多内容了！</view>
		<view class="picker-modal" v-if="visible || measure"></view>
		
		
		<view class="wrap" v-if="visible">
			<view class="buttonclass">
				<view class="buttonleft" @click="selcancel()">取消</view>
				<view class="buttonright" @click="selconfirm()">确认</view>
			</view>
			<view style="height: 3rpx;width: 100%;background-color: #fafafa;"></view>
			<view class="hednav" v-if="navth.length != 0">
				<view v-for="(item,index) in navth" :key="index" @click="chonav(index)" v-if="index < numlen">
					{{item.name}}</view>
			</view>
			<view class="hednav" v-if="navth.length == 0">
				<view>点击下方选择</view>
			</view>
			<view class="der-wrap">
				<view v-for="(item,index) in esop" :key="index" v-if="numlen==0" @click="altion(item.id,index,0)">
					{{item.name}}</view>
				<view v-for="(item,index) in esop" :key="index" v-if="numlen==1" @click="altion(item.id,index,1)">
					{{item.name}}</view>
				<view v-for="(item,index) in esop" :key="index" v-if="numlen==2" @click="altion(item.id,index,2)">
					{{item.name}}</view>
				<view v-for="(item,index) in esop" :key="index" v-if="numlen==3" @click="altion(item.id,index,3)">
					{{item.name}}</view>
				<view v-for="(item,index) in esop" :key="index" v-if="numlen==4" @click="altion(item.id,index,4)">
					{{item.name}}</view>
			</view>
			<view style="height: 80rpx;width: 100%;"></view>
		</view>
		
		
		
		
		<view class="frame-wrap" v-if="measure" @cancel="cancel" @confirm="confirm">
			<view class="frame">
				<input type="text" v-model="minvalue" style="text-align: center;">
				<view></view>
				<input type="text" v-model="maxvalue" style="text-align: center;">
			</view>
			<view class="bottom-button">
				<view @click="acancel()">取消</view>
				<view @click="aconfirm()">确认</view>
			</view>
		</view>
		<modal v-if="areaShow" title="输入土地名称" confirm-text="确认" cancel-text="取消" @cancel="cancelAdd" @confirm="confirmAdd">
		<input type="text" v-model="areaTxt" placeholder="请输入土地名称" class="intxt"/>
		</modal>
	</view>
</template>


<script>
import { showToast } from '../../config/common';
	export default {
		data() {
			return {
				list:[],
				end_time:[],
				ecd:'',
				measure:false,//土地面积显示隐藏
				visible:false,//三级导航隐藏显示
				current: [], // 省市区数据
				prov: [], // 省
				city: [], // 市
				country: [], // 区
				town:"",//乡
				village:"",//村落
				value: [],
				control: [0, 0, 0, 0, 0], //change数据
				province_id:"",//省数据id
				city_id:"", //市数据id
				region_id:"", //区数据id
				town_id:"",//乡id
				village_id:"",//村落id
				minvalue:"",//最小面积
				maxvalue:"",//最大面积
				endjudge:false,//peick-view滚动状态
				tipsShow:false,
				swiperephoto:"",
				tity:1,//页面数据条数
				numberdata:10,
				scene:"",
				areaShow:false,
				areaTxt:"",
				navth: [], //上放导航
				numlen: 0, //控制头部导航长度
				aroption: [],
				esop: [], //地址
				rceptlog: false
			}
		},
		onLoad() {
		},
		onShow() {
			this.getBanner();
			this.getAuctionStatus();
			this.list = [];
			this.tity =1;
			this.listItem(2);
			this.opaddress();
		},
		onReachBottom() {
			this.tity++;
			// var {}
			if(this.province_id == ''&&this.city_id == ''&& this.region_id == ''&& this.town_id == ''&& this.village_id == ''&& this.minvalue == ''&& this.maxvalue == '' &&this.areaTxt == ''){
				this.listItem(1);
			}else{
				this.listItem();
			}
			// console.log(this.tity,"this.tity");
		},
		methods: {
			
			//获取省方便  下面省市区..操作
			opaddress(id) {
				if (this.rceptlog == true) {
					this.$common.showToast("网络缓慢，请勿重复点击");
				}
				if (this.numlen < 3) {
					this.rceptlog = true
				}
				this.$http.request({
					url: "getRegionList",
					method: 'GET',
					header: {
						'Content-Type': 'multipart/form-data'
					},
					data: {
						id: id
					}
				}).then(res => {
					var that = this;
					var obj = res.data.data;
					var datares = [];
					for (var a in obj) {
						if (typeof(obj[a]) == "object") {
							datares.push(obj[a]);
							that.rceptlog = false;
						}
					}
					that.esop = datares
				})
			},
			selcancel(){
				this.visible = false;
			},
			selconfirm() {
				if (this.navth.length < 3) {
					this.$common.showToast("请选择完地区后点击确定")
				}else{
					this.visible = false;
					this.tity = 1;
					this.list = [];
					var navth = this.navth;
					this.province_id = navth[0].id;
					this.city_id = navth[1].id;
					this.region_id = navth[2].id;
					if(navth.length >= 4){
						this.town_id = navth[3].id;
					}else{
						this.town_id = "";
					};
					if(navth.length == 5){
						this.village_id = navth[4].id;
					}else{
						this.village_id = "";
					};
					var data = {
						province_id:this.province_id,
						city_id:this.city_id,
						region_id:this.region_id,
						town_id : this.town_id,
						village_id : this.village_id
					};
					this.listItem(data);
				}
				
			},
			//底部省市区选择
			altion(index, id, info) {
				if (this.rceptlog == true) {
					this.$common.showToast("网络缓慢，请勿重复点击");
					return;
				}
				var res = this.esop;
				this.opaddress(index);
				this.navth.push(res[id]);
				this.numlen = info + 1;
			},
			chonav(e) {
				// 清空头部导航  这个数据之后的数据  查询底部地址 这个位置的数据
				if (this.rceptlog == true) {
					this.$common.showToast("网络缓慢，请勿重复点击");
					return;
				}
				this.numlen = e;
				var navth = this.navth;
				//因为根据上一级查询此级的地址，所以要减一
				if (e == 0) {
					this.opaddress()
				} else {
					this.opaddress(navth[e - 1].id);
				}
				this.navth.splice(e);
			},
			nametext(){
				this.areaShow = true;
			},
			cancelAdd(){
				this.areaShow = false;
			},
			confirmAdd(){
				if(this.areaTxt == ''){
					this.$common.showToast("请输入土地名称后提交");
					return;
				}
				this.tity = 1;
				this.list = [];
				this.areaShow = false;
				this.listItem();
			},
			getAuctionStatus(){
				this.$http.request({
					url:"getAuctionStatus",
					method:'GET',
					header:{
						'Content-Type':'applicktion/json'
					}
				}).then(res=>{
					// this.globalData.scene = res.data.data.data;
					this.scene = res.data.data.data;
					getApp().globalData.scene = res.data.data.data;
				})
			},
			
			listItem(sjinfo){
				console.log(sjinfo,"sjinfo");
				var tity = this.tity;
				if(sjinfo == 1){
					var data = {
						page:tity,
						limit:10
					};
				}else if(sjinfo == 2){
					this.tity = 1;
					var lit = this.tity;
					this.list = [];
					var data = {
						page:lit,
						limit:10
					};
					this.province_id = '';
					this.city_id = '';
					this.region_id = '';
					this.town_id = '';
					this.village_id = '';
					this.minvalue = '';
					this.maxvalue = '';
					this.areaTxt = '';
					this.chonav(0)
				}else{
					var data = {
						page:tity,
						limit:10,
						province_id:this.province_id,
						city_id:this.city_id,
						region_id:this.region_id,
						town_id:this.town_id,
						village_id:this.village_id,
						a1:this.minvalue,
						a2:this.maxvalue,
						name:this.areaTxt,
					};
				}
				this.$http.request({
					url:"getLandLst",
					method:'GET',
					header:{
						'Content-Type':'multipart/form-data'
					},
					data:data
				}).then(res=>{
					if(res.data.code == 200){
						console.log(res.data.data.data.data,"res.data.data.data.data--2022")
						var info = res.data.data.data.data;
						info.forEach((item)=>{
							item.curr_price = this.$common.moneysion(item.curr_price);
							this.list.push(item);
						})
						this.tipsShow = res.data.data.data.data.length == 0 ? true : false;
						this.setTime();
					}else{
						this.$common.showToast(res.data.info);
					}
				})
				
			},
			
			
			getBanner(){
				this.$http.request({
					url:"getBanner",
					method:"GET",
					header:{
						'Content-Type':'multipart/form-data'
					},
				}).then(res=>{
					if(res.data.code == 200){
						this.swiperephoto = res.data.data.data
					}else{
						this.$common.showToast(res.data.info);
					}
				})
			},
			//滚动开始时事件
			pickstart(){
				this.endjudge = true;
			},
			//滚动结束触发
			pickend(){
				// this.endjudge = false;
			},
			openmeas(){
				this.measure = true;
			},
			//条件筛选
			screen(){
				this.visible = true;
			},
			//取消
			cancel(){
				this.visible = false;
			},
			//页面跳转 
			jump(res,deid){
				this.$common.navigateTo("./details?deid="+deid);
			},
			//倒计时
			countdown(res){
				//获取当前毫秒数
				var newTime = new Date().getTime();
				// this.list.forEach(item=>{
					for(let i=0;i<this.list.length;i++){
					//获取活动结束时间的毫秒数
					let endTime = new Date(this.list[i].end_time).getTime();
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
					this.list[i].day = obj.day;
					this.list[i].hou = obj.hou;
					this.list[i].min = obj.min;
					this.list[i].sec = obj.sec;
					this.ecd = obj.sec;
					}
				// })
				// console.log(this.list,"this.list7869");
			},
			//第一次是16秒下面就是22秒了 6秒钟的延迟
			//小于10的格式化函数
			timeFormat(param){//小于10的格式化函数
			 return param < 10 ? '0' + param : param; 
			 },
			
			setTime(){
				var that = this;
				that.countdown();
				setInterval(function(){
					that.countdown();
				},1000)	
			},
			
			
			getRegion(){
			},
			//取消面积
			acancel(){
				this.measure = false
			},
			//确认面积
			aconfirm(){
				if(isNaN(this.minvalue) == true || isNaN(this.maxvalue) == true){
					this.$common.showToast("面积请输入数字");
					return
				}
				if(this.minvalue == "undefined" || !this.minvalue){
					this.$common.showToast("请输入最小面积后点击确认");
					return
				}
				if(this.maxvalue == "undefined" || !this.maxvalue){
					this.$common.showToast("请输入最大面积后点击确认")
					return
				} 
				this.tity = 1;
				this.list = [];
				this.measure = false;
				this.listItem();
			}

		},
		
	}
</script>
<style>
	.frame-wrap{
		position: fixed;
		width: 100%;
		height: 360rpx;
		z-index: 300;
		bottom: 0;
		background-color: white;
	}
	.frame{
		width: 80%;
		height: 80rpx;
		margin: 120rpx auto 100rpx;
		/* background-color: aqua; */
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.frame input{
		width: 200rpx;
		height: 100%;
		border-radius: 10rpx;
		border: 2rpx solid cadetblue;
	}
	.frame view{
		height: 2rpx;
		background-color: cadetblue;
		width: 100rpx;
	}
	.buttonClass {
		width: 82%;
		margin: 10rpx auto;
		display: flex;
		justify-content: space-between;
		text-align: center;
		padding-top: 5px;
	}
	.buttonClass view {
		width: 22%;
		height: 56rpx;
		font-size: 26rpx;
		border-radius: 8%;
		line-height: 56rpx;
	}
	
	.buttonClass view:first-child {
		background-color: #f0f0f0;
		color: #0ea65d;
	}
	
	.buttonClass view:last-child {
		background-color: #05c160;
		color: #f5fffc;
	}
	.picker-modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
		background-color: rgba(0, 0, 0, 0.4);
	}
	.tips{
		width: 100%;
		text-align: center;
		font-size: 36rpx;
		font-family: PingFang SC;
	}
	.lunb{
		width: 100%;
		height: 346rpx;
	}
</style>
<style>
	.bottom-button{
		width: 72%;
		height: 20rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		font-size: 29rpx;
		color: #20c770;
	}
	
	page{
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}
	
	uni-picker-view {
	  display: block;
	}
	uni-picker-view .uni-picker-view-wrapper {
	  display: flex;
	  position: relative;
	  overflow: hidden;
	  height: 100%;
	  background-color: white;
	}
	uni-picker-view[hidden] {
	  display: none;
	}
	picker-view {
	  width: 100%;
	  // height: 600upx;
	  height: 400rpx;
	  margin-top: 20upx;
	}
	
	.item {
	  line-height: 100upx;
	  text-align: center;
	  font-size: 20rpx;
	}
	.parent {
			height: 560upx;
			width: 100%;
			background-color: white;
			z-index: 10;
			box-shadow: 2upx 2upx 3upx #000000;
			position: fixed;
			bottom: 0;
		}
		.parentbutton {
			width: 90%;
			height: 40upx;
			margin: 10upx auto;
			display: flex;
			justify-content: space-between;
		}
		
		.parentbutton button {
			border: 0;
			color: #1989fa;
			width: 18%;
			font-size: 26upx;
			height: 46upx;
			line-height: 46upx;
		}
		.bor {
			width: 100%;
			height: 1rpx;
			border-bottom: 1px solid #f9f9f9
			}
		.button {
			width: 90%;
			height: 90rpx;
			border-radius: 12rpx;
			font-size: 32rpx;
			font-weight: 600;
			color: white;
			border: none;
			background-color: #3e9dd9;
			line-height: 90rpx;
			margin: 50rpx auto;
			box-shadow: 6rpx 3rpx 12rpx 1rpx #e1e1e1;
		}
</style>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.flex{
		display: flex;
	}
	.justify-content{
		justify-content: space-between;
	}
	.align{
		align-items: center;
	}	
	.image{
		width: 100%;
		height: 346rpx;
	}
	.tion{
		width: 82%;
		height: 36rpx;
		margin: 37rpx auto;
		.tion-wrap1{
			width: 21%;
			height: 36rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			view{
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #000000;
				height: 100%;
			}
			image{
				margin-top: 5rpx;
				width: 17rpx;
				height: 20rpx;
			}
			.image{
				margin-top: 5rpx;
				width: 13rpx;
				height: 7rpx;
			}
		}
		
		.tion-wrap2{
			width: 16%;
			height: 36rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			view{
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #000000;
				height: 100%;
			}
			image{
				margin-top: 5rpx;
				width: 13rpx;
				height: 7rpx;
			}
		}
		.tion-wrap3{
			width: 13%;
			height: 36rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			text-align: left;
			image{
				margin-top: 5rpx;
				width: 13rpx;
				height: 7rpx;
				// margin-top: 5rpx;
				// width: 21rpx;
				// height: 22rpx;
			}
		}
	}
	.mian-wrap{
		width: 710rpx;
		height: auto;
		margin: 0 auto 20rpx auto;
		background: #FBFAFC;
		border-radius: 30rpx;
		.mian{
			margin: 30rpx auto;
			width: 650rpx;
			height: 190rpx;
			image{
				width: 190rpx;
				height: 190rpx;
				border-radius: 26rpx;
			}
			.right{
				height: 180rpx;
				width: 420rpx;
				display: flex;
				flex-direction: column;
				// align-content: space-between;
				justify-content: space-between;
				.one{
					width: 100%;
					height: auto;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #000000;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					line-clamp: 1;
					-webkit-box-orient: vertical;
				}
				.two{
					height: auto;
					display: flex;
					width: 420rpx;
					align-items: center;
					image{
						width: 20rpx;
						height: 23rpx;
						object-fit:cover;
					}
					view{
						width: 394rpx;
						margin-left: 6rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #848F9D;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
					}
				}
				.three{
					display: flex;
					// height: 33rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #848F9D;
					display: table-cell;
					vertical-align: bottom;
					span:first-child{
						margin-left: 8rpx;
						font-size: 23rpx;
						font-family: PingFang SC;
						font-weight: 800;
						color: #61AF65;
					}
					span:last-child{
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 800;
						color: #61AF65;
					}
				}
				.four{
					width: 420rpx;
					height: 34rpx;
					display: flex;
					align-items: center;
					background-color: #EFEFEF;
					:first-child{
						width: 84rpx;
						height: 100%;
						line-height: 34rpx;
						text-align: center;
						background-color: #FF9275;
						border-bottom-right-radius: 30rpx;
						border-top-right-radius: 30rpx;
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
					}
					:last-child{
						height: 34rpx;
						line-height: 34rpx;
						margin-left: 12rpx;
						font-size: 21.7rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #686868;
						width: 320rpx;
					}
				}
			}
		}
	}
	
	
	.buttonclass {
		width: 80%;
		height: 80rpx;
		display: flex;
		margin: 0 auto;
		align-items: center;
		justify-content: space-between;
	}
	
	.buttonclass view {
		width: 110rpx;
		height: 50rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
	}
	
	.buttonleft {
		text-align: left;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f0f0f0;
		color: #249964;
	}
	
	.buttonright {
		text-align: right;
		background-color: #249964;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.wrap {
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 299;
		background-color: white;
	}
	
	.mask {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: black;
		opacity: .6;
		z-index: 99;
	}
	
	.hednav {
		display: flex;
		height: 80rpx;
		margin-top: 10rpx;
	}
	
	.hednav view {
		font-size: 23rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		border-bottom: #249964 3rpx solid;
		/* #197de0 3rpx solid; */
		color: #249964;
		/* #197de0; */
		width: 18%;
		text-align: left;
		margin-left: 2%;
	
	
		/* overflow: hidden;
		text-overflow: ellipsis;
		display: flex; */
		/* -webkit-box */
		/* -webkit-line-clamp: 2;
		line-clamp: 2;
		align-items: center;
		-webkit-box-orient: vertical; */
	}
	
	.der-wrap {
		margin-top: 8rpx;
		overflow: scroll;
		height: 300rpx;
		width: 90%;
		margin: 8rpx auto;
	}
	
	.der-wrap view {
		height: 50rpx;
		line-height: 50rpx;
		color: #333333;
		font-size: 26rpx;
	}
</style>