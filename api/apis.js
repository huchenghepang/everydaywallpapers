import {requestapi} from "@/utils/requestapi.js"

// 请求首页海报的
export function reqCommendhomeBanner(){
	return requestapi("/homeBanner");
}

// /classify 获取首页分类

export function reqClassifyBar(){
	return requestapi("/classify");
}

// /randomWall 获取9张随机的照片
export function reqRandomWall(){
	return requestapi("/randomWall");ss
}

// 评分 /setupScore
export function reqGetSetupScore(data){
	return requestapi("/setupScore","get",data)
}

// 公告列表 https://tea.qingnian8.com/api/bizhi/wallNewsList
export function reqNewList(){
	return requestapi("/wallNewsList")
}

// https://tea.qingnian8.com/api/bizhi/downloadWall 获取下载
export function reqDownloadPic(data){
	return requestapi("/downloadWall","get",data)
}


// https://tea.qingnian8.com/api/bizhi/classify 获取分类中的数据 pagesize
export function reqCategoryList(data){
	return requestapi("/classify","get",data)
}


// 获取详情列表信息 wallList
export function reqWallList(data){
	return requestapi("/wallList","get",data)
}

// https://tea.qingnian8.com/api/bizhi/userWallList  我的评分和我的下载

export function reqMyScoreAndDownLoad(data){
	return requestapi("/userWallList","get",data)
}

// https://tea.qingnian8.com/api/bizhi/userInfo 用户的个人信息
export function reqUserInfo(){
	return requestapi("/userInfo")
}

// https://tea.qingnian8.com/api/bizhi/detailWall 获取单个页面的详情
export function reqSingleImage(data){
	return requestapi("/detailWall","get",data)
}

// https://tea.qingnian8.com/api/bizhi/wallNewsList 通知的详情
export function reqNoticeDetail(data){
	return requestapi("/wallNewsDetail","get",data)
}

// 搜索 https://tea.qingnian8.com/api/bizhi/searchWall
export function reqSearchAll(data){
	return requestapi("/searchWall","get",data)
}