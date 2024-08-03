<template>
	<view class="push-box">
		<view class="left">
			<slot name="left">
				<h3>{{title}}</h3>
			</slot>
			
		</view>
		<view class="center">
			<slot name="center"></slot>
		</view>
		<view class="right">
			<slot name="right"></slot>
		</view>
	</view>

</template>

<script setup>
import {defineProps} from "vue"
defineProps({
	title:{
		require:true,
		default:"标题",
	}
})
</script>

<style scoped lang="scss">
.push-box{
	display: flex;
	justify-content: space-between;
	height: 60rpx;
}
</style>