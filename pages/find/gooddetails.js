// pages/find/details.js
const app = getApp();
Page({
  data: {
    list: [
      {
        userPhoto: '1.png',
        userName: 'jack',
        comment: 'nothing wrong',
        insertTime: '2017-4-3'
      },
      {
        userPhoto: '1.png',
        userName: 'jack',
        comment: 'nothing wrong',
        insertTime: '2017-4-3'
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
    //getsomething();
  },
  getsomething: function () {
    var that = this;
    wx.showToast({
      title: "加载中"
    })
    wx.request({
      url: "",
      method: "GET",
      data: {
        good_id: that.data.good_id
      },
      header: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      success: res => {
        console.log(res);
        that.data.list = res.data;
        that.setData({
          list: that.data.list
        })
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
    console.log(app.globalData.open_id);
    if (form.comment == "") {
      util.showLog('请输入评论');
      return;
    }

    // 提交评论
    wx.request({
      url: app.globalData.baseurl + '/api/get/findGood/',
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
        console.log(res)
        if (res.data.success) {
          wx.showToast({
            title: "评论成功"
          })
        } else {
          wx.showToast({
            title: '评论失败，请检查您的网络',
          })
        }
      }
    })
  }
})