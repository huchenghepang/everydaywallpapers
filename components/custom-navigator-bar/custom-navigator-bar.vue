<template>
	
	<view class="bar">
		<view class="status-bar" :style="`height:${statusBarHeight}px`"></view>
		<view class="navigator-bar" :style="`height:${CustomNavigatorBarHeight}px`">
			<view class="title">{{title}}</view>
			<navigator url="/pages/search/search" class="search-box" :style="`height:${CustomNavigatorBarHeight-15}px`">
				<uni-icons type="search" class="search" size="20" color="#7C827E"></uni-icons>
				<text class="text">搜索</text>
			</navigator>
		</view>
		
	</view>
	<view class="filled" :style="`height:${statusBarHeight+CustomNavigatorBarHeight}px`"></view>
</template>

<script setup>
	import {
		defineProps
	} from "vue"
	import {
		getTopStatusBarInfo,
		getTitleBarHeight,
	} from "@/utils/system.js"
	let statusBarHeight = getTopStatusBarInfo().statusBarHeight;
	let CustomNavigatorBarHeight = getTitleBarHeight();
	defineProps({
		title: {
			default: "标题"
		}
	})
</script>

<style scoped lang="scss">
	@property --mycolor-a {
		syntax: "<color>";
		inherits: false;
		initial-value: fuchsia;
	}

	@property --mycolor-b {
		syntax: "<color>";
		inherits: false;
		initial-value: #f79188;
	}

	@property --mycolor-c {
		syntax: "<color>";
		inherits: false;
		initial-value: red;
	}

	@keyframes change {
		20% {
			--mycolor-a: #f79188;
			--mycolor-b: red;
			--mycolor-c: fuchsia;
		}

		40% {
			--mycolor-a: #ff3c41;
			--mycolor-b: #e228a0;
			--mycolor-c: #2e4c96;
		}

		60% {
			--mycolor-a: orange;
			--mycolor-b: green;
			--mycolor-c: teal;
		}

		80% {
			--mycolor-a: #ae63e4;
			--mycolor-b: #0ebeff;
			--mycolor-c: #efc371;
		}
	}

	.bar {
		z-index: 99999;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background: linear-gradient(45deg, var(--mycolor-a), var(--mycolor-b), var(--mycolor-c));
		animation: change 10s infinite linear;
		.navigator-bar {
			
			display: flex;
			padding: 0 30rpx;
			align-items: center;

			.title {
				padding: 0 30rpx;
				font-size: 36rpx;
				font-weight: 700;
			}

			.search-box {
				width: 40vw;
				border-radius: 60rpx;
				background-color: #CCCCCC;
				line-height: 1rem;
				display: flex;
				align-items: center;
				padding: 0 30rpx;

				.text {
					font-size: 30rpx;
					color: #7C827E;
					padding: 0 20rpx;
					line-height: 1rem;
				}

			}
		}
	}
	.filled{
		display: block;
	}
</style>