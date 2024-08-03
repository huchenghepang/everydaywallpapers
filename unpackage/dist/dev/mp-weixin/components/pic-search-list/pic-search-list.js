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
  __name: "pic-search-list",
  props: {
    keyword: {
      default: ""
    }
  },
  setup(__props) {
    let status = common_vendor.ref("loading");
    let safeArea = utils_system.getSystemInfo();
    let wallList = common_vendor.ref([]);
    let pageNum = 1;
    let props = __props;
    common_vendor.watch(() => props.keyword, () => {
      initData();
      getWallList();
    });
    function initData() {
      status.value = "loading";
      wallList.value = [];
      pageNum = 1;
    }
    async function getWallList() {
      let keyword = props.keyword;
      let data = {
        keyword,
        pageNum,
        pageSize: 9
      };
      let result = await api_apis.reqSearchAll(data);
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
    common_vendor.onLoad(() => {
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(wallList), (wallImage, index, i0) => {
          return {
            a: wallImage.smallPicurl,
            b: `/pages/detail/detail?currentIndex=${index}`,
            c: wallImage._id
          };
        }),
        b: common_vendor.unref(status) == "noMore" ? false : true
      }, (common_vendor.unref(status) == "noMore" ? false : true) ? {
        c: common_vendor.p({
          status: common_vendor.unref(status),
          size: "24",
          ["icon-type"]: "auto"
        })
      } : {}, {
        d: common_vendor.unref(safeArea).bottom
      }, common_vendor.unref(safeArea).bottom ? {
        e: common_vendor.s(`height:${common_vendor.unref(safeArea).bottom}px`)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8b84cba7"]]);
wx.createComponent(Component);
