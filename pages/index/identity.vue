<template>
	<view>

		<view class="sign">
			<view class="tion" style="display: flex;flex-direction: column;justify-content: center;">
				<!-- <view>头像</view> -->
				<button class="avatar-btn" open-type="chooseAvatar" @chooseavatar="changeAvatar">
					<image :src="avatar" class="avatar-img" mode="aspectFit" />
				</button>
				<text class="tion-text" style="width: 100%;text-align: center;">点击头像设置头像</text>
				<!-- <input type="text" v-model="username" placeholder="请输入" placeholder-style="font-size: 28rpx;font-family: Source Han Sans CN;font-weight: 400;color: #BBBBBB;"/> -->
			</view>
			<view class="tion">
				<view>微信昵称</view>
				<input type="nickname" class="weui-input" v-model="nicknames" placeholder="请输入微信昵称"
					placeholder-style="font-size: 28rpx;font-family: Source Han Sans CN;font-weight: 400;color: #BBBBBB;" />
				<!-- <input type="text" v-model="username" placeholder="请输入" /> -->
			</view>
			<view class="tion">
				<view>姓名</view>
				<input type="text" v-model="username" placeholder="请输入"
					placeholder-style="font-size: 28rpx;font-family: Source Han Sans CN;font-weight: 400;color: #BBBBBB;" />
			</view>
			<view class="tion">
				<view>联系方式</view>
				<input type="text" v-model="phone" placeholder="请输入"
					placeholder-style="font-size: 28rpx;font-family: Source Han Sans CN;font-weight: 400;color: #BBBBBB;" />
			</view>
			<view class="tion">
				<view>身份证号</view>
				<input type="text" v-model="number" placeholder="请输入"
					placeholder-style="font-size: 28rpx;font-family: Source Han Sans CN;font-weight: 400;color: #BBBBBB;" />
			</view>
		</view>

		<view class="idPhoto-wrap" v-if="scene == 1">
			<view class="idPhoto-top-title">上传身份证照片模板(必填)</view>
			<view class="idPhoto flex">
				<image src="../../static/index/10.png" mode="widthFix"></image>
				<view @click="uplodimage(0)">
					<view v-if="photo != '' " class="CardImage">
						<image :src="photo" mode="aspectFit"></image>
					</view>

					<view class="dcphoto" v-if="photo == '' ">
						<image src="../../static/index/camera.png" mode="aspectFill"
							style="width: 120rpx;height: 100rpx;"></image>
						<view class="dcview">上传国徽面照片</view>
					</view>
				</view>

			</view>
			<!-- <view class="idPhoto-back"></view> -->
		</view>




		<view class="idPhoto-wrap" v-if="scene == 1">
			<view class="idPhoto-top-title">上传身份证照片模板(必填)</view>
			<view class="idPhoto flex">
				<image src="../../static/index/11.png" mode="widthFix"></image>
				<view @click="uplodimage(1)">
					<view v-if="photo1 != '' " class="CardImage">
						<image :src="photo1" mode="aspectFit"></image>
					</view>

					<view v-if="photo1 == '' " class="dcphoto">
						<image src="../../static/index/camera.png" mode="aspectFill"
							style="width: 120rpx;height: 100rpx;"></image>
						<view class="dcview">上传头像面照片</view>
					</view>
				</view>
			</view>
		</view>


		<button class="button" @click="smit()">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: "",
				phone: "",
				number: "",
				photo: "",
				photo1: "",
				idstate: true,
				scene: "",
				//微信头像
				avatar: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
				//微信昵称
				nicknames: "",
			}
		},
		onLoad() {
			
		},
		onShow() {
			var get = getApp().globalData.statusid;
			// tionjudge
			if (get == 1) {
				this.getCardInfo();
			}
			this.getAuctionStatus();
			// this.scene = getApp().globalData.scene;
		},
		methods: {
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
			changeAvatar(e) {
				var that = this;
				if (e.detail.avatarUrl) {
					uni.uploadFile({
						url: 'https://tdpm.shningmi.com/applet/uploads',
						filePath: e.detail.avatarUrl,
						name: 'file',
						success: (uploadFileRes) => {
							var data = JSON.parse(uploadFileRes.data);
							that.avatar = data.data.url;
						},
						fail: (error) => {
							uni.showToast({
								title: error,
								duration: 2000
							});
						},
						complete: () => {
							uni.hideLoading();
						}
					});
				}
				// this.avatar = e.detail.avatarUrl;
				// console.log(e,"获取微信头像");
			},
			//认证信息
			getCardInfo() {
				this.$http.request({
					url: "getCardInfo",
					method: 'GET',
					header: {
						'Content-Type': 'multipart/form-data'
					}
				}).then(res => {
					if (res.data.code == 200) {
						console.log(res,"res 认证信息857");
						var res = res.data.data
						this.avatar = res.headimg
						this.nicknames = res.nickname
						this.username = res.username
						this.phone = res.phone
						this.number = res.sfz_no
						this.photo = res.sfz_zm
						this.photo1 = res.sfz_fm
					}
				})
			},
			//拍摄视频或从手机相册中选视频，返回视频的临时文件路径
			uplodimage(tion) {
				var that = this;
				uni.chooseMedia({
					count: 1,
					mediaType: ['image'],
					sourceType: ['album', 'camera'],
					camera: 'back',
					success(res) {
						var tempImg = res.tempFiles[0].tempFilePath;
						uni.uploadFile({
							url: 'https://tdpm.shningmi.com/applet/uploads',
							filePath: tempImg,
							name: 'file',
							success: (uploadFileRes) => {
								console.log(tion, "tion图片查看");
								var data = JSON.parse(uploadFileRes.data);
								if (tion == 0) {
									that.photo = data.data.url;
								} else if (tion == 1) {
									that.photo1 = data.data.url;
								}
							}
						});
					}
				})

			},
			smit() {
				// this.username
				if (!this.avatar || this.avatar == "" || this.avatar ==
					"https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0"
					) {
					this.$common.showToast('请设置上方头像');
					return;
				};
				if (!this.nicknames || this.nicknames == "") {
					this.$common.showToast('请设置微信昵称');
					return;
				}
				if (!this.username) {
					this.$common.showToast('请输入姓名');
					return;
				};
				if (!/^1[3456789]\d{9}$/.test(this.phone)) {
					this.$common.showToast('请输入正确手机号');
					return;
				};
				if (!/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this
						.number)) {
					this.$common.showToast('请输入正确身份证号码');
					return;
				};
				if (!this.photo) {
					this.$common.showToast("请添加身份证国徽面照片");
					return;
				}
				if (!this.photo1) {
					this.$common.showToast("请添加身份证国徽面照片");
					return;
				}
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认提交吗？',
					success: function(res) {
						if (res.confirm) {
							that.addinfo();
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			inp(e){
				console.log(e);
				// console.log(121);
			},
			addinfo() {
				var data = {
					username: this.username,
					phone: this.phone,
					sfz_no: this.number,
					sfz_zm: this.photo,
					sfz_fm: this.photo1,
					headimg: this.avatar,
					nickname: this.nicknames
				};
				console.log(data,"dataurl");
				this.$http.request({
					url: "addCard",
					method: 'POST',
					header: {
						'Content-Type': 'applicktion/json'
					},
					data: data
				}).then(res => {
					this.$common.showToast("完善成功");
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/index/my'
						});
					}, 2000)
				})
			}
		}
	}
</script>

<style lang="scss">
	.tion-text {
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		margin-top: 36rpx;
	}

	button::after {
		border: none;
	}

	.avatar-btn {
		height: 106rpx;
		width: 212rpx;
		border-radius: 20rpx;
		border: none;
		// button::after: 0 none;
		display: flex;
		background-color: white;
		justify-content: center;
		align-items: center;
	}

	.avatar-img {
		width: 106rpx;
		height: 106rpx;
		border-radius: 20rpx;
	}

	.sign {
		width: 690rpx;
		height: auto;
		background: #FFFFFF;
		border-radius: 30rpx;
		margin: 30rpx auto 0 auto;
		overflow: hidden;

		.title {
			margin: 54rpx auto 0 auto;
			text-align: center;
			font-size: 34rpx;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #333333;
		}

		.tion {
			width: 660rpx;
			height: auto;
			margin: 39rpx auto 63rpx auto;

			view {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #333333;
			}

			input {
				height: 60rpx;
				width: 600rpx;
				border-bottom: 1px solid #DCDCDC;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #BBBBBB;
				margin-top: 6rpx;
			}

			.tagging {
				font-size: 24rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FF1E30;
				margin-top: 23rpx;
			}
		}
	}
</style>
<style>
	.dcphoto {
		margin-top: 16rpx;
		margin-left: 100rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: 150rpx;
	}

	.dcview {
		font-size: 26rpx;
	}

	.CardImage {
		width: 249rpx;
		height: 150rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 10rpx 0 0 60rpx;
	}

	.CardImage image {
		width: 100%;
		height: 100%;
	}

	.CardText {
		width: 300rpx;
		height: 180rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 10rpx 0 0 60rpx;
		font-size: 28rpx;
	}

	.CardText view {
		margin-top: 16rpx;
		letter-spacing: 1.6rpx;
	}

	/* .CardText image{
			width: 100%;
			height: 100%;
		} */

	.flex {
		display: flex;
	}

	.border-top {
		width: 100%;
		border: 1rpx solid #dedede;
	}

	/* .arrow {
			margin: auto 20rpx;
			width: 20rpx;
			height: 20rpx;
			border: 1px solid #828282;
			border-left: none;
			border-bottom: none;
			transform: rotate(45deg);
		} */

	.idPhoto-wrap {
		width: 90%;
		margin: 0rpx auto;
	}

	.idPhoto-top-title {
		width: 98%;
		font-size: 28rpx;
		font-weight: 600;
		color: #858585;
		margin: 20rpx auto;
	}

	.idPhoto image {
		width: 270rpx;
	}

	.border-bottom {
		width: 100%;
		border: 2rpx solid #dbdbdb;
	}

	switch {
		float: right;
		margin: 20rpx 5% 0 0;
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
