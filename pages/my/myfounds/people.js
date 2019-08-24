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
    this.myFindPerson();
  },

  //确认认领
  confirm: function(event){
    var that = this;
    console.log(event.currentTarget.id);
    var goodID = event.currentTarget.id;
    wx.request({
      url: app.globalData.baseurl + '/api/claimConfirm/' + goodID,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "PUT",
      success: function(res){
        console.log('successfully confirm the record');
        that.myFindPerson();
      },
      fail: function(res){
        console.log('fail to confirm the record');
      }
    })
  },

  //刷新记录
  refresh: function(event){
    var that = this;
    var goodID = event.currentTarget.id;
    wx.request({
      url: app.globalData.baseurl + '/api/refresh/findPerson/' + goodID,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "PUT",
      success: function(res){
        console.log('successfully refresh the record');
        that.myFindPerson();
      },
      fail: function(res){
        console.log('fail to refresh the record');
      }
    })
  },

  //删除记录
  deleteRecord: function(event){
    var that = this;
    var goodID = event.currentTarget.id;
    wx.request({
      url: app.globalData.baseurl + '/api/delete/findPerson/' + goodID,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "DELETE",
      success: function(res){
        console.log('successfully delete the record');
        that.myFindPerson();
      },
      fail: function(res){
        console.log('fail to delete the record');
      }
    })
  },
  myFindPerson: function(){
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: app.globalData.baseurl + '/getuserfindperson/' + app.globalData.open_id,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) { //成功后根据当前的页面刷新次数进行黏接或重填
        var data = res.data;
        console.log(data);
        this.setData({
          dataList1: data.filter(item => {return item.stateof == true;}),
          dataList2: data.filter(item => {return item.stateof == false;})
        });
        var line = 0;
        if (that.data.dataList1.length > that.data.dataList2.length) {
          line = that.data.dataList1.length;
        }
        else { line = that.data.dataList2.length; }
        that.setData({
          aheight: 369 * line
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
  jumpTo: function(event){
    wx.navigateTo({
      url: '../../reEditPerson/reEditPerson?id=' + event.currentTarget.id,
    })
  }
})