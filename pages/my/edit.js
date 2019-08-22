// pages/my/edit.js

const app = getApp();
const generate = require('/utils/generateID.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userimg: "1.png"
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

  //提交表单内容
  formSubmit: function(e){
    wx.request({
      url: app.globalData.baseurl + '/api/editMyInfo/' + generate.generateGoodID(),
      method: 'PUT',
      data:{
        userName: e.detail.value.userName,
        telNum: e.detail.value.telnum,
        weChat: e.detail.value.wechat,
        qqNum: e.detail.value.qqnum
      },
      header:{
        'content-type': 'application/json'
      },
      success(res){
        console.log(res.data);
      }
    })
  },
  //点击上传图片
  upShopLogo: function () 
  {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#515151",
      success: function (res) 
      {
        if (!res.cancel) {
          if (res.tapIndex == 0) 
          {
            that.chooseWxImageShop('album');//从相册中选择
          } 
          else if (res.tapIndex == 1)
          {
            that.chooseWxImageShop('camera');//手机拍照
          }
        }
      }
    })
  },

  //选择图片
  chooseWxImageShop: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        that.data.userimg = res.tempFilePaths[0]
        that.upload_file(app.globalData.baseurl + '/upload', res.tempFilePaths[0])
        let userimg = res.tempFilePaths[0];
        that.setData({
          userimg: userimg
        })
      }
    })
  },

  //上传图片到服务器
  upload_file: function (url, filePath) {
    var that = this;
    wx.uploadFile({
      url: url, //后台处理接口
      filePath: filePath,
      name: 'images',
      header: {
        'content-type': 'multipart/form-data'
      }, // 设置请求的 header
      success: function (res) {
        var data = JSON.parse(res.data);
        that.setData({
          userimg: data.path,
        });
        that.showMessage('上传成功');
      },
      fail: function (res) {
      }
    })
  },
})