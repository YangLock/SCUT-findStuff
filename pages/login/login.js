const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userimg: '../../images/logo.png',
    user_name: ''
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

  onReachBottom: function () {
  },
  go: function () {
    wx.showToast({
      icon:'none',
      title: '请先登录',
    })
  },
  edit: function () {
    wx.showToast({
      icon: 'none',
      title: '请先登录',
    })
  },
  mythings: function () {
    wx.showToast({
      icon: 'none',
      title: '请先登录',
    })
  },
  mypeople: function () {
    wx.showToast({
      icon: 'none',
      title: '请先登录',
    })
  },
  login:function(){
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res.userInfo)
              app.globalData.userInfo=res.userInfo;
              wx.navigateBack({
              })
            }
          })
        }
      }
    })
  }
})