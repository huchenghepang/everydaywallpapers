"use strict";const e=require("../../common/vendor.js"),t=require("../../api/apis.js"),i={__name:"notice",setup(i){let a=e.ref({});return e.onLoad((i=>{!async function(e){let i=await t.reqNoticeDetail({id:e});0==i.errCode&&(a.value=i.data)}(i.id),e.index.setNavigationBarTitle({title:i.title})})),(t,i)=>({a:e.t(e.unref(a).title),b:e.t(e.unref(a).author),c:e.unref(a).content})}};wx.createPage(i);
