<template>
	<view class="pic-list-box">
		<template v-for="(item,index) in imageList">
			<view class="pic-item"  hover-class="hover-class" @click="tabPage(pagePath,item._id,item.name)" :key="item._id" v-if="isMore?index !==imageList.length-1:true">
					<image :src="item.picurl" mode="aspectFill"></image>
					<view class="mask"><text selectable>{{timeAgo(item.updateTime)}}</text></view>
					<view class="info"><text selectable>{{item.name}}</text></view>
			</view>
		</template>

			<view class="pic-item" v-if="isMore" hover-class="hover-class">
				<image :src="isMorePicUrl" mode="aspectFill"></image>
				<navigator url="/pages/classify/classify" open-type="switchTab" >
					<view class="mask-more">
						<uni-icons type="more-filled" size="30"></uni-icons>
						<text>更多</text>
					</view>
				</navigator>
			</view>
	</view>
	
</template>

<script setup>
	import {timeAgo} from "@/utils/time.js"
	import { defineProps,computed,ref } from 'vue'
	let props = defineProps({
		imageList:{
			require:true,
			default:[],
		},
		isMore:{
			default:false,
		},
		pagePath:{
			default:"/pages/categoryinfolist/categoryinfolist",
		},
		navigatorFrag:{
			type:Boolean,
			default:true,
		}
	})
	
	const isMorePicUrl = computed(()=>{
		if(props.isMore && props.imageList.length !==0){
			return props.imageList[props.imageList.length-1].picurl || ""
		}
		})
	function tabPage(pagePath,classid,title){
		if(props.navigatorFrag){
			uni.navigateTo({
				url:pagePath+"?classid="+classid+"&title="+title
			})
		}else{
			uni.switchTab({
				url:pagePath,
			})
		}
		
	}
	
	
</script>

<style scoped lang="scss">
	.pic-list-box{
		width: 100%;
		display: grid;
		grid-template-rows: auto;
		padding: 0 40rpx 10rpx;
		grid-template-columns: repeat(3,220rpx);
		grid-gap: 10rpx;
		.pic-item{
			width: 220rpx;
			height: 340rpx;
			position: relative;
			box-shadow: 2px 3px 4px 2px rgba(48, 55, 66, 0.35);
			transition-property: transform;
			transition-duration: 0.4s;
			transition-delay: 0ms;
			transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
			:deep(){
				image{
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
				
			}
			
			.mask{
				position: absolute;
				top: 0;
				left: 0;
				background-image: linear-gradient(to bottom right,$base-theme-sub-color,$base-theme-color) !important;
				
				// 设置背景朦胧 模糊
				backdrop-filter: blur(6px);
				color: $font-color-sub-title;
				border-radius: 10rpx;
			}
			
			.info{
				position: absolute;
				bottom: 0;
				width: 100%;
				height: 60rpx;
				text-align: center;
				color:#fafafa;
				font-family: $font-family-recommend;
				// font-family: Georgia, Times, "Times New Roman", serif;;
				// background-color:$background-color-bottom !important;
				background-image: linear-gradient(to right,$background-color-bottom,$base-theme-sub-color,$base-theme-color) !important;
				backdrop-filter: blur(5px);
				border-radius: 10rpx;
				
			}
			
			
		}
		.pic-item:last-child{			
			.mask-more{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				text-align: center;
				// 设置遮罩
				 background-color: rgba(0, 0, 0, 0.5);
				 // z-index: 1000;
				 backdrop-filter: blur(8rpx);
				 font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
				 font-size:36rpx;
				 color: #f2faf7;
				 font-weight: 200;
				
			}
		}
		.pic-item:hover{
			box-shadow: 0 16px 32px 0 rgba(48, 55, 66, 0.15);
			transform: translate(0,-3px);
		}
		
		.hover-class{
			box-shadow: 0 16px 32px 0 rgba(48, 55, 66, 0.15);
			transform: translate(0,-3px);
		}
	}
</style>
