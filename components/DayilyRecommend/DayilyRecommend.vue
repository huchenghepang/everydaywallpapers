<template>
	<view class="outer">
		<view class="top">
			<view class="left">
				<h3>{{title}}</h3>
			</view>
			
			<view class="right">
				<uni-icons type="calendar" size="30"></uni-icons>
				<uni-dateformat :date="Date.now()" format="dd日" class="date"/>
			</view>
		</view>
		<view class="main">
			<scroll-view scroll-x="true" class="scroll-box" @click="goDetail">
				<view v-for="(item,index) in RandomWallList" class="image-box" :key="item._id"  >
					<image :src="item.smallPicurl" mode="aspectFill" class="recommend-image" :data-index="index"></image>
				</view>
			</scroll-view>
		</view>
		
	</view>
	
</template>

<script setup>
	import {onLoad,onHide} from "@dcloudio/uni-app"
import {defineProps, ref} from "vue"
import {reqRandomWall} from '@/api/apis.js'
	defineProps({
		title:{
			type:String,
			required:true,
			default:"每日推荐"
		},
	})
	let RandomWallList = ref([]);
	function saveImageList(){
		uni.setStorage({
			key:"imageList",
			data:RandomWallList.value,
			success() {
				// console.log("成功存储了图片");
			},
			fail() {
				// console.log("保存图片数据失败");
			}
		})
	}
	// 请求随机图片-首页
	const getRandomWallList= async () => {
		let result = await reqRandomWall();
		RandomWallList.value =  result.data;
		saveImageList();
	}
	onLoad(()=>{
		getRandomWallList();
	})
	function goDetail(e){
		let currentIndex = e.target.dataset.index;
		uni.navigateTo({
			url:`/pages/detail/detail?currentIndex=${currentIndex}`
		})
	}
	
	onHide(()=>{
		saveImageList();
	})
	
</script>

<style scoped lang="scss">
	.outer{
		width: 100%;
		height: 560rpx;
		background-color: #fff;
		.top{
			height: 60rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.right{
				color: $base-theme-color;
				:deep(){
					.uni-icons{
						color: $base-theme-color !important;
					}
				}
				.date{
					width: 100%;
					height: 100%;
					line-height: 30px;
					font-size: 22px;
				}
			}
		}
		
		.main{
			width: 100%;
			padding: 30rpx;
			box-sizing: border-box;
			.scroll-box{
				white-space: nowrap;
				width: 100%;
				.image-box{
					display: inline-block;
					height: 430rpx;
					width: 200rpx;
					margin-right: 15rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				
				}
				.image-box:last-child{
					// background-color: red;
					margin-right: 0;
				}
			}
			
			
		}
	}
</style>
