<template>
	<view class="pageBg">
		<customNavigatorBar title="分类"></customNavigatorBar>
		<view class="filled"></view>
		<customPictureList :isMore="false" :imageList="categoryList">
		</customPictureList>
	</view>
</template>

<script setup>
	import customNavigatorBar from '../../components/custom-navigator-bar/custom-navigator-bar.vue';
	import customPictureList from '@/components/custom-picture-list/custom-picture-list.vue';
	import {
		reqCategoryList
	} from '@/api/apis.js'
	import {
		onLoad,
		onShareAppMessage
	} from "@dcloudio/uni-app"
	import {
		ref
	} from "vue"
	let categoryList = ref([]);

	async function getCategoryListByNumber(pageSize) {
		uni.showLoading({
			title: "加载中"
		})
		let result = await reqCategoryList({
			pageSize
		});
		uni.hideLoading();
		if (result.errCode == 0) {
			categoryList.value = result.data;
			// console.log(categoryList);
		}
	}
	
	onLoad(()=>{
		getCategoryListByNumber(15);
	})

	onShareAppMessage(() => {
		return {
			title: "天天壁纸",
			desc: "天天壁纸，每天分享好看的壁纸~~~",
			path: "/page/classify/classify",
			success() {
				// console.log("成功分享");
				uni.showToast({
					title: "分享成功！"
				})
			}

		}
	})
</script>

<style scoped lang="scss">
	@import url("@/common/style/common-theme-style.scss");

	.filled {
		width: 100%;
		height: 20rpx;
	}
</style>