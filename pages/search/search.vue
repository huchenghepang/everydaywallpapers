<template>
	<view class="pageBg">
		<uni-search-bar class="seach-bar-box" @confirm="handleSearch" placeholder="请输入要搜索的内容" v-model.trim="searchValue"
			radius="15" bgColor="#f8f8f8" text-color="#787878" maxlength="20" focus />
		<view class="search-info-main">
			<view class="history">
				<view class="header">
					<view class="title"><text>最近搜索</text></view>
					<uni-icons type="trash" class="left-icon" size="24" @click="cleardata"></uni-icons>
				</view>
				<view class="tabs" @click="changeKeyWord">
					<text  v-for="(item,index) in recentlySearchValueList" :data-tab="item.value" class="tab"
					:class="{'color-plus':item.count>10?true:false}">{{item.value}}</text>
				</view>
			</view>
			<view class="recommend">
				<view class="header">
					<view class="title"><text>热门搜索</text></view>
				</view>
				<view class="tabs" @click="changeKeyWord">
					<text class="tab" v-for="(item,index) in hotSearchValueList" :data-tab="item">{{item}}</text>
				</view>
			</view>
			
		</view>
			<picSearchList :keyword="keyword" v-if="keyword" ref="picSearch" ></picSearchList>
		
	</view>
	
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {onLoad,onReachBottom,onHide} from "@dcloudio/uni-app"
	import picSearchList from '../../components/pic-search-list/pic-search-list.vue';

	let searchValue = ref("");
	let hotSearchValueList = ref(["明星", "美女", "帅哥", "萌宠"]);
	let recentlySearchValueList = ref([]);
	let keyword = ref(null);
	let picSearch = ref(null)
	
	function changeKeyWord(e){
		if(e.target.dataset.tab){
			searchValue.value = e.target.dataset.tab;
			// picSearch.unmount();
			handleSearch();
		}
		
	}
	
	
	function handleSearch() {
		let searchInfo = recentlySearchValueList.value;
		keyword.value = searchValue.value;
		// 搜索值是否已经存在
		let frag = searchInfo.some(item => {
			return item.value == searchValue.value
		})
		
		if(frag){
			searchInfo = searchInfo.map(item=>{
				if(item.value == searchValue.value){
					item.count++
				}
				return item
			})
		}else{
			
			if(recentlySearchValueList.value.length>=5){
				recentlySearchValueList.value.shift();
			}
			recentlySearchValueList.value.push({count:1,value:searchValue.value});
			uni.setStorageSync("recentlySearchValueList",recentlySearchValueList.value);
		}
		
		
	}
	
	function cleardata(){
		recentlySearchValueList.value = [];
		uni.clearStorage();
	}
	onLoad(()=>{
		if(uni.getStorageInfoSync().keys.includes("recentlySearchValueList")){
			recentlySearchValueList.value = uni.getStorageSync("recentlySearchValueList").reverse();
		}
	})
	onReachBottom(()=>{
	})
</script>

<style scoped lang="scss">
	.pageBg {
		.search-info-main {
			padding: 30rpx;
			padding-bottom: 10rpx;

			&>view {
				margin-top: 20rpx;

			}

			.header {
				color: #8B8B8B;
				font-size: 36rpx;
				height: 50rpx;
				line-height: 1rem;

				.title {
					float: left;
				}

				.left-icon {
					float: right;
				}
			}

			.tabs {
				padding: 20rpx;
				padding-top: 10rpx;
				display: flex;
				flex-wrap: wrap;
				color: black;
				.tab {
					margin: 0 10rpx;
					height: 40rpx;
					text-wrap: nowrap;
					font-size: 28rpx;
					line-height: 40rpx;
					background-color: #F4F4F4;
					padding: 0 20rpx;
					border-radius: 20rpx;
					margin-top: 16rpx;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.color-plus{
					color: orangered;
					font-size: 30rpx;
				}
			}

		}
	}
</style>