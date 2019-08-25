// pages/find/gooddetails.js
const app = getApp();
Page({
  data: {
    list: [{
      userPhoto: '1.png',
      user_name: 'jack',
      com_detail: 'nothing wrong',
      com_time: '2017-4-3'
    },
    {
      userPhoto: '1.png',
      user_name: 'jack',
      com_detail: 'nothing wrong',
      com_time: '2017-4-3'
    }

    ],
    good_id: '',
    //deliver: '',
    good_title: '',
    place: '',
    detail: '',
    //deliver_time: '',
    contracter: '',
    tel: '',
    wechat: '',
    qq: '',
    imgUrls: ['1.png', '2.png', '3.png'],
    indicatorDots: true, //小点
  },
  onLoad: function (options) {
    var id = options.good_id;
    var that = this;
    this.setData({
      good_id: id,
    });
    that.getgood(id);
    that.getsomething();
  },
  //获取评论
  getsomething: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.baseurl + '/api/get/goodCom',
      method: "GET",
      data: {
        good_id: that.data.good_id
      },
      header: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        //token: app.globalData.token
      },
      success: res => {
        console.log(res)
        var data = res.data;
        console.log(data);
        that.setData({
          list: res.data
        });
        wx.hideLoading();
      }
    })

  },
  getgood(id) {
    wx.showLoading({
      title: "加载中"
    })
    var that = this;
    wx.request({
      url: app.globalData.baseurl + '/api/get/onegood/' + id,
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        var data = res.data;
        console.log(data);
        that.setData({
          good_id: data.good_id,
          //deliver: '',
          good_title: data.good_title,
          place: data.place,
          detail: data.detail,
          //deliver_time: '',
          contracter: data.contacter,
          tel: data.tel,
          wechat: data.wechat,
          qq: data.qq,
          imgUrls: data.imgUrls,
        });
        wx.hideLoading();
      }
    })
  },
  previewImage(e) {
    var self = this;
    wx.chooseImage({
      count: 8,
      success(res) {
        var tempFilePaths = res.tempFilePaths;
        self.setData({
          previewImageArr: tempFilePaths
        });
      }
    })
  },
  changePreview(e) {
    var self = this;
    console.log(self.data.previewImageArr);
    console.log(e.currentTarget.dataset.src);
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: self.data.previewImageArr
    })
  },
  submitForm(e) {
    var form = e.detail.value;
    var that = this;
    var com_id = Number('3' + Math.random().toString().substr(3, 5) + Date.now().toString().substr(7, 6));
    console.log(app.globalData.open_id);
    if (form.comment == "") {
      util.showLog('请输入评论');
      return;
    }

    // 提交评论
    wx.request({
      url: app.globalData.baseurl + '/api/release/goodCom',
      method: "POST",
      data: {
        com_id: com_id,
        com_detail: form.comment,
        com_deliver: app.globalData.open_id,
        good_id: that.data.good_id
      },
      header: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        //token: app.globalData.token
      },
      success: res => {
        console.log(res.data)
        if (res.data.success) {
          wx.showToast({
            title: "评论成功"
          })
        } else {
          wx.showToast({
            title: '评论失败，请检查您的网络',
          })
        }
        that.getsomething();
      }
    })
  }
})