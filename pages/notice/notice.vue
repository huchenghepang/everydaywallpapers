<template>
	<view class="article">
		<view class="title">
			<h3>{{noticeInfo.title}}</h3>
		</view>
		<view class="author"><h5>作者:{{noticeInfo.author}}</h5></view>
		<rich-text :nodes="noticeInfo.content"></rich-text>
	</view>

</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		reqNoticeDetail
	} from '@/api/apis.js'
	import {
		ref
	} from 'vue'

	let noticeInfo = ref({});

	async function getNoticeInfo(id) {
		let result = await reqNoticeDetail({
			id
		})
		if (result.errCode == 0) {
			noticeInfo.value = result.data;
		}
	}


	onLoad((e) => {
		getNoticeInfo(e.id);
		uni.setNavigationBarTitle({
			title: e.title
		})
	})
</script>

<style scoped lang="scss">

</style>