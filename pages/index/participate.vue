<template>
	<view>
		<view class="activite-wrap" v-for="(item,index) in list" :key="index" @click="jump(item.land_id)">
			<view class="top">
				<view></view>
				<view>{{item.land_name}}</view>
			</view>
			<view class="bottom">
				<view class="left">
					<view>金额:</view>
					<view>时间:</view>
					<view>状态:</view>
				</view>
				<view class="right">
					<view>{{item.price}}</view>
					<view>{{item.create_at}}</view>
					<view>{{item.status_text}}</view>
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
				land_id:"",
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
					url:"/pages/index/details?deid="+index,
					animationType: 'pop-in',
					animationDuration: 300
				})
			},
			activf(){
				var data = {
					page:this.tity,
					limit:10,
				};
				console.log(data,"limit");
				this.$http.request({
					url:'getBidLst',
					method:'GET',
					header: {
						'Content-type':'multipart/form-data',
					},
					data:data,
				}).then(res =>{
					console.log(res,"logres");
					if(res.data.code == 200){
						var resdata = res.data.data.data;
						resdata.forEach((item)=>{
							item.price = this.$common.moneysion(item.price);
							this.list.push(item)
						})
						this.tipsShow = res.data.data.data.length == 0 ? true : false;
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
		height: 286rpx;
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
		.bottom{
			width: 90%;
			height: 150rpx;
			margin: 35rpx auto;
			display: flex;
			.left{
				height: 130rpx;
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