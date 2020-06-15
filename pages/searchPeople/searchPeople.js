//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: false,
    searchvalue: null,
    dataList: [],
  },
  onLoad: function () {
  },
  onShow: function () {
    this.get_goods('all');
  },
  //从数据库获得新数据
  get_goods: function (key) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: app.globalData.baseurl + '/api/get/findPerson/' + key,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) { //成功后根据当前的页面刷新次数进行黏接或重填

        var data = res.data;
        console.log(data);
        that.setData({
          dataList: res.data
        });
        wx.hideLoading();
      },
      fail: function (res) {
        wx.hideLoading();
      }
    })
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  release: function () {
    if (app.globalData.userInfo == null) {
      wx.showModal({
        title: '登录提示',
        content: '发布内容前需要授权登录',
        cancelText: "取消",
        confirmText: "登录",
        success(res) {
          if (res.cancel) { }
          else {
            wx.navigateTo({
              url: '../my/my',
            })
          }
        }
      })
    }
    else {
      wx.navigateTo({
        url: '../find/release/people',
      })
    }
  },
  onPullDownRefresh: function () {
    // 标题栏显示刷新图标，转圈圈
    wx.showNavigationBarLoading()
    console.log("onPullDownRefresh");
    // 请求最新数据
    this.get_goods('all');

    setTimeout(() => {
      // 标题栏隐藏刷新转圈圈图标
      wx.hideNavigationBarLoading()

    }, 2000);

  },

  /**
   * 加载更多
   */

  onReachBottom: function () {

    console.log('onReachBottom')
  },
  getbook: function () {
    this.get_goods('书籍');
  },
  getstationery: function () {
    this.get_goods('文具');
  },
  getelectronics: function () {
    this.get_goods('电子产品');
  },
  getclothes: function () {
    this.get_goods('服饰');
  },
  getdailyStuff: function () {
    this.get_goods('日用品');
  },
  getdocument: function () {
    this.get_goods('证件');
  },
  getwallet: function () {
    this.get_goods('钱包');
  },
  getcard: function () {
    this.get_goods('卡');
  },
  searchinput: function (e) {
    this.setData({
      searchvalue: e.detail.value
    })
  },
  getsearch: function () {
    var that = this;
    console.log(that.data);
    var keyword = that.data.searchvalue;
    console.log(keyword)
    if(keyword==null){
      console.log(123);
      return;
    }
    else{
      that.search(keyword);
    }
  },
  search: function (keyword) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: app.globalData.baseurl + '/api/get/searchPerson/' + keyword,
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: (res) => {
        var data = res.data;
        console.log(data);
        that.setData({
          dataList: res.data
        });
        wx.hideLoading();
      },
      fail: () => {
        wx.hideLoading()
      }
    })
  }
})