"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_search_bar2 + _easycom_uni_icons2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_icons + picSearchList)();
}
const picSearchList = () => "../../components/pic-search-list/pic-search-list.js";
const _sfc_main = {
  __name: "search",
  setup(__props) {
    let searchValue = common_vendor.ref("");
    let hotSearchValueList = common_vendor.ref(["明星", "美女", "帅哥", "萌宠"]);
    let recentlySearchValueList = common_vendor.ref([]);
    let keyword = common_vendor.ref(null);
    let picSearch = common_vendor.ref(null);
    function changeKeyWord(e) {
      if (e.target.dataset.tab) {
        searchValue.value = e.target.dataset.tab;
        handleSearch();
      }
    }
    function handleSearch() {
      let searchInfo = recentlySearchValueList.value;
      keyword.value = searchValue.value;
      let frag = searchInfo.some((item) => {
        return item.value == searchValue.value;
      });
      if (frag) {
        searchInfo = searchInfo.map((item) => {
          if (item.value == searchValue.value) {
            item.count++;
          }
          return item;
        });
      } else {
        if (recentlySearchValueList.value.length >= 5) {
          recentlySearchValueList.value.shift();
        }
        recentlySearchValueList.value.push({ count: 1, value: searchValue.value });
        common_vendor.index.setStorageSync("recentlySearchValueList", recentlySearchValueList.value);
      }
    }
    function cleardata() {
      recentlySearchValueList.value = [];
      common_vendor.index.clearStorage();
    }
    common_vendor.onLoad(() => {
      if (common_vendor.index.getStorageInfoSync().keys.includes("recentlySearchValueList")) {
        recentlySearchValueList.value = common_vendor.index.getStorageSync("recentlySearchValueList").reverse();
      }
    });
    common_vendor.onReachBottom(() => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleSearch),
        b: common_vendor.o(common_vendor.m(($event) => common_vendor.isRef(searchValue) ? searchValue.value = $event : searchValue = $event, {
          trim: true
        }, true)),
        c: common_vendor.p({
          placeholder: "请输入要搜索的内容",
          radius: "15",
          bgColor: "#f8f8f8",
          ["text-color"]: "#787878",
          maxlength: "20",
          focus: true,
          modelValue: common_vendor.unref(searchValue)
        }),
        d: common_vendor.o(cleardata),
        e: common_vendor.p({
          type: "trash",
          size: "24"
        }),
        f: common_vendor.f(common_vendor.unref(recentlySearchValueList), (item, index, i0) => {
          return {
            a: common_vendor.t(item.value),
            b: item.value,
            c: (item.count > 10 ? true : false) ? 1 : ""
          };
        }),
        g: common_vendor.o(changeKeyWord),
        h: common_vendor.f(common_vendor.unref(hotSearchValueList), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: item
          };
        }),
        i: common_vendor.o(changeKeyWord),
        j: common_vendor.unref(keyword)
      }, common_vendor.unref(keyword) ? {
        k: common_vendor.sr(picSearch, "c10c040c-2", {
          "k": "picSearch"
        }),
        l: common_vendor.p({
          keyword: common_vendor.unref(keyword)
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"]]);
wx.createPage(MiniProgramPage);
