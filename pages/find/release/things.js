// pages/find/release/things.js
var gene=require('../../../utils/generateID');
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 图片
     */
    imgs: [],
    list: '',
    upload_picture_list: [],
    show: false,     //控制下拉列表是显示还是隐藏，false为隐藏
    selectData: ['书籍','文具','电子产品','服饰','日用品','证件','钱包/钱','卡'],   //下拉列表要显示的内容
    uploadData: ['书籍', '文具', '电子产品', '服饰', '日用品', '证件', '钱包', '卡'],
    index: 0,      //选择的下拉列表的下标，默认是0
    title:null,
    type:null,
    who:null,
    place:null,
    detail:null,
    inittel:null,
    initwechat:null,
    initqq:null,
    initwho:null,
    tel:null,
    wechat:null,
    qq:null,
  },
  /**
   * 点击下拉按钮
   */
  selectTap(){
    this.setData({
      show: !this.data.show
    });
  },

  /**
   * 点击下拉框中的内容
   */
  optionTap(e){
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
    this.getinitinfo();
  },
  getinitinfo:function(){
    var that=this;
    wx.request({
      url: app.globalData.baseurl +'/getuserinfor/'+app.globalData.open_id,
      method:'GET',
      header:{
        'content-type': 'application/json'
      },
      success:(res)=>{
        var data=res.data;
        console.log(res.data);
        that.setData({
          initwho: data.user_name,
          inittel:data.tel_num,
          initwechat:data.wechat_num,
          initqq:data.qq_num
        })
      }
    })
  },
  //选择图片方法
  uploadpic: function (e) {
    if (this.data.upload_picture_list.length < 8){
    let that = this //获取上下文
    let upload_picture_list = that.data.upload_picture_list
    //选择图片
    wx.chooseImage({
      count: 8-that.data.upload_picture_list.length, // 默认9，这里显示一次选择相册的图片数量 
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) { // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        let tempFiles = res.tempFiles
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
    else{
      wx.showToast({
        title: '上传图片不超过8张',  //标题
        icon: 'none',
        duration: 1000
      })
    }
  },
  //点击上传图片
  async uploadimage(e) {
    let page = this
    let upload_picture_list = page.data.upload_picture_list
    //循环把图片上传到服务器 并显示进度
    var amount=upload_picture_list.length;       
    for (let j in upload_picture_list) {
      if (upload_picture_list[j]['upload_percent'] == 0) {

        //上传图片后端地址
        upload_file_server(app.globalData.baseurl + '/upload', page, upload_picture_list, j,e,amount)
      }
    }
    let imgs = wx.setStorageSync('imgs', upload_picture_list);
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
  async release(e){
    var that = this;
    this.uploadimage(e);
  },
  dealpicarr(arr){
    var arr1=new Array(8);
    var i=0;
    for(i=0;i<arr.length;i++){
      arr1[i]=arr[i];
    }
    for(;i<8;i++){
      arr1[i]={path_server:null};
    }
    return arr1;
  }
})



/**
 * 上传图片方法
 */
async function upload_file_server(url, that, upload_picture_list, j,e,amount) {
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
      console.log(res.data);
      var data = JSON.parse(res.data);
      // //字符串转化为JSON  
      var file = data.file;
      console.log(j);
      upload_picture_list[j]['path_server'] = file
      console.log(upload_picture_list[j]);
      that.setData({
        upload_picture_list: upload_picture_list
      });
      let upload_picture_list1 = that.dealpicarr(that.data.upload_picture_list);
      if(j==amount-1){
        console.log(upload_picture_list1); 
      wx.request({
        url: app.globalData.baseurl + '/api/release/findGood',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          deliver: app.globalData.open_id,
          good_id: gene.generateGoodID(),
          pictures: upload_picture_list1,
          title: e.detail.value.title,
          type: that.data.uploadData[that.data.index],
          who: e.detail.value.who,
          place: e.detail.value.place,
          describe: e.detail.value.detail,
          tel: e.detail.value.TEL,
          wechat: e.detail.value.WECHAT,
          qq: e.detail.value.QQ,
          time: Date.now()
        },
        success: (res) => {
          console.log(res.data);
          wx.showToast({
            title: '发布成功',  //标题
            icon: 'none',
            duration: 1000
          });
          wx.switchTab({
            url: '../../index/index',
          })
        }
      })
      }
      wx.setStorageSync('imgs', upload_picture_list);
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