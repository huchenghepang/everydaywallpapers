"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    let statusBarHeight = utils_system.getTopStatusBarInfo().statusBarHeight;
    let dateTimeBoxTop = statusBarHeight + 40;
    let isShowMask = common_vendor.ref(false);
    let popupInfo = common_vendor.ref(null);
    let popupgarde = common_vendor.ref(null);
    common_vendor.ref(3.5);
    let myStar = common_vendor.ref(0);
    const imageDetailList = common_vendor.ref([]);
    let currentIndex = common_vendor.ref(0);
    let isShowImageList = common_vendor.ref([]);
    const imageInfo = common_vendor.ref({
      classid: "",
      nickname: "",
      score: 0,
      tabs: ["未知"],
      _id: "",
      description: "没有相关的描述~~~",
      fullPicurl: ""
    });
    let isUserScore = common_vendor.ref(false);
    let count = common_vendor.computed(() => {
      return imageDetailList.value.length;
    });
    isUserScore = common_vendor.computed(() => {
      var _a;
      if ((_a = imageDetailList.value[currentIndex.value]) == null ? void 0 : _a.userScore) {
        return true;
      } else {
        return false;
      }
    });
    let userScore = common_vendor.computed(() => {
      var _a;
      return isUserScore ? (_a = imageDetailList.value[currentIndex.value]) == null ? void 0 : _a.userScore : 0;
    });
    function toggleMask() {
      isShowMask.value = !isShowMask.value;
    }
    function goBack() {
      common_vendor.index.navigateBack({
        fail() {
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
        }
      });
    }
    function toggleInfo() {
      imageInfo.value = handleImageInfo();
      popupInfo.value.open();
    }
    function closeInfo() {
      popupInfo.value.close();
    }
    function openStar() {
      imageInfo.value = handleImageInfo();
      popupgarde.value.open();
    }
    function confirmStar() {
      imageDetailList.value[currentIndex.value].score = myStar.value;
      setUpScore();
      popupgarde.value.close();
    }
    function closeStar() {
      popupgarde.value.close();
    }
    function replaceUrl(url) {
      return url.replace("_small.webp", ".jpg");
    }
    function changeImage(e) {
      currentIndex.value = e.detail.current;
      resolvePicture(currentIndex.value);
      imageInfo.value = handleImageInfo();
      myStar.value = 0;
    }
    function handleImageInfo() {
      let fuzhi = imageDetailList.value[currentIndex.value];
      let {
        ...imageInfo2
      } = fuzhi;
      return imageInfo2;
    }
    function handleCore() {
      imageDetailList.value[currentIndex.value].userScore = myStar.value;
      common_vendor.index.setStorageSync("imageList", imageDetailList.value);
    }
    async function getSingleList(data) {
      let result = await api_apis.reqSingleImage(data);
      if (result.errCode == 0) {
        common_vendor.index.setStorageSync("imageList", result.data);
      }
    }
    async function setUpScore() {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      let data = {
        classid: imageInfo.value.classid,
        wallId: imageInfo.value._id,
        userScore: myStar.value
      };
      let result = await api_apis.reqGetSetupScore(data);
      common_vendor.index.hideLoading();
      if (result.errCode == 0) {
        handleCore();
        common_vendor.index.showModal({
          title: "评分提醒",
          content: "成功评分了，亲~~~",
          showCancel: false
        });
      }
    }
    function getImageList() {
      try {
        let imageList = common_vendor.index.getStorageSync("imageList");
        imageDetailList.value = imageList.map((item) => {
          item.fullPicurl = replaceUrl(item.smallPicurl);
          return item;
        });
      } catch (e) {
        console.log(e);
      }
    }
    async function downLoadPictur() {
      try {
        common_vendor.index.showLoading({
          title: "下载中...",
          mask: true
        });
        imageInfo.value = handleImageInfo();
        let data = {
          classid: imageInfo.value.classid,
          wallId: imageInfo.value._id
        };
        let result = await api_apis.reqDownloadPic(data);
        if (result.data.errCode !== 0) {
          common_vendor.index.showToast({
            title: "下载失败",
            duration: 2e3
          });
          common_vendor.index.hideLoading();
          return;
        }
        if (result.data.errCode == 0) {
          common_vendor.index.getImageInfo({
            src: imageInfo.value.fullPicurl,
            success(res) {
              common_vendor.index.saveImageToPhotosAlbum({
                filePath: res.path,
                success() {
                  common_vendor.index.showModal({
                    title: "保存到相册成功",
                    showCancel: false
                  });
                },
                fail(err) {
                  if (err.errMsg == "saveImageToPhotosAlbum:fail cancel") {
                    common_vendor.index.showToast({
                      title: "保存失败，请点击重新下载",
                      icon: "none"
                    });
                    return;
                  }
                  if (err.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
                    common_vendor.index.showModal({
                      title: "保存照片失败",
                      content: "请确认授予保存照片的权限",
                      success(res2) {
                        if (res2.confirm) {
                          common_vendor.index.openSetting({
                            success(setting) {
                              if (setting.authSetting["scope.writePhotosAlbum"]) {
                                common_vendor.index.showToast({
                                  title: "获取授权成功",
                                  icon: "success"
                                });
                              } else {
                                common_vendor.index.showToast({
                                  title: "获取授权失败",
                                  icon: "error"
                                });
                              }
                            }
                          });
                        }
                      }
                    });
                  }
                },
                complete() {
                  common_vendor.index.hideLoading();
                }
              });
            },
            complete() {
              common_vendor.index.hideLoading();
            }
          });
        }
      } catch (e) {
        common_vendor.index.hideLoading();
      }
    }
    function resolvePicture(currentIndex2) {
      isShowImageList.value.push(...[currentIndex2 - 1 < 0 ? count.value - 1 : currentIndex2 - 1, currentIndex2, currentIndex2 + 1 > count.value - 1 ? 0 : currentIndex2 + 1]);
      isShowImageList.value = [...new Set(isShowImageList.value)];
    }
    common_vendor.onLoad((e) => {
      if (isShowMask.value) {
        isShowMask.value = false;
      }
      if (e.currentIndex) {
        currentIndex.value = +e.currentIndex;
        getImageList();
      }
      if (e.id) {
        let data = {
          id: e.id
        };
        currentIndex = 0;
        getSingleList(data).then(() => {
          getImageList();
          imageInfo.value = handleImageInfo();
        });
      }
      resolvePicture(currentIndex.value);
    });
    common_vendor.onShareAppMessage(() => {
      imageInfo.value = handleImageInfo();
      return {
        title: "天天壁纸",
        desc: "天天壁纸，每天分享好看的壁纸~~~",
        path: "/pages/detail/detail?id=" + imageInfo.value._id,
        success() {
          common_vendor.index.showToast({
            title: "分享成功！"
          });
        }
      };
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(imageDetailList.value, (image, index, i0) => {
          return common_vendor.e({
            a: common_vendor.unref(isShowImageList).includes(index)
          }, common_vendor.unref(isShowImageList).includes(index) ? {
            b: image.fullPicurl
          } : {}, {
            c: image._id
          });
        }),
        b: common_vendor.unref(currentIndex),
        c: common_vendor.o(changeImage),
        d: common_vendor.p({
          type: "back",
          color: "#fafafa",
          size: "30"
        }),
        e: common_vendor.s(`top:${common_vendor.unref(statusBarHeight)}px`),
        f: common_vendor.o(goBack),
        g: common_vendor.t(common_vendor.unref(currentIndex) + 1),
        h: common_vendor.t(imageDetailList.value.length),
        i: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "hh:mm"
        }),
        j: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "MM/dd"
        }),
        k: common_vendor.s(`top:${common_vendor.unref(dateTimeBoxTop)}px`),
        l: common_vendor.p({
          type: "info",
          size: "30",
          color: "black"
        }),
        m: common_vendor.o(toggleInfo),
        n: common_vendor.p({
          type: "star",
          size: "30",
          color: "black"
        }),
        o: common_vendor.o(openStar),
        p: common_vendor.p({
          type: "download",
          size: "30",
          color: "black"
        }),
        q: common_vendor.o(downLoadPictur),
        r: common_vendor.unref(isShowMask),
        s: common_vendor.o(closeInfo),
        t: common_vendor.p({
          type: "closeempty",
          size: "15"
        }),
        v: common_vendor.t(imageInfo.value._id),
        w: common_vendor.t(imageInfo.value.nickname),
        x: common_vendor.p({
          value: imageInfo.value.score,
          touchable: true,
          ["allow-half"]: true,
          size: "15",
          readonly: true
        }),
        y: common_vendor.t(imageInfo.value.score),
        z: common_vendor.t(imageInfo.value.description),
        A: common_vendor.f(imageInfo.value.tabs, (tab, index, i0) => {
          return {
            a: common_vendor.t(tab),
            b: index
          };
        }),
        B: common_vendor.sr(popupInfo, "eca06f3c-6", {
          "k": "popupInfo"
        }),
        C: common_vendor.p({
          type: "bottom"
        }),
        D: common_vendor.t(common_vendor.unref(isUserScore) ? "已经评分过了~~~" : "请给个评分吧~~~"),
        E: common_vendor.o(closeStar),
        F: common_vendor.p({
          type: "closeempty",
          size: "15"
        }),
        G: common_vendor.o(($event) => common_vendor.isRef(myStar) ? myStar.value = $event : myStar = $event),
        H: common_vendor.p({
          ["allow-half"]: true,
          disabled: common_vendor.unref(isUserScore),
          modelValue: common_vendor.unref(myStar)
        }),
        I: common_vendor.t(common_vendor.unref(isUserScore) ? common_vendor.unref(userScore) : common_vendor.unref(myStar)),
        J: common_vendor.o(confirmStar),
        K: common_vendor.unref(isUserScore),
        L: common_vendor.sr(popupgarde, "eca06f3c-9", {
          "k": "popupgarde"
        }),
        M: common_vendor.o(toggleMask)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eca06f3c"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
