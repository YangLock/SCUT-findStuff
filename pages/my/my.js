const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userimg:'',
    user_name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getinitinfo();
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
          username: data.user_name
        })
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
  go: function () {
    wx.navigateTo({
      url: '../message/message',
    })
  },
  edit: function(){
    wx.navigateTo({
      url: 'edit',
    })
  },
  mythings: function () {
    wx.navigateTo({
      url: 'myfounds/things',
    })
  },
  mypeople: function () {
    wx.navigateTo({
      url: 'myfounds/people',
    })
  }
})