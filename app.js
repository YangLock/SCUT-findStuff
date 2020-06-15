//app.js
App({
  onLaunch: function () {
    var that=this;
    //登录
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log("res.code:" + res.code);
          wx.request({
            url: that.globalData.baseurl + '/api/get/openid',
            data: {
              code: res.code
            },
            method: 'GET',
            success: function (res) {
              that.globalData.open_id = res.data.openid;
              // that.getcheck(app.globalData.open_id, app.globalData.userInfo.user_name, app.globalData.userInfo.user_avatar);
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
             // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    open_id: null,
    baseurl: 'https://www.scutfind.xyz',
    //baseurl: 'http://localhost:3000',
  }
})