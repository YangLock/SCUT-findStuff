/*
 *   批量上传函数
 *   @params {*} params 上传入参对象
 *   @params {Function} callbackFn 循环回调函数
 *   @params {Function} successFn 成功回调函数
 */

const batchUpload = (params, callBack, successFn) => {
  if (!params.uploadUrl) {
    console.log('请传入上传地址')
    return
  }
  if (!(params.imgPaths instanceof Array)) {
    console.log('请传入array类型')
    return
  } // 校验传入是否为数组
  let maxLength = params.imgPaths.length // 传入数组长度
  let i = params.subscript ? params.subscript : 0 // 当前上传图片下标
  let successNum = params.successNum ? params.successNum : 0 // 上传成功数
  let failNum = params.failNum ? params.failNum : 0 // 上传失败数
  let resultData = params.resultData ? params.resultData : [] //  上传返回的imgUrl
  let endData = {} // 成功回调暴露出去的结果
  wx.uploadFile({
    url: params.uploadUrl,
    filePath: params.imgPaths[i],
    name: 'test_batchUpload',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    formData: {
      // 其它参数
    },
    success(res) { // 返回code为指定结果表示上传成功反之上传失败
      if (res.statusCode == 200) {
        let data = JSON.parse(res.data)
        successNum++
        resultData.push(data.url)
      } else {
        failNum++
      }
    },
    fail(res) {
      failNum++
    },
    complete() {
      i++
      if (i == maxLength) { // 上传完毕调用成功回调暴露指定数据出去
        endData = {
          imgPaths: resultData,
          successNum: successNum,
          failNum: failNum,
        }
        successFn(endData)
      } else { // 执行下一张上传
        params.subscript = i
        params.successNum = successNum
        params.failNum = failNum
        params.resultData = resultData
        // console.log(_that,'_that')
        callBack(params, callBack, successFn)
      }
    }
  })
}
export {
  batchUpload,
}