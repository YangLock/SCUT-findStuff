const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userimg:'',
    user_name:'',
    logined:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(app.globalData.userInfo!=null){
      this.setData({
        logined:true
      })
    }
    if(!this.data.logined){
      this.need_login();
    }
    else{
      this.getinitinfo();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // onPullDownRefresh: function () {
  //   // 标题栏显示刷新图标，转圈圈
  //   wx.showNavigationBarLoading()
  //   console.log("onPullDownRefresh");
  //   // 请求最新数据
  //   this.getinitinfo();

  //   setTimeout(() => {
  //     // 标题栏隐藏刷新转圈圈图标
  //     wx.hideNavigationBarLoading()

  //   }, 100);

  // },

  /**

   * 加载更多

   */
  need_login:function(){
    this.setData({
      userimg:'../../images/logo.png',
      user_name:'请登录'
    })
  },

  getinitinfo: function () {
    var that = this;
    wx.request({
      url: app.globalData.baseurl + '/getuserinfor/' + app.globalData.open_id,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        var data = res.data;
        console.log(res.data);
        that.setData({
          userimg: data.user_avatar,
          user_name: data.user_name
        })
      }
    })
  },
  go: function () {
    if (!this.data.logined) {
      wx.showToast({
        icon: 'none',
        title: '请先登录',
      })
    }
    else {
      wx.navigateTo({
        url: '../message/message',
      })
    }
  },
  edit: function(){
    if (!this.data.logined) {
      wx.showToast({
        icon: 'none',
        title: '请先登录',
      })
    }
    else {
      wx.navigateTo({
        url: 'edit',
      })
    }
  },
  mythings: function () {
    if (!this.data.logined) {
      wx.showToast({
        icon: 'none',
        title: '请先登录',
      })
    }
    else {
      wx.navigateTo({
        url: 'myfounds/things',
      })
    }
  },
  mypeople: function () {
    if (!this.data.logined){
      wx.showToast({
        icon: 'none',
        title: '请先登录',
      })
    }
    else{
      wx.navigateTo({
        url: 'myfounds/people',
      })
    }
  },
  login: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res.userInfo)
              app.globalData.userInfo = res.userInfo;
              this.getcheck(app.globalData.open_id, app.globalData.userInfo.user_name, app.globalData.userInfo.user_avatar);
              let pages = getCurrentPages();
              if(pages.length>1){
                wx.navigateBack({
                })
              }
              else{
                this.onShow();
              }
            }
          })
        }
      }
    })
  },
  getcheck: function (user_id, user_name, user_avatar) {
    var that = this;
    wx.request({
      url: app.globalData.baseurl + '/api/get/checkuser',
      data: {
        user_id: user_id,
        user_name: user_name,
        user_avatar: user_avatar
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data);
      }
    });
  },
})