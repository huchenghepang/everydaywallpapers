<template>
	<view class="global-box-back" @click="toggleMask">
		<swiper circular :current="currentIndex" @change="changeImage">
			<swiper-item v-for="(image,index) in imageDetailList" :key="image._id">
					<image v-if="isShowImageList.includes(index)" class="swiper-item" :src="image.fullPicurl" ></image>
				
			</swiper-item>
		</swiper>
		<view class="mask" v-show="isShowMask">
			<view class="back-btn" :style="`top:${statusBarHeight}px`" @click.stop="goBack">
				<uni-icons type="back" color="#fafafa" size="30"></uni-icons>
			</view>
			<view class="mask-date-time" :style="`top:${dateTimeBoxTop}px`">
				<view class="pic-info"><text>{{currentIndex+ 1}}/{{imageDetailList.length}}</text></view>
				<view class="time"><uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat></view>
				<view class="date"><uni-dateformat :date="new Date()" format="MM/dd"></uni-dateformat></view>
			</view>

			<view class="bottom-area-box">
				<view class="items-icons" @click.stop="toggleInfo">
					<uni-icons type="info" size="30" color="black"></uni-icons>
					<text>信息</text>
				</view>
				<view class="items-icons" @click="openStar"><uni-icons type="star" size="30" color="black"></uni-icons>
					<text>评分</text>
				</view>
				<view class="items-icons" @click.prevent="downLoadPictur"><uni-icons type="download" size="30"
						color="black"></uni-icons>
					<text>下载</text>
				</view>


			</view>
		</view>
		<uni-popup ref="popupInfo" type="bottom">
			<view class="info-box">
				<view class="top-header">
					<view class="tile">
						<text>壁纸信息</text>
					</view>
					<view class="close">
						<uni-icons type="closeempty" size="15" @click="closeInfo"></uni-icons>
					</view>
				</view>
				<scroll-view scroll-y="true" class="info-main">
					<view class="row">
						<text class="label">壁纸ID：</text>
						<text class="value">{{imageInfo._id}}</text>
					</view>
					<view class="row">
						<text class="label">发布者：</text>
						<text class="value">{{imageInfo.nickname}}</text>
					</view>
					<view class="row">
						<text class="label">评分：</text>
						<view class="value score">
							<uni-rate :value="imageInfo.score" touchable allow-half size="15" readonly></uni-rate>
							<text class="star">{{imageInfo.score}}分</text>
						</view>
					</view>
					<view class="row abstract">
						<text class="label"> 摘要:</text>
						<text class="value">{{imageInfo.description}}</text>
					</view>
					<view class="row">
						<text class="label">标签：</text>
						<view class="value tabs">
							<template v-for="(tab,index) in imageInfo.tabs" :key="index">
								<text class="tab">{{tab}}</text>
							</template>
						</view>
					</view>
					<view class="copyright">
						<text>
							声明：本图片来用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱2927678784@qq.com，管理将删除侵权壁纸，维护您的权益。
						</text>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<uni-popup ref="popupgarde">
			<view class="popup-grade">
				<view class="title">
					<text>{{isUserScore?"已经评分过了~~~":"请给个评分吧~~~"}}</text>
					<view class="close">
						<uni-icons type="closeempty" size="15" @click="closeStar"></uni-icons>
					</view>
				</view>
				<view class="star">
					<uni-rate v-model="myStar" allow-half :disabled="isUserScore"></uni-rate>
					<text>{{isUserScore?userScore:myStar}}分</text>
				</view>
				<view class="star-btn">
					<button @click="confirmStar" size="30" :disabled="isUserScore">确认评分</button>
				</view>
			</view>
		</uni-popup>
	</view>


</template>

<script setup>
	import {
		reqGetSetupScore,
		reqDownloadPic,
		reqSingleImage
	} from '@/api/apis.js'
	import {
		getTopStatusBarInfo
	} from "@/utils/system.js"
	import {
		computed,
		ref
	} from "vue"
	import {
		onLoad,
		onShareAppMessage,
	} from "@dcloudio/uni-app"

	let statusBarHeight = getTopStatusBarInfo().statusBarHeight;
	let dateTimeBoxTop = statusBarHeight + 40;
	let isShowMask = ref(false);
	let popupInfo = ref(null);
	let popupgarde = ref(null);
	let star = ref(3.5);
	let myStar = ref(0);
	const imageDetailList = ref([]);
	let currentIndex = ref(0);
	// 解决首屏加载空白的问题
	let isShowImageList = ref([]);
	const imageInfo = ref({
		classid: "",
		nickname: "",
		score: 0,
		tabs: ["未知"],
		_id: "",
		description: "没有相关的描述~~~",
		fullPicurl: "",
	});
	let isUserScore = ref(false);
	let count = computed(()=>{
		return imageDetailList.value.length
	})
	isUserScore = computed(() => {
		if (imageDetailList.value[currentIndex.value]?.userScore) {
			return true
		} else {
			return false
		}
	});


	let userScore = computed(() => {
		return isUserScore ? imageDetailList.value[currentIndex.value]?.userScore : 0;
	})

	function toggleMask() {
		isShowMask.value = !isShowMask.value;
	}

	function goBack() {
			uni.navigateBack({
				fail(){
					uni.switchTab({
						url:"/pages/index/index",
					})
				}
			});
		
	}

	function toggleInfo() {

		imageInfo.value = handleImageInfo();
		popupInfo.value.open();


	}

	function closeInfo() {
		popupInfo.value.close();
	}

	function openStar() {

		imageInfo.value = handleImageInfo();
		popupgarde.value.open();


	}

	function onchange(e) {
		// 改变我评分值
		myStar.value = e.value;
	}
	// 评分
	function confirmStar() {
		// 确认我的评分值 
		
		imageDetailList.value[currentIndex.value].score = myStar.value;
		setUpScore();
		popupgarde.value.close();
	}

	function closeStar() {
		popupgarde.value.close();
	}

	// 处理图片的路径替换
	function replaceUrl(url) {
		return url.replace('_small.webp', '.jpg');
	}
	// 移动图片
	function changeImage(e) {
		currentIndex.value = e.detail.current;
		resolvePicture(currentIndex.value);
		imageInfo.value = handleImageInfo();
		myStar.value = 0;
		
	}

	function handleImageInfo() {
		let fuzhi = imageDetailList.value[currentIndex.value];
		let {
			...imageInfo
		} = fuzhi;
		// imageInfo.value = tempimageInfo;
		return imageInfo;
	}

	function handleCore() {
		imageDetailList.value[currentIndex.value].userScore = myStar.value;
		uni.setStorageSync("imageList", imageDetailList.value);
	}
	
	// 请求单个图片
	async function getSingleList(data){
		let result = await reqSingleImage(data);
		if(result.errCode==0){
			uni.setStorageSync("imageList",result.data)
		}
	}
	
	async function setUpScore() {
		uni.showLoading({
			title: "加载中..."
		})
		let data = {
			classid: imageInfo.value.classid,
			wallId: imageInfo.value._id,
			userScore: myStar.value
		}
		let result = await reqGetSetupScore(data);
		uni.hideLoading();
		if (result.errCode == 0) {
			handleCore();
			uni.showModal({
				title: "评分提醒",
				content: "成功评分了，亲~~~",
				showCancel: false,
			})
		}
	}


	function getImageList() {
		/* await uni.getStorage({
			key: "imageList",
			success(res) {
				let imageList = res.data;
				imageDetailList.value = imageList.map(item => {
					item.fullPicurl = replaceUrl(item.smallPicurl);
					return item
				});
			}
		}) */
		try{
			let imageList = uni.getStorageSync("imageList");
			imageDetailList.value = imageList.map(item => {
				item.fullPicurl = replaceUrl(item.smallPicurl);
				return item
			});
		}catch(e){
			console.log(e);
		}
		
		
	}

	async function downLoadPictur() {
		// #ifdef H5
		uni.showModal({
			title: "请长按保存图片",
			showCancel: false
		})
		// #endif

		// #ifndef H5
		try {
			uni.showLoading({
				title: "下载中...",
				mask: true
			})
			imageInfo.value = handleImageInfo();
			// 下载图片
			let data = {
				classid: imageInfo.value.classid,
				wallId: imageInfo.value._id,
			}
			let result = await reqDownloadPic(data);
			if (result.data.errCode !== 0) {
				uni.showToast({
					title: "下载失败",
					duration: 2000
				});
				uni.hideLoading();
				return
			}
			if (result.data.errCode == 0) {
				uni.getImageInfo({
					src: imageInfo.value.fullPicurl,
					success(res) {
						uni.saveImageToPhotosAlbum({
							filePath: res.path,
							success() {
								uni.showModal({
									title: "保存到相册成功",
									showCancel: false
								})
							},
							fail(err) {
								if (err.errMsg == "saveImageToPhotosAlbum:fail cancel") {
									uni.showToast({
										title: "保存失败，请点击重新下载",
										icon: "none"
									})
									return
								}
								if (err.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
									uni.showModal({
										title: "保存照片失败",
										content: "请确认授予保存照片的权限",
										success(res) {
											if (res.confirm) {
												uni.openSetting({
													success(setting) {
														if (setting.authSetting[
																"scope.writePhotosAlbum"
															]) {
															uni.showToast({
																title: "获取授权成功",
																icon: "success"
															})
														} else {
															uni.showToast({
																title: "获取授权失败",
																icon: "error"
															})
														}
													}
												})
											}
										}
									})
								}

							},
							complete() {
								uni.hideLoading();
							}
						})
					},
					complete() {
						uni.hideLoading()
					}
				})}
			}catch (e) {
				//TODO handle the exception
				uni.hideLoading();
			}
			// #endif
	}

	// 解决首屏加载 资源过多导致空白的问题
	function resolvePicture(currentIndex){
		
		isShowImageList.value.push(...[currentIndex-1<0?count.value-1:currentIndex-1,currentIndex,currentIndex+1>count.value-1?0:currentIndex+1]);
		isShowImageList.value = [...new Set(isShowImageList.value)]
	}
	// 加载完成时触发
	onLoad((e) => {
		if (isShowMask.value) {
			isShowMask.value = false;
		}
		if (e.currentIndex) {
			currentIndex.value = +e.currentIndex;
			getImageList();
		}
		if(e.id){
			let data = {
				id:e.id
			}
			currentIndex = 0;
			getSingleList(data).then(()=>{
				getImageList();
			
				imageInfo.value = handleImageInfo();
			})
		}
		resolvePicture(currentIndex.value)
		
		
	})
	
	onShareAppMessage(()=>{
		imageInfo.value = handleImageInfo();
	
		return {
				title:"天天壁纸",
				desc:"天天壁纸，每天分享好看的壁纸~~~",
				path:"/pages/detail/detail?id="+imageInfo.value._id,
				success() {
					// console.log("成功分享")
					uni.showToast({
						title:"分享成功！"
					})
				}
				
			}
	})
</script>
<style scoped lang="scss">
	.global-box-back {
		position: fixed;
		width: 100%;
		// 设置为视口的高度
		height: 100vh;
		border: 1px solid black;

		swiper {
			width: 100%;
			height: 100%;

			.swiper-item {
				width: 100%;
				height: 100%;
			}
		}

		.mask {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			// background-color: #fafafa;
			.back-btn {
				position: absolute;
				margin-left: 20rpx;
				width: 60rpx;
				height: 60rpx;
				background-color: transparent;
				border: 1rpx solid rgba(0, 0, 0, 0.3);
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				text-align: center;
				background-color: rgba(0, 0, 0, 0.4);
			}

			.mask-date-time {

				position: absolute;
				left: 0;
				right: 0;
				margin-left: auto;
				margin-right: auto;
				width: 420rpx;
				height: 300rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				color: #FEFEFA;
				box-shadow: 2px rgba(0, 0, 0, 0.1);
				mix-blend-mode: hard-light;
				// mix-blend-mode: difference;
				// mix-blend-mode: multiply; //非常浅色

				.pic-info {
					font-size: 30rpx;
					padding: 5rpx 30rpx;
					background: rgba(0, 0, 0, 0.3);
					box-shadow: 2px rgba(0, 0, 0, 0.1);
					border-radius: 30rpx;
					backdrop-filter: blur(10rpx);

				}

				.time {
					font-size: 120rpx;
					top: calc(10vh + 80rpx);
					font-weight: 100;
					line-height: 1em;
					text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
				}

				.date {
					font-size: 30rpx;
					top: calc(10vh + 240rpx);
					font-weight: 500;
					line-height: 1em;
					text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
				}
			}

			.bottom-area-box {
				position: absolute;
				bottom: calc(10vh);
				left: 0;
				right: 0;
				margin-left: auto;
				margin-right: auto;
				width: 400rpx;
				height: 150rpx;
				display: flex;
				justify-content: space-evenly;
				background-color: #F3E6DE;
				border-radius: 120rpx;
				box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
				backdrop-filter: blur(20rpx);

				.items-icons {
					// background-color: yellow;
					font-weight: 200;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					text {
						color: #726B65;
					}
				}
			}
		}

		.info-box {
			width: 100%;
			max-height: 60vh;
			background: #fff;
			display: flex;
			border-radius: 20rpx 20rpx 0 0;
			flex-direction: column;

			.top-header {
				display: flex;
				justify-content: center;
				position: relative;
				padding: 30rpx 10rpx 0;
				font-size: 26rpx;
				color: #726B65;

				.close {
					position: absolute;
					right: 30rpx;
				}
			}

			.info-main {
				// display: flex;
				// flex-direction: column;
				// align-items: center;
				// justify-content: center;
				box-sizing: border-box;
				padding: 30rpx;
				overflow: hidden;

				.row {
					padding: 10rpx;
					display: flex;
					text-align: center;
					line-height: 1rem;

					.label {
						font-size: 30rpx;
						color: rgba(0, 0, 0, 0.6);
						display: inline-block;
						// min-width: 30rpx;
						width: 140rpx;

					}

					.value {
						display: flex;
						font-size: 26rpx;
						color: rgba(0, 0, 0, 0.9);

						.star {
							margin-left: 20rpx;
						}
					}

					.tabs {
						display: flex;
						justify-content: space-around;

						.tab {
							display: block;
							padding-left: 10rpx;
							padding-right: 10rpx;
							margin-left: 10rpx;
							border: 1rpx #3DAD87 solid;
							border-radius: 20rpx;
							font-size: 24rpx;
							line-height: 1rem;
							color: #3DAD87;
						}
					}
				}

				.copyright {
					margin-top: 30rpx;
					background-color: #F6F6F6;
					border-radius: 30rpx;
					padding: 20rpx;
					white-space: normal;
					font-size: 30rpx;
					color: rgba(0, 0, 0, 0.6);
				}

			}
		}

		.popup-grade {
			width: 70vw;
			background-color: #fff;
			box-shadow: 2rpx 2rpx 2rpx #F6F6F6;
			border-radius: 40rpx;
			padding: 10rpx;

			.title {
				text-align: center;
				font-size: 30rpx;
				display: flex;
				justify-content: center;
				padding: 10rpx;
				position: relative;

				.close {
					right: 20rpx;
					position: absolute;
				}

			}

			.star {
				display: flex;
				justify-content: center;
				padding: 15rpx;
			}

			.star-btn {
				display: flex;
				justify-content: center;
				// background-color: yellow;
				height: 100rpx;
				width: 100%;

				button {
					border-radius: 30rpx;
				}
			}
		}
	}
</style>