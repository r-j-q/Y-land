<style lang="scss" scoped>
	.cont-wrap{
		width: 90%;
		height: auto;
		margin: 35rpx auto;
		display: flex;
		flex-direction: column;
		.cont{
			display: flex;
			border-bottom: 10rpx;
			view{
				height: 60rpx;
				line-height: 60rpx;
			}
			:first-child
			{
				width: 166rpx;
				text-align: left;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
			}
			:last-child{
				text-align: left;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}
		}
	}
</style>
<template>
	<view>
		<view class="activite-wrap" v-for="(item,index) in list" :key="index">
			<view class="top">
				<view class="top-inside">
					<view></view>
					<view>{{item.name}}</view>
				</view>
				<view class="up" @click="jump(item.id)">修改</view>
			</view>
			<view class="cont-wrap">
				<view class="cont">
					<view>状态:</view>
					<view>{{item.auction_status.name}}</view>
				</view>
				<view class="cont">
					<view>开始时间:</view>
					<view>{{item.start_time}}</view>
				</view>
				<view class="cont">
					<view>结束时间:</view>
					<view>{{item.end_time}}</view>
				</view>
				<view class="cont">
					<view>当前价格:</view>
					<view>￥{{item.curr_price}}</view>
				</view>
				<view class="cont">
					<view>面积:</view>
					<view>{{item.acreage}}平方米</view>
				</view>
				<view class="cont">
					<view style="height: 80rpx;height: 80rpx;">封面:</view>
					<image :src=item.cover mode="scaleToFill" style="width: 180rpx;height: 80rpx;"></image>
				</view>
				<view class="cont">
					<view style="width:166rpx;">地址:</view>
					<view style="height: auto;width: 500rpx;">{{item.region[0]}}{{item.region[1]}}{{item.region[2]}}{{item.region[3]}}{{item.region[4]}}{{item.address}}</view>
				</view>
			</view>
		</view>
		<view v-if="tipsShow" class="tips">没有更多内容了！</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[],
				tity:1,
				tipsShow:false,
			}
		},
		onLoad() {
			this.activf();
		},
		onShow() {
			
		},
		//触底刷新
		onReachBottom() {
			this.tity++;
			this.activf();
		},
		methods:{
			jump(index){
				uni.navigateTo({
					url:"/pages/index/modification?id="+index
				})
			},
			activf(){
				var data = {
					page:this.tity,
					limit:10,
				};
				this.$http.request({
					url:'myLandLst',
					method:'GET',
					header: {
						'Content-type':'multipart/form-data',
					},
					data:data,
				}).then(res =>{
					console.log(res.data.data.data.data,"log-res");
					if(res.data.code == 200){
						var resdata = res.data.data.data.data
						resdata.forEach((item)=>{
							item.curr_price = this.$common.moneysion(item.curr_price);
							this.list.push(item)
						})
						this.tipsShow = res.data.data.data.data.length == 0 ? true : false;
					}else{
						this.$common.showToast(res.data.info);
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.activite-wrap{
		width: 710rpx;
		height: auto;
		background: #FFFFFF;
		opacity: 0.98;
		border-radius: 30rpx;
		margin: 30rpx auto;
		.top{
			margin: 0 auto;
			width: 90%;
			height: 96rpx;
			border-bottom: 1rpx dashed #000000;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.top-inside{
				display: flex;
				align-items: center;
				:first-child{
					width: 8rpx;
					height: 28rpx;
					background: #32529B;
				}
				:last-child{
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 800;
					color: #333333;
					margin-left: 10rpx;
				}
			}
			.up{
				color: red;
				font-size: 28rpx;
			}
		}
		.bottom{
			width: 90%;
			height: auto;
			margin: 35rpx auto;
			display: flex;
			.left{
				height: auto;
				width: 166rpx;
				text-align: left;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
			.right{
				height: auto;
				width: auto;
				text-align: left;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.addres{
					width: 500rpx;
					background-color: #32529B;
				}
			}
		}
	}
	.tips{
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
	page{
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		background-color: #f7f7f7;
	}
</style>