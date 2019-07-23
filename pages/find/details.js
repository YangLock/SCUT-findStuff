// pages/find/details.js
Page({
  data: {
    imgUrls: ['1.png', '2.png', '3.png'],
    indicatorDots: true,  //小点
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
  }
})