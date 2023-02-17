<template>
	<view>
		<view style="margin-top: 60rpx;"></view>
		<view class="record" v-for="(item,index) in cjrecord" :key="index">
			<view style="width: 94%;display: flex;justify-content: space-between;">
				<view style="display: flex;align-items: center;">
					<view class="img"><image :src=item.headimg mode="aspectFit" style="width: 100%;height: 100%;"></image></view>
					<view class="name">{{item.nickname}}</view>
				</view>
				<view :class="index == 0 ? 'money' : 'money1'">￥{{item.price}}</view>
			</view>
			<view style="display: flex;width: 94%;align-items: center;justify-content: space-between;margin-top: 30rpx;">
				<view :class="index == 0 ? 'times' : 'times1'">{{item.create_at}}</view>
				<view :class="[index== 0? 'frbutton':'stbutton']">
					<view v-if="index == 0">领先</view>
					<view v-if="index != 0">出局</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				cjrecord:'',
			}
		},
		onLoad(option) {
			this.bidRecord(option.id)
		},
		methods:{
			//出价记录
			bidRecord(lindid){
				this.$http.request({
					url:"getLandBidLst",
					method:'GET',
					header:{
						'Content-Type' : 'applicktion/json'
					},
					data:{
						land_id:lindid,	
						page:"1",	
						limit:"10000"
					}
				}).then(res=>{
					if(res.data.code == 200){
						res.data.data.data.forEach(item=>{
							item.price = this.$common.moneysion(item.price);
						})
						this.cjrecord = res.data.data.data;
					}else{
						this.$common.showToast(res.data.info);
					}
				})
			},
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		background-color: #f7f7f7;
	}
</style>
<style lang="scss">
	.record{
		width: 670rpx;
		height: 160rpx;
		display: flex;
		background-color: white;
		border-radius: 18rpx;
		flex-direction: column;
		margin: 26rpx auto 0 auto;
		justify-content: center;
		align-items: center;
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
			width: auto;
			text-align: center;
			height: 49rpx;
			line-height: 49rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #FF9275;
		}
		.money1{
			width: auto;
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
		}
		.times1{
			height: 24rpx;
			font-size: 22rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #999999;
		}
	}
	.frbutton{
			width: 80rpx;
			height: 40rpx;
			background: #FF9275;
			border-radius: 8rpx;
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
</style>