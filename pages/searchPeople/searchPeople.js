const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [
      {
        goods_id: 1,
        goods_title: '物品标题1',
        goods_img: '/images/wallet.png',
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.get_persons();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  //从数据库获得新数据
  get_persons: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: 'https://www.4singledogs.cn/get/get_presons',
      data: {
        userID: app.globalData.open_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) { //成功后根据当前的页面刷新次数进行黏接或重填
        console.log(res.data);
        let array2 = res.data;
        let array1 = that.data.dataList;
        array1 = array1.concat(array2);
        that.setData({
          dataList: array1
        });

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
  release: function () {
    wx.navigateTo({
      url: '../find/release/people',
    })
  }
})