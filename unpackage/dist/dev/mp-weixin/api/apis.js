"use strict";
const utils_requestapi = require("../utils/requestapi.js");
function reqCommendhomeBanner() {
  return utils_requestapi.requestapi("/homeBanner");
}
function reqClassifyBar() {
  return utils_requestapi.requestapi("/classify");
}
function reqRandomWall() {
  return utils_requestapi.requestapi("/randomWall");
}
function reqGetSetupScore(data) {
  return utils_requestapi.requestapi("/setupScore", "get", data);
}
function reqNewList() {
  return utils_requestapi.requestapi("/wallNewsList");
}
function reqDownloadPic(data) {
  return utils_requestapi.requestapi("/downloadWall", "get", data);
}
function reqCategoryList(data) {
  return utils_requestapi.requestapi("/classify", "get", data);
}
function reqWallList(data) {
  return utils_requestapi.requestapi("/wallList", "get", data);
}
function reqMyScoreAndDownLoad(data) {
  return utils_requestapi.requestapi("/userWallList", "get", data);
}
function reqUserInfo() {
  return utils_requestapi.requestapi("/userInfo");
}
function reqSingleImage(data) {
  return utils_requestapi.requestapi("/detailWall", "get", data);
}
function reqNoticeDetail(data) {
  return utils_requestapi.requestapi("/wallNewsDetail", "get", data);
}
function reqSearchAll(data) {
  return utils_requestapi.requestapi("/searchWall", "get", data);
}
exports.reqCategoryList = reqCategoryList;
exports.reqClassifyBar = reqClassifyBar;
exports.reqCommendhomeBanner = reqCommendhomeBanner;
exports.reqDownloadPic = reqDownloadPic;
exports.reqGetSetupScore = reqGetSetupScore;
exports.reqMyScoreAndDownLoad = reqMyScoreAndDownLoad;
exports.reqNewList = reqNewList;
exports.reqNoticeDetail = reqNoticeDetail;
exports.reqRandomWall = reqRandomWall;
exports.reqSearchAll = reqSearchAll;
exports.reqSingleImage = reqSingleImage;
exports.reqUserInfo = reqUserInfo;
exports.reqWallList = reqWallList;
