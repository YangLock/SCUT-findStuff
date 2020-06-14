//index.js
//获取应用实例
const app = getApp()
const util=require('../../utils/generateID.js')
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: false,
    searchvalue:null,
    dataList: [],
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
    this.getopenid();
    this.get_goods('all');
  },
  onShow: function () {
    this.get_goods('all');
  },
//从数据库获得新数据
  get_goods:function(key){
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: app.globalData.baseurl +'/api/get/findGood/'+key,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) { //成功后根据当前的页面刷新次数进行黏接或重填
      
      var data=res.data;
      console.log(data);
      that.setData({
        dataList: res.data
      });
      wx.hideLoading();
      },
      fail: function (res) {
        wx.hideLoading();
      }
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  release: function () {
    wx.navigateTo({
      url: '../find/release/things',
    })
  },
  getopenid: function () {
    var that = this;
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
    //登录凭证校验。通过 wx.login() 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程。
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log("res.code:" + res.code);
          wx.request({
            url: app.globalData.baseurl+'/api/get/openid',
            data: {
              code:res.code
            },
            method: 'GET',
            success: function (res) {
              console.log(res)
              var obj = {};
              obj.openid = res.data.openid;
              app.globalData.open_id = obj.openid;
              that.getcheck(app.globalData.open_id, '用户' + util.generateUserName(), '../../images/my.png');
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  getcheck:function(user_id,user_name,user_avatar){
    var that=this;
    wx.request({
      url: app.globalData.baseurl+'/api/get/checkuser',
      data:{
        user_id:user_id,
        user_name:user_name,
        user_avatar: user_avatar
      },
      method:'GET',
      success: function (res) {
        console.log(res.data);
      }
    });
  },
  onPullDownRefresh: function () {
    // 标题栏显示刷新图标，转圈圈
    wx.showNavigationBarLoading()
    console.log("onPullDownRefresh");
    // 请求最新数据
    this.get_goods('all');

    setTimeout(() => {
      // 标题栏隐藏刷新转圈圈图标
      wx.hideNavigationBarLoading()

    }, 2000);

  },

  /**

   * 加载更多

   */

  onReachBottom: function () {

    console.log('onReachBottom')
  },
  getbook:function(){
    this.get_goods('书籍');
  },
  getstationery: function () {
    this.get_goods('文具');
  }, 
  getelectronics: function () {
    this.get_goods('电子产品');
  }, 
  getclothes: function () {
    this.get_goods('服饰');
  },
  getdailyStuff: function () {
    this.get_goods('日用品');
  }, 
  getdocument: function () {
    this.get_goods('证件');
  },
  getwallet: function () {
    this.get_goods('钱包');
  }, 
  getcard: function () {
    this.get_goods('卡');
  },
  searchinput: function (e) {
    this.setData({
      searchvalue: e.detail.value
    })
  },
  getsearch:function(){
    wx.showLoading({
      title: '加载中',
    })
    var that=this;
    console.log(that.data);
    var keyword=that.data.searchvalue;
    console.log(keyword)
    that.search(keyword);
  },
  search:function(keyword){
    var that =this;
    wx.request({
      url: app.globalData.baseurl +'/api/get/searchGood/'+keyword,
      header: {
        'content-type': 'application/json'
      },
      method:'GET',
      success:(res)=>{
        var data = res.data;
        console.log(data);
        that.setData({
          dataList: res.data
        });
        wx.hideLoading()
      },
      fail:()=>{
        wx.hideLoading()
      }
      })
  }
  })
