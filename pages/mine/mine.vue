<template>
	<view class="pageBg mine">
		<view class="userInfo">
			<view class="avator">
				<image src="/static/skycity-avator.jpeg" mode="aspectFill"></image>
			</view>
			<view class="myIp">
				<text>{{userInfo.IP}}</text>
			</view>
			<view class="myLocation"><text>{{userInfo.address?.city ||userInfo.address?.province || userInfo.address?.country}}  </text></view>
		</view>
		<view class="section">
			<commonPush class="item" @click="goPage('download')">
				
					<template v-slot:left class="left">
						
						<uni-icons type="download-filled" size="20"></uni-icons>
						<text>我的下载</text>
					</template>
					<template v-slot:right class="right">
							<text >{{userInfo.downloadSize}}</text>
							<uni-icons type="arrow-right" size="20" class="right-text"></uni-icons>	
					</template>
				
				
			</commonPush>
			<commonPush class="item"  @click="goPage('score')">
				<template v-slot:left class="left">
					<uni-icons type="star-filled" size="20"></uni-icons>
					<text>我的评分</text>
				</template>
				<template v-slot:right class="right">
						<text  >{{userInfo.scoreSize}}</text>
						<uni-icons type="arrow-right" size="20" class="right-text"></uni-icons>
				</template>
			</commonPush>
			<commonPush class="item">
				<template v-slot:left class="left">
					<uni-icons type="contact"  size="20" ></uni-icons>
					<text>联系客服</text>
				</template>
			</commonPush>
		</view>
		<view class="section">
			<commonPush class="item">
				<template v-slot:left class="left">
					<uni-icons type="notification-filled"  size="20" ></uni-icons>
					<text>订阅更新</text>
				</template>
			</commonPush>
			<commonPush class="item">
				<template v-slot:left class="left">
					<uni-icons type="flag-filled"  size="20" ></uni-icons>
					<text>通知列表</text>
				</template>
			</commonPush>
		</view>
	</view>
</template>

<script setup>
import commonPush from '../../components/common-push/common-push.vue'
import {ref} from "vue"
import {reqUserInfo} from "@/api/apis.js"
import {onLoad} from '@dcloudio/uni-app'
const userInfo = ref({});

function goPage(type){
	if(type){
		let title;
		if(type=="score"){
			title = "我的评分"
		}else if(type=="download"){
			title = "我的下载"
		}
		uni.navigateTo({
			url:"/pages/categoryinfolist/categoryinfolist?type="+type+"&title="+title
		})
	}
	
}

async function getUserInfo(){
	uni.showLoading({
		title:"加载中..."
	})
	let result = await reqUserInfo();
	uni.hideLoading()
	if(result.errCode==0){
		userInfo.value = result.data;
	}
}


onLoad(()=>{
	
	getUserInfo();
	
})



</script>

<style scoped lang="scss">
	@import url("@/common/style/common-theme-style.scss");
	
	.mine{
		padding: 5rpx 20rpx;
		display: flex;
		flex-direction: column;
		text-align: center;
		align-items: center;
		.userInfo{
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			.avator{
				height: 160rpx;
				width:160rpx;
				margin-top: 60rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			
			.myIp{
				margin-top: 30rpx;
				font-family: $font-family-recommend;
				font-size: 40rpx;
				color:#000;
			}
			
			.myLocation{
				margin-top: 10rpx;
				font-family: $font-family-recommend;
				font-size: 30rpx;
				color: $font-color-sub-title;
			}
		}
		.section{
			margin-top: 30rpx;
			width: 100%;
			box-shadow: 0 0 5rpx rgba(0, 0, 0, 0.5);
			border-radius: 20rpx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			font-size: 30rpx;
			border: 1px solid #eee;
			.item{
				margin: 4rpx;
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				color:$font-color-sub-title !important;
				border-bottom:1px solid #eee ;
				.left{
					display: inline-block;
					height: 100%;
					text-align: center;	
				}
				:deep(){
					.uni-icons{
						color:$base-theme-color !important;
						margin-left: 20	rpx;
						margin-right: 10rpx;
					}
				}
				.right{	
					display: inline-block;
					height: 100%;
					text-align: center;	
					.right-text{
						color:$font-color-sub-title !important;
						margin: 10rpx;
					
					}
					
				}
			}
		.item:last-child{
			border: none;
		}
		}
	}
</style>