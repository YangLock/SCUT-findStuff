//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: false,
    searchvalue: null,
    dataList: [
      {
        goods_id: 1,
        goods_title: '物品标题1',
        goods_img: 'http://localhost:3001/1566226210749.png',
        person_name: '谢振轩',
        goods_place: 'A1-308',
        goods_time: '上午3、4节'
      }, {
        goods_id: 1,
        goods_title: '物品标题2',
        goods_img: '/images/wallet.png',
        person_name: '吴斌峰',
        goods_place: 'A1-308',
        goods_time: '上午3、4节'
      }, {
        goods_id: 1,
        goods_title: '物品标题3',
        goods_img: '/images/wallet.png',
        person_name: '杨宗霖',
        goods_place: 'A1-308',
        goods_time: '上午3、4节'
      }, {
        goods_id: 1,
        goods_title: '物品标题4',
        goods_img: '/images/wallet.png',
        person_name: '熊景涛',
        goods_place: 'A1-308',
        goods_time: '上午3、4节'
      }, {
        goods_id: 1,
        goods_title: '物品标题5',
        goods_img: '/images/wallet.png',
        person_name: '方思政',
        goods_place: 'A1-308',
        goods_time: '上午3、4节'
      }
    ],
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
    this.get_goods('all');
  },
  //从数据库获得新数据
  get_goods: function (key) {
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
    wx.navigateTo({
      url: '../find/release/people',
    })
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
    that.search(keyword);
  },
  search: function (keyword) {
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
      }
    })
  }
})