<template>
	<view class="category-picture-contaniner">
		<view class="pic-box-list">
			<navigator class="pic-item" v-for="(wallImage,index) in wallList " :url="`/pages/detail/detail?currentIndex=${index}`" :key="wallImage._id">
				<image :src="wallImage.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
		<view class="nomoredata"><uni-load-more :status="status" size="24" icon-type="auto"></uni-load-more></view>
		<view v-if="safeArea.bottom" :style="`height:${safeArea.bottom}px`"></view>
	</view>

</template>

<script setup>
	import {
		getSystemInfo
	} from "@/utils/system.js"
	import {
		ref
	} from "vue"
	import {
		reqWallList,
		reqMyScoreAndDownLoad,
	} from "@/api/apis.js"
	
	import {onLoad,onReachBottom,onHide,onShareAppMessage} from "@dcloudio/uni-app"
	let status = ref("loading");
	let safeArea = getSystemInfo();
	let wallList = ref([])
	let pageNum = 1;
	let classid = "";
	let type = "";
	let title = "详情列表";

	async function getWallList() {
		let data;
		let result;
		// 整理数据
		if(classid){
			data = {
				classid,
				pageNum,
				pageSize: 9,
			}
			result = await reqWallList(data);
		}else if(type){
			data = {
				type,
				pageNum,
				pageSize: 9,
			}
			result = await reqMyScoreAndDownLoad(data);
		}
		if (result.errCode == 0) {
			if(result.data.length){
				wallList.value = [...wallList.value,...result.data];
				// console.log(wallList);
				if(result.data.length<9){
					status.value = "noMore";
				}
			}else{
				status.value = "noMore";
			}
			
		}
	}
	
	
	
	const saveWallList= async () => {
		uni.setStorage({
			key:"imageList",
			data:wallList.value,
			success() {
				// console.log("成功存储了图片");
			},
			fail() {
				// console.log("保存图片数据失败");
			}
		})
	}
	
	onLoad((e)=>{
		title = e.title
		uni.setNavigationBarTitle({
			title:e.title
		})
		if(e.classid){
			classid = e.classid;
		}else if(e.type){
			type = e.type
		}
		getWallList()
		
	})
	
	onReachBottom(()=>{
		if(status.value!=="noMore"){
			pageNum++;
			getWallList(classid,pageNum);
		}
	})
	
	// 监听页面跳转
	/* onUnload((e)=>{
		console.log(e);
		// 这里如果是返回上一页 就不会触发隐藏
	}) */
	onHide(()=>{
		saveWallList();
	})
	
	onShareAppMessage(()=>{
		return {
				title:"天天壁纸",
				desc:"天天壁纸，每天分享好看的壁纸~~~",
				path:"/pages/categoryinfolist/categoryinfolist?classid="+classid+"&title="+title,
				success() {
					console.log("成功分享")
					uni.showToast({
						title:"分享成功！"
					})
				}
				
			}
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