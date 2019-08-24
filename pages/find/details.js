// pages/find/details.js
const app=getApp();
Page({
  data: {
    what:0,
    good_id:'',
    deliver: '',
    good_title: '',   
    find_place: '',
    detail: '',
    deliver_time: '',
    imgUrls: ['1.png', '2.png', '3.png'],
    indicatorDots: true,  //小点
  },
  onLoad: async function (options) {
    var id = options.good_id;
    var what=options.what;
    var that=this;
    this.setData({
      good_id:id,
      what:what
    });
    await that.getgood(id);
  },
   getgood(id){
    var that=this;
     wx.request({
    url: app.globalData.baseurl +'/api/get/onegood/'+id,
    header: {
    'content-type': 'application/json'
    },
       method:'GET',
      success: function(res){
         var data = res.data;
         console.log(data);
        that.setData({
            deliver: data[0].deliver,
            good_title: data[0].good_title,
            lost_place: data[0].lost_place,
            detail: data[0].detail,
        //    deliver_time: '',
        //    imgUrls: ['1.png', '2.png', '3.png'],
          });
      }
    })
  },
  previewImage(e) {
    var self = this;
    wx.chooseImage({
      count: 8,
      success(res) {
        var tempFilePaths = res.tempFilePaths;
        self.setData({ previewImageArr: tempFilePaths });
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
})