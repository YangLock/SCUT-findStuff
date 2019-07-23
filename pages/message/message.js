const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageList: [
      {
        user_img: "/images/avatar.png",
        user_name: "Alice",
        content: "我找到了你的书"
      },{
        user_img: "/images/avatar.png",
        user_name: "Smith",
        content: "我找的了你的笔"
      },{
        user_img: "/images/avatar.png",
        user_name: "Stan",
        content: "我找到了你的帽子"
      },{
        user_img: "/images/avatar.png",
        user_name:"Sean",
        content: "我找到了你的篮球"
      },{
        user_img: "/images/avatar.png",
        user_name: "Jack",
        content: "我在C10找到了你的水杯"
      },{
        user_img: "/images/avatar.png",
        user_name: "Miachel",
        content: "我找到了你的女朋友"
      }
    ]
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})