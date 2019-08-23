// pages/my/myfounds/people.js
var app = getApp()
Page({
  data: {
    currentTab: 0,
    dataList1: '',
    dataList2: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    //动态计算高度
    this.find_goods();
    var line = this.data.dataList.length;
    this.setData({
      aheight: 369 * line
    });
  },

  //确认认领
  confirm: function () {
    var that = this;
    wx.request({
      url: app.globalData.baseurl + '/api/foundConfirm/' + goodID,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "PUT",
      success: function (res) {

      },
      fail: function (res) {

      }
    })
  },

  //刷新记录
  refresh: function () {
    var that = this;
    wx.request({
      url: app.globalData.baseurl + '/api/refresh/findGood/' + goodID,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "PUT",
      success: function (res) {

      },
      fail: function (res) {

      }
    })
  },

  //删除记录
  deleteRecord: function () {
    wx.request({
      url: app.globalData.baseurl + '/api/delete/findGood/' + goodID,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "PUT",
      success: function (res) {

      },
      fail: function (res) {

      }
    })
  },

  myFindGood: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: app.globalData.baseurl + '/getuserfindgoods/' + app.globalData.open_id,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) { //成功后根据当前的页面刷新次数进行黏接或重填
        var data = res.data;
        console.log(data);
        this.setData({
          dataList1: data.filter(item => { return item.stateof === 'false'; }),
          dataList2: data.filter(item => { return item.stateof === 'true'; })
        });
        wx.hideLoading();
      },
      fail: function (res) {
        wx.hideLoading();
      }
    })
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  jumpTo: function(){
    wx.navigateTo({
      url: '/pages/reedit/reedit',
    })
  }
})