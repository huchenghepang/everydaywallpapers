"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (customNavigatorBar + _easycom_uni_icons + DayilyRecommend + commonPush + customPictureList)();
}
const DayilyRecommend = () => "../../components/DayilyRecommend/DayilyRecommend.js";
const commonPush = () => "../../components/common-push/common-push.js";
const customPictureList = () => "../../components/custom-picture-list/custom-picture-list.js";
const customNavigatorBar = () => "../../components/custom-navigator-bar/custom-navigator-bar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let CommendhomeBannerList = common_vendor.ref([]);
    let commendHomeCategoryList = common_vendor.ref([]);
    let newList = common_vendor.ref([]);
    const getCommendhomeBanner = async () => {
      let result = await api_apis.reqCommendhomeBanner();
      CommendhomeBannerList.value = result.data;
    };
    const getCommendHomeCategoryList = async () => {
      let result = await api_apis.reqClassifyBar();
      commendHomeCategoryList.value = result.data;
    };
    async function getNewList() {
      let result = await api_apis.reqNewList();
      newList.value = result.data;
    }
    function goDetail(e) {
      if (e.target.dataset.commendItem) {
        let [url, target] = e.target.dataset.commendItem.split(":");
        url = url.replace("id", "classid").replace("name", "title");
        if (target == "self") {
          common_vendor.index.navigateTo({
            url: "/pages/categoryinfolist/categoryinfolist?" + url
          });
        } else if (target == "miniProgram") {
          common_vendor.index.showToast({
            title: "跳转小程序"
          });
          console.log(url);
          common_vendor.index.navigateToMiniProgram({
            appId: "wxbd89d0ba67f6b6a4",
            path: url,
            success() {
              console.log("打开成功");
            }
          });
        }
      }
    }
    common_vendor.onLoad(() => {
      getCommendhomeBanner();
      getCommendHomeCategoryList();
      getNewList();
    });
    common_vendor.onShareAppMessage((e) => {
      return {
        title: "天天壁纸",
        desc: "天天壁纸，每天分享好看的壁纸~~~",
        success() {
          common_vendor.index.showToast({
            title: "分享成功！"
          });
        }
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "天天壁纸",
        imageUrl: "/static/wallpaper/preview1.jpg"
      };
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "推荐"
        }),
        b: common_vendor.f(common_vendor.unref(CommendhomeBannerList), (commendItem, index, i0) => {
          return {
            a: commendItem.picurl,
            b: `${commendItem.url}:${commendItem.target}`,
            c: commendItem._id
          };
        }),
        c: common_vendor.o(goDetail),
        d: common_vendor.p({
          type: "sound",
          size: "30"
        }),
        e: common_vendor.f(common_vendor.unref(newList), (notice, index, i0) => {
          return {
            a: common_vendor.t(notice.title),
            b: `/pages/notice/notice?id=${notice._id}&title=${notice.title}`
          };
        }),
        f: common_vendor.p({
          type: "arrow-right",
          size: "30"
        }),
        g: common_vendor.p({
          title: `精选图片`
        }),
        h: common_vendor.p({
          isMore: true,
          imageList: common_vendor.unref(commendHomeCategoryList)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
