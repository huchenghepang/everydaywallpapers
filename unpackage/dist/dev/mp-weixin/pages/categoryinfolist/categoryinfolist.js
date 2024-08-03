"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
const _sfc_main = {
  __name: "categoryinfolist",
  setup(__props) {
    let status = common_vendor.ref("loading");
    let safeArea = utils_system.getSystemInfo();
    let wallList = common_vendor.ref([]);
    let pageNum = 1;
    let classid = "";
    let type = "";
    let title = "详情列表";
    async function getWallList() {
      let data;
      let result;
      if (classid) {
        data = {
          classid,
          pageNum,
          pageSize: 9
        };
        result = await api_apis.reqWallList(data);
      } else if (type) {
        data = {
          type,
          pageNum,
          pageSize: 9
        };
        result = await api_apis.reqMyScoreAndDownLoad(data);
      }
      if (result.errCode == 0) {
        if (result.data.length) {
          wallList.value = [...wallList.value, ...result.data];
          if (result.data.length < 9) {
            status.value = "noMore";
          }
        } else {
          status.value = "noMore";
        }
      }
    }
    const saveWallList = async () => {
      common_vendor.index.setStorage({
        key: "imageList",
        data: wallList.value,
        success() {
        },
        fail() {
        }
      });
    };
    common_vendor.onLoad((e) => {
      title = e.title;
      common_vendor.index.setNavigationBarTitle({
        title: e.title
      });
      if (e.classid) {
        classid = e.classid;
      } else if (e.type) {
        type = e.type;
      }
      getWallList();
    });
    common_vendor.onReachBottom(() => {
      if (status.value !== "noMore") {
        pageNum++;
        getWallList();
      }
    });
    common_vendor.onHide(() => {
      saveWallList();
    });
    common_vendor.onShareAppMessage(() => {
      return {
        title: "天天壁纸",
        desc: "天天壁纸，每天分享好看的壁纸~~~",
        path: "/pages/categoryinfolist/categoryinfolist?classid=" + classid + "&title=" + title,
        success() {
          console.log("成功分享");
          common_vendor.index.showToast({
            title: "分享成功！"
          });
        }
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(wallList), (wallImage, index, i0) => {
          return {
            a: wallImage.smallPicurl,
            b: `/pages/detail/detail?currentIndex=${index}`,
            c: wallImage._id
          };
        }),
        b: common_vendor.p({
          status: common_vendor.unref(status),
          size: "24",
          ["icon-type"]: "auto"
        }),
        c: common_vendor.unref(safeArea).bottom
      }, common_vendor.unref(safeArea).bottom ? {
        d: common_vendor.s(`height:${common_vendor.unref(safeArea).bottom}px`)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-30d023b0"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
