// pages/find/persondetails.js
const app = getApp();
Page({
  data: {
    list: [],
    good_id: '',
    good_title: '',
    place: '',
    detail: '',
    contracter: '',
    tel: '',
    wechat: '',
    qq: '',
    imgUrls: [],
    indicatorDots: true, //小点
    commentValue:""
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
      title: "加载中"
    })
    wx.request({
      url: app.globalData.baseurl + '/api/get/personCom',
      method: "GET",
      data: {
        good_id: that.data.good_id
      },
      header: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        //token: app.globalData.token
      },
      success: res => {
        that.setData({
          commentValue:""
        })
        var data = res.data;
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
      url: app.globalData.baseurl + '/api/get/oneperson/' + id,
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
    if (app.globalData.userInfo == null) {
      wx.showModal({
        title: '登录提示',
        content: '发布留言前需要授权登录',
        cancelText: "取消",
        confirmText: "登录",
        success(res) {
          if (res.cancel) { }
          else {
            wx.navigateTo({
              url: '../../my/my',
            })
          }
        }
      })
    }
    else {
      var form = e.detail.value;
      var that = this;
      var com_id = Number('3' + Math.random().toString().substr(3, 5) + Date.now().toString().substr(7, 6));
      if (form.comment == "") {
        wx.showToast({
          icon: 'none',
          title: '请输入留言'
        })
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
          wx.showToast({
            title: "留言成功"
          })
          that.getsomething();
        },
        fail: () => {
          wx.showToast({
            title: '留言失败，请检查您的网络',
          })
        }
      })
    }
  }
})