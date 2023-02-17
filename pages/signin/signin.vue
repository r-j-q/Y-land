<template>
	<view>
		<view class="mask" v-if="visible"></view>
		<view class="phone-wrap" v-if="visible">
			<view class="phone">
				<view class="first">绑定手机号</view>
				<view class="last">请先绑定手机号在进行操作</view>
				<button type="primary" class='bottom-phone' open-type="getPhoneNumber"
					@getphonenumber="getPhoneNumber">微信用户一键绑定</button>
			</view>
		</view>
		<view class="header-wrap">
			<view class="header">
			</view>
			<view class="content">
				<view>申请获取以下权限</view>
				<text>获得你的公开信息(昵称，头像、地区等)</text>
			</view>
			<button class="bottom" type="primary" withCredentials="true" @tap="getUserProfile">授权登录</button>
			<!-- <button type="primary" class='btn' open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">使用手机号登录</button> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				visible:false,
				getApp:"",
				geturl:"",
				deid:"",
			}
		},
		onLoad() {
		},
		onShow() {
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			console.log(routes,"routes");
			let curRoute = routes[routes.length - 2	].route //获取当前页面路由
			this.geturl = curRoute;
			this.deid = routes[routes.length - 2].options.deid;
		},
		methods: {
			getPhoneNumber(e){
				var that = this;
				if(e.detail.errMsg == "getPhoneNumber:ok"){
					uni.login({
						provider: 'weixin',
						"onlyAuthorize": true, // 微信登录仅请求授权认证
						success(res) {
							that.$http.request({
								url:"login",
								method:'POST',
								header:{
									'Content-Type':'applicktion/json',
								},
								data:{
									code:res.code,
									encryptedData: e.detail.encryptedData,
									iv: e.detail.iv,
								}
							}).then(infovalue=>{
								if(infovalue.data.code == 200){
									that.$common.showToast(infovalue.data.info);
									that.$common.setStorage("token",infovalue.data.data.token);
									console.log(that.geturl,"that.geturl");
									if(that.geturl == "pages/index/details"){
										console.log("走了一");
										uni.reLaunch({
											url:"/pages/index/details?deid="+ that.deid
										})
									}else{
										console.log("走了二");
										uni.switchTab({
											url:"/pages/index/index"
										})
									}
								}else{
									that.$common.showToast(infovalue.data.info);
								}
							})
						}
					})
				}
				if(e.detail.errMsg == "getPhoneNumber:fail user deny"){
					this.$common.showToast("您拒绝了请求，无法正常使用小程序");
				}
				console.log(e,"this.e");
			},
			getUserProfile() {
				uni.getUserProfile({
					desc: '登录',
					success: (info) => {
						console.log(info,"getuserinfo9999");
						//这里取到的是用户的信息，自己安排自己的业务
						uni.login({
							provider: 'weixin',
							success: (res) => { 
								var data = {
									code:res.code,
									userInfo:info.userInfo,
								}
								this.$http.request({
									url:"authorization",
									method:'POST',
									header: {
										'Content-Type':'applicktion/json',
									},
									data:data
								}).then(res=>{
									this.visible = true;
								})
							}
						})
					},
					fail: (err) => {
						this.$common.showToast('您拒绝了请求,不能正常使用小程序')
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.header-wrap {
		width: 90%;
		margin: 0 auto;
	}

	.mask {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: black;
		opacity: .3;
	}

	.phone-wrap {
		position: absolute;
		width: 80%;
		height: 480rpx;
		background-color: white;
		border-radius: 15rpx;
		left: 10%;
		margin-top: 220rpx;
		z-index: 100;

		.phone {
			width: 80%;
			margin: 200rpx auto 0 auto;
			text-align: center;

			.first {
				font-size: 42rpx;
				font-weight: 500;
			}

			.last {
				font-size: 26rpx;
				font-weight: 400;
				color: #9b9a9d;
				margin-top: 10rpx;
			}

			.bottom-phone {
				width: 80%;
				height: 80rpx;
				line-height: 80rpx;
				margin: 30rpx auto;
				font-size: 35rpx;
				border-radius: 60rpx;
				font-size: 30rpx;
			}
		}
	}
	.header {
		margin: 90rpx auto 90rpx auto;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 86%;
		height: 300rpx;
		line-height: 450rpx;
	}
	
	.header image {
		width: 200rpx;
		height: 200rpx;
	}
	
	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}
	
	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}
	
	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
