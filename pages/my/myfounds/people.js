// pages/my/myfounds/people.js
var app = getApp()
Page({
  data: {
    currentTab: 0,
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
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    //动态计算高度
    this.find_person();
      var line = this.data.dataList.length;
      this.setData({
        aheight:  369 * line
      });
  },

  find_person:function(){
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: 'https://www.4singledogs.cn/get/find_persons',
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
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})