<template>
	<view class="gloabl-theme pageBg">
		<customNavigatorBar title="推荐"></customNavigatorBar>
		<view class="top">
				<view class="recommend-bar" @click="goDetail">
					<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="2000" class="recommend-bar-swiper" circular  >
						<swiper-item v-for="(commendItem,index) in CommendhomeBannerList" :key="commendItem._id">
							<view class="swiper-item">
								<image :src="commendItem.picurl" mode="aspectFit" :data-commendItem="`${commendItem.url}:${commendItem.target}`"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="notice-bar">
					<view class="left">
						<uni-icons type="sound" size="30"></uni-icons>
						<text>通知</text>
					</view>
					<view class="center">
						<swiper  autoplay :interval="3000" :duration="1000" vertical>
							<template v-for="(notice,index) in newList ">
								<swiper-item>
									<view class="swiper-item"><navigator :url="`/pages/notice/notice?id=${notice._id}&title=${notice.title}`">
										<text style="text-overflow: ellipsis;overflow: hidden;">{{notice.title}}</text>
									</navigator></view>
								</swiper-item>
							</template>
							
					
						</swiper>
					</view>
					<view class="right">
						<uni-icons type="arrow-right" size="30"></uni-icons>
					</view>
					
				</view>
			</view>
			<!-- 每日推荐 -->
			<DayilyRecommend ></DayilyRecommend>
			<commonPush :title="`精选图片`" class="like-shore">
				<template v-slot:right>
					<view class="right-shore">
						<text >MORE+更多</text>
					</view>
				</template>
			</commonPush>
			<customPictureList :isMore="true" :imageList="commendHomeCategoryList">
			
			</customPictureList>
			
			
	</view>
	</template>

<script setup>
	import {ref} from "vue"
	import DayilyRecommend from "@/components/DayilyRecommend/DayilyRecommend.vue"
	import commonPush from "@/components/common-push/common-push.vue"
	import customPictureList from "@/components/custom-picture-list/custom-picture-list.vue"
	import customNavigatorBar from "@/components/custom-navigator-bar/custom-navigator-bar.vue"
	import {reqCommendhomeBanner,reqClassifyBar,reqRandomWall,reqNewList} from '@/api/apis.js'
	import {onLoad,onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app"
	let CommendhomeBannerList = ref([]);
	let commendHomeCategoryList = ref([]);
	let newList = ref([]);
	const getCommendhomeBanner= async () => {
		let result = await reqCommendhomeBanner();
		CommendhomeBannerList.value =  result.data;
	}
	// 请求分类图片-首页
	const getCommendHomeCategoryList= async () => {
		let result = await reqClassifyBar();
		commendHomeCategoryList.value =  result.data;
	}
	async function getNewList(){
		let result = await reqNewList();
		newList.value = result.data;
	}
	
	function goDetail(e){
		if(e.target.dataset.commendItem){
			let [url,target] = e.target.dataset.commendItem.split(":");
			url = url.replace("id","classid").replace("name","title");
			if(target=="self"){
				uni.navigateTo({
					url:"/pages/categoryinfolist/categoryinfolist?"+url
				})
			}else if(target =="miniProgram"){
				uni.showToast({
					title:"跳转小程序"
				})
				// #ifdef H5
				uni.switchTab({
					url
				})
				// #endif
				
				console.log(url);
				// #ifdef MP-WEIXIN
					uni.navigateToMiniProgram({
						appId:"wxbd89d0ba67f6b6a4",
						path:url,
						success() {
							console.log("打开成功");
						}
					})
				// #endif
				
			}
		}
		
	}
	
	onLoad(()=>{
		getCommendhomeBanner();
		getCommendHomeCategoryList();
		getNewList();
	})
	onShareAppMessage((e)=>{
		return {
			title:"天天壁纸",
			desc:"天天壁纸，每天分享好看的壁纸~~~",
			success() {
				uni.showToast({
					title:"分享成功！"
				})
			}
			
		}
	})
	
	onShareTimeline(()=>{
		return {
			title:"天天壁纸",
			imageUrl:"/static/wallpaper/preview1.jpg"
		}
	})
</script>

<style scoped lang="scss">
	@import url("@/common/style/common-theme-style.scss");
	.gloabl-theme{
		width: 100%;
		background-image: linear-gradient(to top,);
	}
	.top{
		width: 100%;
		height: 500rpx;
		position: relative;
		.recommend-bar{
			margin-top: 10rpx;
			width: 100%;
			height: 340rpx;
			display: flex;
			justify-content: center;
			.recommend-bar-swiper{
				width: 700rpx;
				height: 100%;
				swiper-item{
					width: 100%;
					height: 100%;
					.swiper-item{
						width: 100%;
						height: 100%;
						image{
							width: 100%;
							height: 100%;
							border-radius:30rpx;
						}
					}
					
				}
			}
		}
		.notice-bar{
			// margin-top: 10rpx;
			position: absolute;
			left: 0;
			right: 0;
			bottom: 30rpx;
			width:700rpx;
			height: 80rpx;
			margin: 0 auto;
			display: flex;
			justify-content: space-evenly;
			border-radius: 30rpx;
			overflow: hidden;
			background-color: #F5F5F5;
			color: rgba(144, 144,144);
			.left{
				float: left;
				display: flex;
				justify-content: center;
				align-items: center;
				:deep(){
					.uni-icons{
						color: $base-theme-color !important;
					}
				}
				text{
					color: $base-theme-color;
					
				}
			}
			.center{
				width: 400rpx;
				height: 100%;
				swiper{
					width: 100%;
					height: 100%;
					padding: 0 15rpx;
					.swiper-item{
						box-sizing: border-box;
						width: 100%;
						height: 100%;
						line-height: 40rpx;
						font-size: 30rpx;
						// text-align: center;
						uni-text{
							// 设置使得text文本溢出时能够显示....
							:deep(){
								span{
									overflow: hidden;
									word-break: break-all;  /* break-all(允许在单词内换行。) */
									text-overflow: ellipsis;  /* 超出部分省略号 */
									display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
									-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
									-webkit-line-clamp: 2; /** 显示的行数 **/
								}
							}
						}
					}
				}
			}
			.right{
				padding: 3rpx 0;
				:deep(){
					.uni-icons{
						color:rgba(144, 144,144) !important;
					}
				}
			}
		}
		
	}
	
	.like-shore{
		.right-shore{
			color:$font-color-sub-title ;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 30rpx;
		}
	}
	
	
</style>
