<template>
	<view>
		<view class="Mask" v-if="visible"></view>
		<view v-if="!visible">
			<view class="title">{{ruletst.name}}</view>
			<rich-text :nodes="ruletst.content"></rich-text>
		</view>
		<view class="graph">
			<view class="flex l_signature">
				<view>甲方:</view>
				<image :src="ruletst.l_signature" mode="scaleToFill"></image>
			</view>
			<view class="flex signature">
				<view>乙方:</view>
				<image :src="ruletst.signature" mode="scaleToFill"></image>
			</view>
		</view>
		<view @click="singint()" style="display: flex;align-items: center;margin: 20rpx auto auto 460rpx;" v-if="state == 1 || state == 3">
			<view>姓名:</view>
			<view v-if="autophoto == ''" style="color: red;font-weight: 600;">点击签名</view>
			<view v-if="autophoto != ''" style="width: 200rpx;height: 100rpx;"><image :src=autophoto mode="widthFix" style="width: 100%;height: 100%;"></image></view>
		</view>
		<!-- <view>:{{}}</view> -->
		<view class="signing" @click="signing()" v-if="state == 1 || state == 3">签订合同</view>
		<!-- v-if="!visible" -->
		
		<view class="wrap" v-if="visible">
			<view class="sigh-btns">
				<button class="btn" @tap="handleCancel">取消</button>
				<button class="btn" @tap="handleReset">重写</button>
				<button class="btn" @tap="handleConfirm">确认</button>
			</view>
			<view class="sign-box">
				<canvas class="mycanvas" :style="{width:width +'px',height:height +'px'}" canvas-id="mycanvas"
					@touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"></canvas>
		
				<canvas canvas-id="camCacnvs" :style="{width:height +'px',height:width +'px'}" class="canvsborder"></canvas>
		
			</view>
		</view>
	</view>
</template>



<script>
	var x = 20;
	var y = 20;
	var tempPoint = []; //用来存放当前画纸上的轨迹点
	var id = 0;
	var type = '';
	let that;
	let canvasw;
	let canvash;
	export default{
		data(){
			return{
				visible:false,
				ctx: '', //绘图图像
				points: [], //路径点集合,
				width: 0,
				height: 0,
				autophoto:"",
				deid:"",
				ruletst:"",
				iden:"",
				land_id:"",
				state:"",
			}
		},
		onLoad(option) {
				console.log(option,"option--logoption");
				that = this;
				id = option.deid;
				this.iden = option.iden;
				this.state = option.state;
				this.land_id = option.landid;
				type = option.type;
				this.ctx = uni.createCanvasContext('mycanvas', this); //创建绘图对象
				//设置画笔样式
				this.ctx.lineWidth = 4;
				this.ctx.lineCap = 'round';
				this.ctx.lineJoin = 'round';
				this.deid = option.deid;
				uni.getSystemInfo({
					success: function(res) {
						that.width = res.windowWidth * 0.8;
						that.height = res.windowHeight * 0.85;
					}
				});
			this.getZlContractInfo(option.deid);
		},
		methods:{
			singint(){
				tempPoint = [];
				this.visible = true;
			},
			getZlContractInfo(info){
				this.$http.request({
					url:"getZlContractInfo",
					method:"GET",
					header:{
						'Content-Type': 'multipart/form-data'
					},
					data:{
						id:info
					}
				}).then(res=>{
					console.log(res,"res--2003")
					if(res.data.code == 200){
						this.ruletst = res.data.data
						console.log(this.ruletst,"ruletst");
					}else{
						this.$common.showToast(res.data.info);
					}
				})
			},
			signing(){
				console.log(tempPoint.length,"tempPoint.length");
				var that = this
				uni.showModal({
					title: '提示',
					content: '确认后签署完毕',
					success: function (res) {
						if (res.confirm) {
							if(that.autophoto == "" || !that.autophoto || that.autophoto == undefined){
								that.$common.showToast("请签名后提交")
							}else{
								var signcon;
								var photodata;
								if(that.iden == 1){
									signcon = "chzfSignContract"
									photodata = "signature"
								}else if(that.iden == 2){
									signcon = "czfSignContract"
									photodata = "l_signature"
								}
								that.$http.request({
									url:signcon,
									method:"POST",
									header:{
										'Content-Type' : 'applicktion/json'
									},
									data:{
										land_id:that.land_id,
										[photodata]:that.autophoto
									}
								}).then(res=>{
									if(res.data.code == 200){
										var that = this
										uni.showToast({
											title: res.data.info,
											duration: 1500
										});
										setTimeout(function(){
											uni.navigateBack({ //返回
												delta: 1
											});
										},2500)	
										// uni.navigateBack({	
										// 	 delta: 1
										// )}
									}else{
										uni.showToast({
											title:res.data.info,
											icon: 'none',
										})
										// that.$common.showToast(res.data.info)
									}
								})
							}
						} else if (res.cancel) {
							that.$common.showToast('取消');
							console.log('用户点击取消');
						}
					}
				});

			},
			
			
			
			
			
			
			//触摸开始，获取到起点
			touchstart: function(e) {
				let startX = e.changedTouches[0].x;
				let startY = e.changedTouches[0].y;
				let startPoint = {
					X: startX,
					Y: startY
				};
			
				/* **************************************************
				    #由于uni对canvas的实现有所不同，这里需要把起点存起来
				 * **************************************************/
				this.points.push(startPoint);
			
				//每次触摸开始，开启新的路径
				this.ctx.beginPath();
			},
			
			//触摸移动，获取到路径点
			touchmove: function(e) {
				let moveX = e.changedTouches[0].x;
				let moveY = e.changedTouches[0].y;
				let movePoint = {
					X: moveX,
					Y: moveY
				};
				this.points.push(movePoint); //存点
				let len = this.points.length;
				if (len >= 2) {
					this.draw(); //绘制路径
				}
				tempPoint.push(movePoint);
			},
			
			// 触摸结束，将未绘制的点清空防止对后续路径产生干扰
			touchend: function() {
				this.points = [];
			},
			
			/* ***********************************************	
			#   绘制笔迹
			#   1.为保证笔迹实时显示，必须在移动的同时绘制笔迹
			#   2.为保证笔迹连续，每次从路径集合中区两个点作为起点（moveTo）和终点(lineTo)
			#   3.将上一次的终点作为下一次绘制的起点（即清除第一个点）
			************************************************ */
			draw: function() {
				let point1 = this.points[0];
				let point2 = this.points[1];
				this.points.shift();
				this.ctx.moveTo(point1.X, point1.Y);
				this.ctx.lineTo(point2.X, point2.Y);
				this.ctx.stroke();
				this.ctx.draw(true);
			},
			
			handleCancel() {
				that.ctx.clearRect(0, 0, that.width, that.height);
				that.ctx.draw(true);
				tempPoint = [];
				this.visible = false;
				// uni.navigateBack({
				// 	delta: 1
				// });
			},
			
			//清空画布
			handleReset: function() {
				console.log('handleReset');
				that.ctx.clearRect(0, 0, that.width, that.height);
				that.ctx.draw(true);
				tempPoint = [];
			},
			
			//将签名笔迹上传到服务器，并将返回来的地址存到本地
			handleConfirm: function() {
				if (tempPoint.length == 0 ||!tempPoint ||tempPoint == undefined ||tempPoint == '') {
					uni.showToast({
						title: '请先签名',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				console.log(tempPoint,"请先签名");
				uni.canvasToTempFilePath({
					canvasId: 'mycanvas',
					success: function(res) {
						let tempPath = res.tempFilePath;
						console.log(tempPath,"let tempPathz6")
						const ctx = uni.createCanvasContext('camCacnvs', that);
						ctx.translate(0, that.width);
						ctx.rotate((-90 * Math.PI) / 180);
						ctx.drawImage(tempPath, 0, 0, that.width, that.height);
						ctx.draw();
						setTimeout(() => {
			
							//保存签名图片到本地
							uni.canvasToTempFilePath({
									canvasId: 'camCacnvs',
									success: function(res) {
										console.log(res, "success-log")
										//这是签名图片文件的本地临时地址
										if (res.errMsg == "canvasToTempFilePath:ok") {
											let path = res.tempFilePath;
											that.uploadphoto(path);
											
										}
									},
									fail: err => {
										console.log('fail', err);
									}
								},
								this
							);
						}, 200);
					}
				});
			},
			uploadphoto(res) {
				var that = this;
				uni.uploadFile({
					url: 'https://tdpm.shningmi.com/applet/uploads',
					filePath: res,
					name: 'file',
					success: (uploadFileRes) => {
						var data = JSON.parse(uploadFileRes.data);
						// console.log(uploadFileRes, "uploadFileRes图片查看");
						if(data.code == 200){
							that.autophoto = data.data.url;
							that.visible = false;
							console.log(data,"data图片查看");
						}else{
							console.log("失败");
							that.$common.showToast(data.info)
						}
					}
				});
			}
			
		}
	}
</script>

<style>
	.graph{
		width: 100%;
		height: auto;
		margin: 20rpx auto;
	}
	.l_signature{
		width: auto;
		align-items: center;
		height: 80rpx;
	}
	.l_signature image{
		width: 120rpx;
		height: 60rpx;
	}
	.signature{
		width: auto;
		height: 80rpx;
		margin-top: 10rpx;
	}
	
	.signature image{
		align-items: center;
		width: 120rpx;
		height: 60rpx;
	}
	.flex{
		display: flex;
	}
	.Mask{
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 99;
		background-color: #FFFFFF;
	}
	.signing{
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
		margin-top: 130rpx;
	}
	
	.wrap{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		position: fixed;
		top: 0;
		z-index: 100;
	}
	.container {
		display: flex;
		flex-direction: row;
	}
	
	.sign-box {
		width: 80%;
		height: 90%;
		margin: auto;
		display: flex;
		flex-direction: column;
		text-align: center;
	}
	
	.sign-view {
		height: 100%;
	}
	
	.sigh-btns {
		height: 100%;
		margin: auto;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	
	.btn {
		margin: auto;
		padding: 8rpx;
		transform: rotate(90deg);
		border: grey 1rpx solid;
	}
	
	.mycanvas {
		margin: auto 0rpx;
		background-color: #ececec;
	}
	
	.canvsborder {
		border: 1rpx solid #333;
		position: fixed;
		top: 0;
		left: 10000rpx;
	}
	.title{
		font-size: 38rpx;
		color: 000;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		width: 100%;
		margin: 50rpx auto;
		text-align: center;
	}
</style>