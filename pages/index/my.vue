<template>
	<view>
		<view class="header-wrap">
			<view class="header">
				<view class="left">
					<image :src=user.headimg mode="aspectFill"></image>
				</view>
				<view class="right">{{user.username}}</view>
			</view>
		</view>
		<!-- <button class="avatar-btn" open-type="chooseAvatar" @chooseavatar="changeAvatar"> -->
					<!-- <img :src="avatar" class="avatar-img" />获取微信头像 <img :src="avatar" class="avatar-img" /> -->
		<!-- </button> -->
		

		<view class="mian-wrap">
			<view class="top" @click="jump(1)" v-if="scene == 1">
				<view class="left">
					<image src="../../static/index/6.png" mode="aspectFit"></image>
					<view>我要出让土地承包权</view>
				</view>
				<view class="right"></view>
			</view>
			<view class="middle" @click="jump(2)" v-if="scene == 1">
				<view class="left">
					<image src="../../static/index/7.png" mode="aspectFit"></image>
					<view>我参与的拍卖</view>
				</view>
				<view class="right"></view>
			</view>
			<view class="middle" @click="jump(3)">
				<view class="left">
					<image src="../../static/index/21.png" mode="aspectFit"></image>
					<view>身份信息<text style="font-size: 23rpx;margin-left: 16rpx;color: darkorange;">{{statetext}}</text></view>
				</view>
				<view class="right"></view>
			</view>
			<view class="middle" @click="jump(5)" v-if="scene == 1">
				<view class="left">
					<image src="../../static/index/22.png" mode="aspectFit"></image>
					<view>我出让的土地拍卖权</view>
				</view>
				<view class="right"></view>
			</view>
			<view class="middle" @click="jump(6)" v-if="scene == 1">
				<view class="left">
					<image src="../../static/index/23.png" mode="aspectFit"></image>
					<view>我的承租合同</view>
				</view>
				<view class="right"></view>
			</view>
			<view class="middle" @click="jump(7)" v-if="scene == 1">
				<view class="left">
					<image src="../../static/index/25.png" mode="aspectFit"></image>
					<view>我的出租合同</view>
				</view>
				<view class="right"></view>
			</view>
			<view class="bottom" @click="jump(4)">
				<view class="left">
					<image src="../../static/index/8.png" mode="aspectFit"></image>
					<view>我的客服</view>
				</view>
				<view class="right">{{phone}}</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				user:{
					headimg:"",
					username:"",
				},
				phone:"",
				scene:"",
				avatar:"",
				//审核状态
				statetext:"",
			}
		},
		onLoad() {
			// this.getUserInfo();
		},
		onShow() {
			this.getUserInfo();
			this.getCardInfo();//获取认证信息
			this.getAuctionStatus();
		},
		onHide() {
			this.getCardInfo();//获取认证信息
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
			changeAvatar(e){
				this.avatar = e.detail.avatarUrl;
			},
			//认证信息
			getCardInfo(){
				this.$http.request({
					url:"getCardInfo",
					method:'GET',
					header:{
						'Content-Type': 'applicktion/json'
					}
				}).then(res=>{
					if(res.data.code == 200){
						getApp().globalData.statusid = res.data.data.status;
						if(res.data.data.status == 0){
							this.statetext = "审核中"
						};
						if(res.data.data.status == 1){
							this.statetext = "审核成功"
						};
						if(res.data.data.status == 2){
							this.statetext = "审核失败，请重新填写"
						};
					}else{
						this.$common.showToast(res.data.info);
					}
				})
			},
			//用户信息
			getUserInfo(){
				this.$http.request({
					url:"getUserInfo",
					method:"GET",
					header:{
						'Content-Type': 'applicktion/json'
					}
				}).then(res=>{
					if(res.data.code == 200){
						this.phone = res.data.data.tel;
						this.user.headimg = res.data.data.user.headimg;
						this.user.username = res.data.data.user.nickname;
					}else{
						this.$common.showToast(res.data.info)
					}
				})
			},
			jump(res){
				if(res == 1){
					var get = getApp().globalData.statusid;
					if(get == 1){
						this.$common.navigateTo("/pages/index/addland");
					}else{
						this.$common.showToast("请先完善下面身份信息后进入")
					}
				}
				if(res == 2){
					this.$common.navigateTo("/pages/index/participate");
				}
				if(res == 3){
					this.$common.navigateTo("/pages/index/identity");
				}
				if(res == 5){
					this.$common.navigateTo("/pages/index/sold");
				}
				if(res == 6){
					this.$common.navigateTo("/pages/signcontract/contractlist");
				}
				if(res == 7){
					this.$common.navigateTo("/pages/signcontract/czcontractlist");
				}
				//测试完记得删除
				if(res == 4){
						uni.makePhoneCall({
							// 手机号
							phoneNumber: this.phone,
							// 成功回调
							success: (res) => {
								console.log('调用成功!')
							},
							// 失败回调
							fail: (res) => {
								this.$common.showToast("拨打失败");
								console.log('调用失败!')
								// this.jump(4);//重复调用一次
							}
						});
				}
				// else{
				// 	this.$common.navigateTo("/pages/index/contract");
				// }
			}
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		background-color: #EFEFEF;;
	}
</style>
<style lang="scss" scoped>
	.mian-view{
		margin: 0 auto;
		width: 90%;
		height: 140rpx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.left{
			display: flex;
			align-items: center;
			image{
				width: 38rpx;
				height: 26rpx;
			}
			view{
				font-size: 28px;
				font-family: PingFang SC;
				font-weight: 500;
				margin-left: 26rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #000000;
			}
		}
	}
	.arrow{
		width: 12rpx;
		height: 12rpx;
		border: 1px solid #000000;
		border-left: none;
		border-bottom: none;
		transform: rotate(45deg);
	}
	.header-wrap{
		width: 100%;
		height: 180rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		.header{
			margin: 0 auto;
			width: 90%;
			height: 89rpx;
			display: flex;
			align-items: center;
			.left{
				width: 89rpx;
				height: 89rpx;
				border-radius: 100%;
				// border: 1rpx solid red;
				image
				{
					border-radius: 100%;
					height: 89rpx;
					width: 89rpx;
				}
			}
			.right{
				margin-left: 19rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}
		}
	}
	.mian-wrap{
		width: 100%;
		height: auto;
		margin-top: 20rpx;
		background-color: white;
		.top{
			@extend .mian-view;
			border-bottom: 1rpx solid #F0F0F0;
			.right{
				@extend .arrow;
			}
		}
		.middle{
			@extend .mian-view;
			border-bottom: 1rpx solid #F0F0F0;
			.right{
				@extend .arrow;
			}
		}
		.bottom{
			@extend .mian-view;
			.right{
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #61AF65;
			}
		}
	}
</style>
