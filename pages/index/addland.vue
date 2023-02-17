<template>
	<view>
		<view class="wrap">
			<view class="input-wrap">
				<view>土地名称:</view>
				<input type="text" placeholder="请输入土地名称" v-model="list.name" />
			</view>
			<view class="input-wrap-zy">
				<view>土地封面:</view>
				<view @click="uplodimage(1)">
					<view v-if="list.cover != '' " class="CardImage"
						style="width: 249rpx;height: 150rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;margin: 10rpx 0 0 60rpx;">
						<image :src="list.cover" mode="aspectFit"></image>
					</view>

					<view v-if="list.cover == '' " class="dcphoto">
						<image src="../../static/index/camera.png" mode="aspectFill"
							style="width: 120rpx;height: 100rpx;"></image>
					</view>
				</view>
			</view>

			<view class="swiper-view">
				<view class="swiper-title">轮播图片:</view>
				<view @click="uplodimage(2)" class="swiper-wrap">
					<view class="swiper-img" v-for="(item,index) in list.slider" :key="index">
						<image :src="item" mode="aspectFill" style="width: 120rpx;height: 100rpx;margin-right: 10rpx;">
						</image>
					</view>

					<view class="dcphoto">
						<image src="../../static/index/camera.png" mode="aspectFill"
							style="width: 120rpx;height: 100rpx;"></image>
					</view>
				</view>
			</view>

			<view class="input-wrap">
				<view>土地备注:</view>
				<input type="text" placeholder="请输入土地备注" v-model="list.remark" />
			</view>


			<view class="input-wrap1" style="height: auto;">
				<view>土地详情:</view>
				<rich-Text-Editor v-model="list.content" @input="input" style="height: auto;width: 500rpx;">
				</rich-Text-Editor>
				<!-- <textarea placeholder="请输入土地详情" v-model="list.content" auto-height maxlength="-1"/> -->
			</view>

			<!-- <view class="input-wrap">
				<view>土地保证金:</view>
				<input type="text" placeholder="请输入保证金(元)" v-model="list.margin" />
			</view> -->

			<view class="input-wrap">
				<view>土地起拍价:</view>
				<input type="text" placeholder="请输入起拍价(元)" v-model="list.start_price" />
			</view>
			<view class="input-wrap">
				<view>加价幅度:</view>
				<input type="text" placeholder="请输入加价幅度(元)" v-model="list.add_price" />
			</view>
			<view class="input-wrap">
				<view>拍卖方式:</view>
				<view class="uni-list-cell-db" style="width: 100%;height: 60rpx;">
					<picker mode=selector @change="modebindChange" :range="auctionmode" :value="modevalue">
						<view class="uni-input"
							style="margin-left: 20rpx;width: 90%;text-align: left;height: 60rpx;line-height: 60rpx;">
							{{choice}}
						</view>
					</picker>
				</view>
			</view>

			<view class="input-wrap">
				<view>开始日期</view>
				<view class="uni-list-cell-db" style="width: 100%;height: 60rpx;">
					<picker mode="date" :value="date" @change="bindDateChange" fields="day">
						<view class="uni-input"
							style="margin-left: 20rpx;width: 90%;text-align: left;height: 60rpx;line-height: 60rpx;">
							{{date}}
						</view>
					</picker>
				</view>
			</view>

			<view class="input-wrap">
				<view>开始时间</view>
				<view class="uni-list-cell-db" style="width: 100%;height: 60rpx;">
					<picker mode="time" :value="time" @change="bindDateChangeTime">
						<view class="uni-input"
							style="margin-left: 20rpx;width: 90%;text-align: left;height: 60rpx;line-height: 60rpx;">
							{{time}}
						</view>
					</picker>
				</view>
			</view>

			<view class="input-wrap">
				<view>结束日期</view>
				<view class="uni-list-cell-db" style="width: 100%;height: 60rpx;">
					<picker mode="date" :value="date" @change="zhbindDateChange" fields="day">
						<view class="uni-input"
							style="margin-left: 20rpx;width: 90%;text-align: left;height: 60rpx;line-height: 60rpx;">
							{{gdate}}
						</view>
					</picker>
				</view>
			</view>

			<view class="input-wrap">
				<view>结束时间</view>
				<view class="uni-list-cell-db" style="width: 100%;height: 60rpx;">
					<picker mode="time" :value="time" @change="zhbindDateChangeTime">
						<view class="uni-input"
							style="margin-left: 20rpx;width: 90%;text-align: left;height: 60rpx;line-height: 60rpx;">
							{{gtime}}
						</view>
					</picker>
				</view>
			</view>

			<view class="input-wrap">
				<view>延迟周期:</view>
				<input type="text" placeholder="请输入延迟周期(分钟)" v-model="list.delay_period" />
			</view>

			<view class="input-wrap">
				<view>选择地区:</view>
				<view class="xuanze" style="width: 76%;margin-left: 2%;display: flex;align-items: center;"
					@click="ssq()">
					<view style="width: 70%;text-align: left;">{{choiceae}}</view>
					<view class="arrow"
						style="width: 16rpx;height: 16rpx;border: 1px solid #828282;border-left: none;border-bottom: none;transform: rotate(45deg);">
					</view>
				</view>
			</view>

			<!-- <view class="input-wrap">
				<view>填写乡镇:</view>
				<input type="text" placeholder="请输入乡镇名称" v-model="list.town"/>
			</view>

			<view class="input-wrap">
				<view>填写村落:</view>
				<input type="text" placeholder="请输入村落名称" v-model="list.village"/>
			</view> -->

			<view class="input-wrap">
				<view>详细地址:</view>
				<input type="text" placeholder="请输入详细地址" v-model="list.address" />
			</view>

			<view class="input-wrap">
				<view>土地面积:</view>
				<input type="text" placeholder="请输入土地面积(平方米)" v-model="list.acreage" />
			</view>

			<view class="input-wrap-zy">
				<view>土地证书(选填)</view>
				<view @click="uplodimage(3)">
					<view v-if="list.land_cert != '' " class="CardImage"
						style="width: 249rpx;height: 150rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;margin: 10rpx 0 0 60rpx;">
						<image :src="list.land_cert" mode="aspectFit"></image>
					</view>

					<view v-if="list.land_cert == '' " class="dcphoto">
						<image src="../../static/index/camera.png" mode="aspectFill"
							style="width: 120rpx;height: 100rpx;"></image>
						<!-- <view class="dcview">上传头像面照片</view> -->
					</view>
				</view>
			</view>

			<view class="input-wrap">
				<view>前茬作物:</view>
				<input type="text" placeholder="请输入前茬作物" v-model="list.plant" />
			</view>
		</view>

		<button class="button" @click="smit()">提交</button>


		<view class="mask" v-if="visible"></view>
		<view class="selwrap" v-if="visible">
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
	</view>
</template>

<script>
	import richTextEditor from '../signin/editor.vue'
	export default {
		components: {
			richTextEditor
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				list: {
					name: "",
					cover: "",
					slider: [],
					remark: "",
					content: "",
					start_price: "",
					add_price: "",
					auction_type: "",
					start_time: "",
					end_time: "",
					delay_period: "",
					province_id: "",
					city_id: "",
					region_id: "",
					town_id: "",
					village_id: "",
					address: "",
					acreage: "",
					land_cert: "",
					plant: "",
				},
				town: "", //乡镇
				village: "", //村落
				modevalue: "0", //内容选择第几项
				endjudge: false, //滚动是否结束判断
				auctionmode: "", //拍卖方式数组
				landPhoto: "",
				choice: "点击选择",
				choiceae: "点击选择",
				date: "选择开始日期",
				time: "选择时间",
				gdate: "选择结束日期",
				gtime: "选择时间",
				fs: "", //竞拍方式
				visible: false, //三级联动显示隐藏
				current: [], // 省市区数据
				prov: [], // 省
				city: [], // 市
				country: [], // 区
				value: [],
				control: [0, 0, 0, 0, 0], //change数据
				xsprov: "",
				idprov: "",
				xscity: "",
				idcity: "",
				idcountry: "",
				xscountry: "",

				navth: [], //上放导航
				numlen: 0, //控制头部导航长度
				aroption: [],
				esop: [], //地址
				rceptlog: false
			}
		},
		onLoad() {
			this.ppfs();
		},
		onShow() {
			//  undefined
			this.opaddress();
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
			//取消
			selcancel() {
				this.visible = false;
			},
			//确认
			selconfirm() {
				if (this.navth.length < 5) {
					this.$common.showToast("请选择完地区后点击确定")
				} else {
					this.visible = false;
					var navth = this.navth;
					this.list.province_id = navth[0].id;
					this.list.city_id = navth[1].id;
					this.list.region_id = navth[2].id;
					this.list.town_id = navth[3].id;
					this.list.village_id = navth[4].id;
					this.choiceae = navth[0].name + navth[1].name + navth[2].name + navth[3].name + navth[4].name
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
			input(e) {
				console.log('这里是初始内容.................', e)
				this.list.content = e
			},


			//三级联动开始时
			pickstart() {
				this.endjudge = true
			},
			pickend() {
				// this.endjudge = false
			},
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
								var data = JSON.parse(uploadFileRes.data);

								if (tion == 1) {
									that.list.cover = data.data.url;
								}
								if (tion == 2) {
									that.list.slider.push(data.data.url);
								}
								if (tion == 3) {
									that.list.land_cert = data.data.url;
								}
							}
						});
					}
				})

			},
			smit() {
				var {
					name,
					cover,
					slider,
					remark,
					content,
					start_price,
					add_price,
					auction_type,
					start_time,
					end_time,
					delay_period,
					province_id,
					city_id,
					region_id,
					town_id,
					village_id,
					address,
					acreage,
					land_cert,
					plant
				} = this.list
				if (name == '' || !name) {
					this.$common.showToast("土地名称不能为空");
					return;
				}
				if (cover == '' || !cover) {
					this.$common.showToast("土地封面不能为空");
					return;
				}
				if (slider == '' || !slider) {
					this.$common.showToast("轮播图片不能为空");
					return;
				}
				if (remark == '' || !remark) {
					this.$common.showToast("备注不能为空");
					return;
				}
				if (content == '' || !content) {
					this.$common.showToast("土地详情不能为空");
					return;
				}
				if (start_price == '' || !start_price) {
					this.$common.showToast("起拍价不能为空");
					return;
				}
				if (isNaN(start_price) == true) {
					this.$common.showToast("起拍价请输入数字");
					return;
				}
				if (add_price == '' || !add_price) {
					this.$common.showToast("加价幅度不能为空");
					return;
				}
				if (isNaN(add_price) == true) {
					this.$common.showToast("加价幅度请输入数字");
					return;
				}
				if (auction_type == '' || !auction_type) {
					this.$common.showToast("拍卖方式不能为空");
					return;
				}
				if (this.date == '' || !this.date || this.time == '' || !this.time) {
					this.$common.showToast("拍卖开始时间不能为空");
					return;
				}
				if (this.gdate == '' || !this.gdate || this.gtime == '' || !this.gtime) {
					this.$common.showToast("拍卖结束时间不能为空");
					return;
				}
				if (delay_period == '' || !delay_period) {
					this.$common.showToast("延迟周期不能为空");
					return;
				}
				if (isNaN(delay_period) == true) {
					this.$common.showToast("延迟周期请输入数字");
					return;
				}
				if (province_id == '' || !province_id) {
					this.$common.showToast("省份不能为空");
					return;
				}
				if (city_id == '' || !city_id) {
					this.$common.showToast("城市不能为空");
					return;
				}
				if (region_id == '' || !region_id) {
					this.$common.showToast("区县不能为空");
					return;
				}
				if (town_id == '' || !town_id) {
					this.$common.showToast("乡镇不能为空");
					return;
				}
				if (village_id == '' || !village_id) {
					this.$common.showToast("村落不能为空")
					return;
				}
				if (address == '' || !address) {
					this.$common.showToast("详细地址不能为空");
					return;
				}
				if (acreage == '' || !acreage) {
					this.$common.showToast("土地面积不能为空");
					return;
				}
				if (isNaN(acreage) == true) {
					this.$common.showToast("土地面积请输入数字");
					return;
				}
				if (plant == '' || !plant) {
					this.$common.showToast("前瞻作物不能为空");
					return;
				}
				var currentTime = this.$common.getNowDate()
				var current = this.$common.dateFormat(currentTime.date, currentTime.time, 'YYYY-mm-dd HH:MM:SS')
				this.list.start_time = this.$common.dateFormat(this.date, this.time, 'YYYY-mm-dd HH:MM:SS')
				this.list.end_time = this.$common.dateFormat(this.gdate, this.gtime, 'YYYY-mm-dd HH:MM:SS')

				if (this.$common.compareTime(current, this.list.start_time) == 2) {
					this.$common.showToast('开始时间小于当前时间');
					return;
				}
				if (this.$common.compareTime(this.list.start_time, this.list.end_time) == 2) {
					this.$common.showToast('结束时间小于开始时间');
					return;
				}
				// var contrastTime = this.$common.compareTime(this.list.start_time,this.list.end_time);

				var data = this.list;
				this.$http.request({
					url: "addLand",
					method: 'POST',
					header: {
						'Content-Type': 'applicktion/json'
					},
					data: data
				}).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							title: res.data.info,
							duration: 2000
						})
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/index/my',
							})
						}, 2000)
					} else {
						this.$common.showToast(res.data.info)
					}
				})
			},
			//拍卖方式
			ppfs() {
				this.$http.request({
					url: "getAuctionType",
					method: 'GET',
					header: {
						'Content-Type': 'multipart/form-data'
					},
				}).then(res => {
					if (res.data.code == 200) {
						this.auctionmode = res.data.data
					} else {
						this.$common.showToast(res.data.info)
					}
				})
			},
			//省市区
			ssq() {
				this.visible = true;
			},

			zSsq(res) {
				this.visible = true;
			},
			bindDateChange: function(e) {
							let str = e.detail.value;
							this.date = str;
							let t = str.replace("-", "年") + '月';
			},
			zhbindDateChange: function(e) {
							let str = e.detail.value;
							this.gdate = str;
							let t = str.replace("-", "年") + '月';
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				month = month > 9 ? month : '0' + month;
				return `${year}年${month}月`;
			},

			bindDateChangeTime(e) {
				let strme = e.detail.value;
				this.time = strme;
			},
			zhbindDateChangeTime(e) {
				let strme = e.detail.value;
				this.gtime = strme;
			},
			//拍卖确认
			modebindChange(e) {
				var e = e.detail.value;
				this.modevalue = e;
				this.choice = this.auctionmode[e];
				this.list.auction_type = e;
			},

		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		width: 90%;
		height: auto;
		margin: 20rpx auto;
	}

	.xuanze {
		display: flex;
		justify-content: space-between;
		height: 60rpx;
		border-bottom: 3rpx solid #dedede;
		height: auto;
	}

	.example-info {
		width: 22%;
		text-align: right;
		font-size: 28rpx;
		font-weight: 600;
		color: #818181;
		font-family: PingFang SC;
	}

	.input-wrap-zy {
		width: 100%;
		height: 60rpx;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		font-weight: 600;
		color: #818181;
		font-family: PingFang SC;
		margin: 80rpx 0;

		view {
			width: 22%;
			text-align: right;
		}
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

	// .textarea {
	.input-wrap1 {
		width: 100%;
		height: auto;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		font-weight: 600;
		color: #818181;
		font-family: PingFang SC;
		margin-top: 20rpx;

		view {
			width: 22%;
			text-align: right;
		}

		textarea {
			width: 76%;
			margin-left: 2%;
			border-bottom: 3rpx solid #dedede;
		}
	}

	.input-wrap {
		width: 100%;
		height: 60rpx;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		font-weight: 600;
		color: #818181;
		font-family: PingFang SC;
		margin-top: 20rpx;

		view {
			width: 22%;
			text-align: right;
		}

		input {
			width: 76%;
			margin-left: 2%;
			border-bottom: 3rpx solid #dedede;
		}

	}

	.example-body {
		background-color: #fff;
		padding: 10px;
	}

	.items {
		align-items: center;
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

	.dcphoto {
		width: auto;
	}

	.swiper-img {}

	.swiper-wrap {
		width: 85.5%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.swiper-view {
		width: 100%;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		font-weight: 600;
		color: #818181;
		font-family: PingFang SC;
		margin: 80rpx 0;

		.swiper-title {
			width: 24.5%;
			text-align: right;
		}
	}
</style>

<style>
	page {
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
		font-size: 18rpx;
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
	
	.selwrap{
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
