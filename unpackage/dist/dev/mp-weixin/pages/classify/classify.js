"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Math) {
  (customNavigatorBar + customPictureList)();
}
const customNavigatorBar = () => "../../components/custom-navigator-bar/custom-navigator-bar.js";
const customPictureList = () => "../../components/custom-picture-list/custom-picture-list.js";
const _sfc_main = {
  __name: "classify",
  setup(__props) {
    let categoryList = common_vendor.ref([]);
    async function getCategoryListByNumber(pageSize) {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      let result = await api_apis.reqCategoryList({
        pageSize
      });
      common_vendor.index.hideLoading();
      if (result.errCode == 0) {
        categoryList.value = result.data;
      }
    }
    common_vendor.onLoad(() => {
      getCategoryListByNumber(15);
    });
    common_vendor.onShareAppMessage(() => {
      return {
        title: "天天壁纸",
        desc: "天天壁纸，每天分享好看的壁纸~~~",
        path: "/page/classify/classify",
        success() {
          common_vendor.index.showToast({
            title: "分享成功！"
          });
        }
      };
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "分类"
        }),
        b: common_vendor.p({
          isMore: false,
          imageList: common_vendor.unref(categoryList)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6bcfa975"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
