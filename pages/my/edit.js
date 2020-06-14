// pages/my/edit.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    tel: '',
    wechat: '',
    qq: '',
    userimg: "1.png",
    inituserimg:null
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
  nameChange(e){
    this.setData({
      name:e.detail.value
    })
  },
  telChange(e){
    this.setData({
      tel: e.detail.value
    })
  },
  wechatChange(e) {
    this.setData({
      wechat: e.detail.value
    })
  },
  qqChange(e) {
    this.setData({
      qq: e.detail.value
    })
  },
  //提交表单内容
  formSubmit: function(e){
    var that = this;
    wx.showLoading({
      title: '修改中',
    })
    if(that.data.inituserimg==that.data.userimg){
      simpleChange(that);
    }
    else{
      upload_file_server(app.globalData.baseurl + '/upload', that, that.data.userimg);
    }
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
          inituserimg: data.user_avatar,
          name:data.user_name,
          tel: data.tel_num,
          wechat: data.wechat_num,
          qq: data.qq_num
        })
      }
    })
  },

  //选择图片
  chooseWxImageShop: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      count:1,
      success: function (res) {
        let userimg= res.tempFilePaths[0];
        that.setData({
          userimg:userimg
        })
      }
    })
  },

  //上传图片到服务器
})
function simpleChange(that){
  wx.request({
    url: app.globalData.baseurl + '/api/editMyInfo/' + app.globalData.open_id,
    method: 'PUT',
    data: {
      userID: app.globalData.open_id,
      userAva: that.data.userimg,
      userName: that.data.name,
      telNum: that.data.tel,
      weChat: that.data.wechat,
      qqNum: that.data.qq
    },
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      console.log(res.data);
      wx.hideLoading();
      wx.showToast({
        title: '修改成功',  //标题
        icon: 'none',
        duration: 1000
      });
      wx.navigateBack({
      });
    }
  })
}
function upload_file_server(url, that, upload_picture) {
  //上传返回值
  const upload_task = wx.uploadFile({
    // 模拟https
    url: url, //需要用HTTPS，同时在微信公众平台后台添加服务器地址  
    filePath: upload_picture, //上传的文件本地地址
    header: {
      'content-type': 'multipart/form-data'
    },
    name: 'file',
    //附近数据，这里为路径     
    success: function (res) {
      console.log(res.data);
      var data = JSON.parse(res.data);
      // //字符串转化为JSON  
      var file = data.file;
      upload_picture = app.globalData.baseurl+file
      console.log(upload_picture);
      that.setData({
        userimg: upload_picture
      });
      simpleChange(that);
    },
    fail: function () {
      console.log('fail');
    }
  })
  const a = console.log('ok');
  //上传 进度方法
  // upload_task.onProgressUpdate((res) => {
  //   upload_picture_list[j]['upload_percent'] = res.progress
  //   that.setData({
  //     upload_picture_list: upload_picture_list
  //   });
  // });
}