// 封装原生的UNIAPP.request()
// 请求头的密钥
const SECRET_KEY = 15970460916;
 
 // 封装方法
const BASE_URL = 'https://tea.qingnian8.com/api/bizhi';


/**
 * @description: 封装的网络请求器
 * @param {PageURIString} url
 * @param {String} method
 * @param {Object} data
 * @param {Object} header
 * @return {Promise}
 * @author: huchenghepang
 */
export function requestapi(newurl,method="get",data={},header={}){
	let url = BASE_URL+newurl;
	header["access-key"] = "15970460916";
	return new Promise((reslove,reject)=>{
		uni.request({
			url,
			method,
			data,
			header,
			success(res) {
				if(res.data.errCode===0){
					reslove(res.data);
				}else if(res.data.errCode===400){
					uni.showModal({
						title:"请求出现错误",
						content:res.data.errMsg,
						showCancel:false
					})
					reject(res.data)
				}else{
					uni.showModal({
						title:res.data.errMsg,
						icon:"none"
					})
					reject(res.data)
				}
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

