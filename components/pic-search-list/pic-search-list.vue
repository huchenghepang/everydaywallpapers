<template>
	<view class="category-picture-contaniner">
		<view class="pic-box-list">
			<navigator class="pic-item" v-for="(wallImage,index) in wallList "
				:url="`/pages/detail/detail?currentIndex=${index}`" :key="wallImage._id">
				<image :src="wallImage.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
		<view><uni-load-more v-if="status=='noMore'?false:true || wallList.length" :status="status" size="24" icon-type="auto"></uni-load-more></view>
		<view v-if="safeArea.bottom" :style="`height:${safeArea.bottom}px`" :key="3"></view>
	</view>

</template>

<script setup>
	import {
		getSystemInfo
	} from "@/utils/system.js"
	import {
		ref,
		defineProps,
		watch
	} from "vue"
	import {
		reqSearchAll
	} from "@/api/apis.js"

	import {
		onLoad,
		onReachBottom,
		onHide
	} from "@dcloudio/uni-app"
	let status = ref("loading");
	let safeArea = getSystemInfo();
	let wallList = ref([])
	let pageNum = 1;
	let keyword;
	let props = defineProps({
		keyword: {
			default: "",
		}
	})
	
	watch(()=>props.keyword,()=>{
		initData();
		getWallList();
	})
	function initData(){
		status.value = "loading";
		wallList.value = [];
		pageNum = 1;
	}
	async function getWallList() {
		let keyword = props.keyword;
		let data = {
			keyword,
			pageNum,
			pageSize: 9,
		};
		let result = await reqSearchAll(data);
		
		if (result.errCode == 0) {
			if (result.data.length) {
				wallList.value = [...wallList.value, ...result.data];
				// console.log(wallList);
				if (result.data.length < 9) {
					status.value = "noMore";
				}
			} else {
				
				status.value = "noMore";
			}
		}
	}

	


	const saveWallList = async () => {
		uni.setStorage({
			key: "imageList",
			data: wallList.value,
			success() {
				// console.log("成功存储了图片");
			},
			fail() {
				// console.log("保存图片数据失败");
			}
		})
	}


	onLoad(() => {
		getWallList()

	})

	onReachBottom(() => {
		if (status.value !== "noMore") {
			pageNum++;
			getWallList(keyword, pageNum);
		}
	})

	// 监听页面跳转
	/* onUnload((e)=>{
		console.log(e);
		// 这里如果是返回上一页 就不会触发隐藏
	}) */
	onHide(() => {
		saveWallList();
	})
</script>

<style scoped lang="scss">
	.category-picture-contaniner {
		padding: 0 6rpx;

		.pic-box-list {
			width: 100%;
			height: 100%;
			display: grid;
			grid-template-columns: repeat(3, 244rpx);
			grid-template-rows: auto;
			grid-gap: 2rpx;

			.pic-item {
				width: 100%;
				height: 550rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>