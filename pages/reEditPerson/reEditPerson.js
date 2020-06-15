// pages/find/release/things.js
const app = getApp();
var map = new Map();
map.set("书籍", 0)
map.set("文具", 1)
map.set("电子产品", 2)
map.set("服饰", 3)
map.set("日用品", 4)
map.set("证件", 5)
map.set("钱包/钱", 6)
map.set("卡", 7)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 图片
     */
    list: '',
    upload_picture_list: [],
    show: false,     //控制下拉列表是显示还是隐藏，false为隐藏
    selectData: ['书籍', '文具', '电子产品', '服饰', '日用品', '证件', '钱包/钱', '卡'],   //下拉列表要显示的内容
    uploadData: ['书籍', '文具', '电子产品', '服饰', '日用品', '证件', '钱包', '卡'],
    index: 0,      //选择的下拉列表的下标，默认是0
    title: null,
    type: null,
    who: null,
    place: null,
    detail: null,
    tel: null,
    wechat: null,
    qq: null,
    picAmount: 0,
    goodId:null,
  },
  /**
   * 点击下拉按钮
   */
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  titleChange(e) {
    this.setData({
      title: e.detail.value
    })
  },
  whoChange(e) {
    this.setData({
      who: e.detail.value
    })
  },
  placeChange(e) {
    this.setData({
      place: e.detail.value
    })
  },
  telChange(e) {
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
  detailChange(e) {
    this.setData({
      detail: e.detail.value
    })
  },
  /**
   * 点击下拉框中的内容
   */
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var good_id = options.good_id;
    this.setData({
      goodID: good_id
    })
    this.getinitinfo();
  },
  getinitinfo: function () {
    var that = this;
    wx.request({
      url: app.globalData.baseurl + '/api/get/oneperson/' + that.data.goodID,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        var data = res.data;
        console.log(res.data);
        var picture_list=new Array(data.imgUrls.length);
        for (let i in data.imgUrls){
          var obj={};
          obj.path = data.imgUrls[i];
          obj.upload_percent=0;
          obj.path_server = data.imgUrls[i];
          picture_list[i]=obj;
        }
        that.setData({
          index:map.get(data.good_type),
          upload_picture_list:picture_list,
          title: data.good_title,
          place: data.place,
          detail: data.detail,
          who: data.contacter,
          tel: data.tel,
          wechat: data.wechat,
          qq: data.qq,
          goodId:data.good_id
        })
        console.log(that.data.upload_picture_list);
      }
    })
  },
  //选择图片方法
  uploadpic: function (e) {
    if (this.data.upload_picture_list.length < 8) {
      let that = this //获取上下文
      let upload_picture_list = that.data.upload_picture_list
      //选择图片
      wx.chooseImage({
        count: 8 - that.data.upload_picture_list.length, // 默认9，这里显示一次选择相册的图片数量 
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) { // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
          let tempFiles = res.tempFiles
          console.log(tempFiles)
          //把选择的图片 添加到集合里
          for (let i in tempFiles) {
            tempFiles[i]['upload_percent'] = 0
            tempFiles[i].path_server = '';
            upload_picture_list.push(tempFiles[i])
          }
          //显示
          that.setData({
            upload_picture_list: upload_picture_list,
          });
        }
      })
    }
    else {
      wx.showToast({
        title: '上传图片不超过8张',  //标题
        icon: 'none',
        duration: 1000
      })
    }
  },
  //点击上传图片
  uploadimage(e) {
    let page = this
    let upload_picture_list = page.data.upload_picture_list
    //循环把图片上传到服务器 并显示进度
    var amount = upload_picture_list.length;
    page.setData({
      picAmount: amount
    })
    for (let j in upload_picture_list) {
      if(upload_picture_list[j].path_server!=''){
        final_upload(page);
      }
      else{
                //上传图片后端地址
        upload_file_server(app.globalData.baseurl + '/upload', page, upload_picture_list, j, e, amount)
      }
    }
    //let imgs = wx.setStorageSync('imgs', upload_picture_list);
  },
  // 点击删除图片
  deleteImg(e) {
    let upload_picture_list = this.data.upload_picture_list;
    let index = e.currentTarget.dataset.index;
    upload_picture_list.splice(index, 1);
    this.setData({
      upload_picture_list: upload_picture_list
    });
  },
  // 预览图片
  previewImg(e) {
    //获取当前图片的下标
    let index = e.currentTarget.dataset.index;
    //所有图片
    let imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  release(e) {
    wx.showLoading({
      title: '发布中',
    })
    this.uploadimage(e);
  },
  //把传送的数组固定为长度为8
  dealpicarr(arr) {
    var arr1 = new Array(8);
    var i = 0;
    for (i = 0; i < arr.length; i++) {
      arr1[i] = arr[i];
    }
    for (; i < 8; i++) {
      arr1[i] = { path_server: null };
    }
    return arr1;
  }
})



function final_upload(that){
  that.setData({
    picAmount: that.data.picAmount - 1
  })
  if (that.data.picAmount == 0) {
    let upload_picture_list1 = that.dealpicarr(that.data.upload_picture_list);
    wx.request({
      url: app.globalData.baseurl + '/api/reEdit/findPerson/' + that.data.goodId,
      method: 'PUT',
      header: {
        'content-type': 'application/json'
      },
      data: {
        deliver: app.globalData.open_id,
        pictures: upload_picture_list1,
        title: that.data.title,
        type: that.data.uploadData[that.data.index],
        who: that.data.who,
        place: that.data.place,
        describe: that.data.detail,
        tel: that.data.tel,
        wechat: that.data.wechat,
        qq: that.data.qq,
      },
      success: (res) => {
        console.log(res.data);
        wx.hideLoading();
        wx.showToast({
          title: '发布成功',  //标题
          icon: 'none',
          duration: 1000
        });
        wx.navigateBack({
          // url: '../../index/index',
        })
      }
    })
  }
}
/**
 * 上传图片方法
 */
function upload_file_server(url, that, upload_picture_list, j, e, amount) {
  //上传返回值
  const upload_task = wx.uploadFile({
    // 模拟https
    url: url, //需要用HTTPS，同时在微信公众平台后台添加服务器地址  
    filePath: upload_picture_list[j]['path'], //上传的文件本地地址
    header: {
      'content-type': 'multipart/form-data'
    },
    name: 'file',

    formData: {
      'num': j
    },
    //附近数据，这里为路径     
    success: function (res) {
      var data = JSON.parse(res.data);
      // //字符串转化为JSON  
      var file = data.file;
      upload_picture_list[j]['path_server'] = app.globalData.baseurl + file
      that.setData({
        upload_picture_list: upload_picture_list
      });
      final_upload(that);
      //wx.setStorageSync('imgs', upload_picture_list);
    },
    fail: function () {
      console.log('fail');
    }
  })
  //上传 进度方法
  // upload_task.onProgressUpdate((res) => {
  //   upload_picture_list[j]['upload_percent'] = res.progress
  //   that.setData({
  //     upload_picture_list: upload_picture_list
  //   });
  // });
}