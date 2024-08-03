// 获取系统信息
	const SYSTEM_INFO = uni.getSystemInfoSync();
// 安全区域的信息
export function getSystemInfo(){
	let {safeAreaInsets} = SYSTEM_INFO;
	return safeAreaInsets
}

// 获取状态栏的信息
export function getTopStatusBarInfo(){
	let {statusBarHeight} = SYSTEM_INFO;
	return {
		// 顶部状态栏高度
		statusBarHeight:statusBarHeight || 20
	}
} 
export function getTitleBarHeight(){
	if(uni.getMenuButtonBoundingClientRect){
		let {height,top} = uni.getMenuButtonBoundingClientRect();
		return height + (top-SYSTEM_INFO.statusBarHeight)*2
	}else{
		return 40
	}
}
// 计算导航栏的高度 通常用于自定义
export function getCustomNavigatorBarHeight(){
	// 胶囊按钮到状态栏的距离 
	return getTitleBarHeight() + SYSTEM_INFO.statusBarHeight
}
