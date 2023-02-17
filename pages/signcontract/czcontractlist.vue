<template>
	<view>
		<view class="activite-wrap" v-for="(item,index) in list" :key="index" @click="jump(item)">
			<view class="top">
				<view></view>
				<view>{{item.name}}</view>
			</view>
			<view class="bottom">
				<view class="left">
					<view>时间:</view>
					<view>承租方:</view>
					<view>出租方:</view>
				</view>
				<view class="right">
					<view>{{item.create_at}}</view>
					<view>
						<view v-if="item.signature == ''" style="color: darkorange;">未签署</view>
						<view v-else>已签署</view>
					</view>
					<view>
						<view v-if="item.l_signature == ''" style="color: darkorange;">未签署</view>
						<view v-else>已签署</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="tipsShow" class="tips">没有更多内容了！</view>
	</view>
</template>

<!-- <view v-for="(item,index) in list" :key="index">{{item.name}}</view> -->
</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				tity:1,
				tipsShow:false,
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.tity = 1;
			this.list = [];
			this.getCzContractLst();
		},
		onReachBottom() {
			this.tity++;
			this.getCzContractLst();
		},
		methods: {
			jump(res){
				console.log(res,"this.list");
				if(res.l_signature != ""){
					//不等于空，出租方签署了合同
					this.$common.navigateTo('/pages/signcontract/contract?deid='+ res.id+'&iden='+ 2+'&landid='+ res.land_id +'&state=' +2);
				}else if(res.l_signature == ""){
					//等于空，出租房没有签署合同
					this.$common.navigateTo('/pages/signcontract/contract?deid='+ res.id+'&iden='+ 2+'&landid='+ res.land_id +'&state=' +1);
				}
			},
			getCzContractLst() {
				this.$http.request({
					url: "getCzContractLst",
					// url:"getCbContractLst",
					method: "GET",
					header: {
						'Content-Type': 'multipart/form-data'
					},
					data: {
						page: this.tity,
						limit: 10
					}
				}).then(res => {
					if(res.data.code == 200){
						res.data.data.data.forEach((item)=>{
							this.list.push(item)
						})
						this.tipsShow = res.data.data.data.length == 0 ? true : false;
					}else{
						this.$common.showTosat(res.data.info)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tips{
		width: 100%;
		margin-bottom: 100rpx;
		height: 200rpx;
		line-height: 68rpx;
		text-align: center;
		font-size: 36rpx;
		font-family: PingFang SC;
	}
	.activite-wrap {
		width: 710rpx;
		height: 286rpx;
		background: #FFFFFF;
		opacity: 0.98;
		border-radius: 30rpx;
		margin: 30rpx auto;

		.top {
			margin: 0 auto;
			width: 90%;
			height: 96rpx;
			border-bottom: 1rpx dashed #000000;
			display: flex;
			align-items: center;

			:first-child {
				width: 8rpx;
				height: 28rpx;
				background: #32529B;
			}

			:last-child {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 800;
				color: #333333;
				margin-left: 10rpx;
			}
		}

		.bottom {
			width: 90%;
			height: 150rpx;
			margin: 35rpx auto;
			display: flex;

			.left {
				height: 130rpx;
				width: 106rpx;
				text-align: left;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}

			.right {
				height: 130rpx;
				width: auto;
				text-align: left;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
		}
	}

	.tips {
		width: 100%;
		margin-bottom: 100rpx;
		height: 200rpx;
		line-height: 68rpx;
		text-align: center;
		font-size: 36rpx;
		font-family: PingFang SC;
	}
</style>

<style>
	page {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		background-color: #f7f7f7;
	}
</style>
