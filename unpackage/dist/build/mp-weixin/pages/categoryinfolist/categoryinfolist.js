"use strict";const e=require("../../common/vendor.js"),t=require("../../utils/system.js"),a=require("../../api/apis.js");if(!Array){e.resolveComponent("uni-load-more")()}Math;const o={__name:"categoryinfolist",setup(o){let s=e.ref("loading"),i=t.getSystemInfo(),n=e.ref([]),r=1,l="",c="",u="详情列表";async function d(){let e,t;l?(e={classid:l,pageNum:r,pageSize:9},t=await a.reqWallList(e)):c&&(e={type:c,pageNum:r,pageSize:9},t=await a.reqMyScoreAndDownLoad(e)),0==t.errCode&&(t.data.length?(n.value=[...n.value,...t.data],t.data.length<9&&(s.value="noMore")):s.value="noMore")}return e.onLoad((t=>{u=t.title,e.index.setNavigationBarTitle({title:t.title}),t.classid?l=t.classid:t.type&&(c=t.type),d()})),e.onReachBottom((()=>{"noMore"!==s.value&&(r++,d())})),e.onHide((()=>{(async()=>{e.index.setStorage({key:"imageList",data:n.value,success(){},fail(){}})})()})),e.onShareAppMessage((()=>({title:"天天壁纸",desc:"天天壁纸，每天分享好看的壁纸~~~",path:"/pages/categoryinfolist/categoryinfolist?classid="+l+"&title="+u,success(){console.log("成功分享"),e.index.showToast({title:"分享成功！"})}}))),(t,a)=>e.e({a:e.f(e.unref(n),((e,t,a)=>({a:e.smallPicurl,b:`/pages/detail/detail?currentIndex=${t}`,c:e._id}))),b:e.p({status:e.unref(s),size:"24","icon-type":"auto"}),c:e.unref(i).bottom},e.unref(i).bottom?{d:e.s(`height:${e.unref(i).bottom}px`)}:{})}},s=e._export_sfc(o,[["__scopeId","data-v-c762ab29"]]);o.__runtimeHooks=2,wx.createPage(s);
