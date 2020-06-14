// 这是一个包含生成三种唯一ID的函数的JS文件
//  分别为寻物的ID，寻物主的ID，留言的ID
//   由于它们都是12位整数的数据类型
//   为了区分以便后面其他功能的开发
//   以1开头的就是寻物的ID
//  以2开头的就是寻物主的ID
//  以3开头的就是留言的ID

function generateGoodID() {
  return Number('1' + Math.random().toString().substr(3, 5) + Date.now().toString().substr(7, 6));
}

function generatePersonID() {
  return Number('2' + Math.random().toString().substr(3, 5) + Date.now().toString().substr(7, 6));
}

function generateComID() {
  return Number('3' + Math.random().toString().substr(3, 5) + Date.now().toString().substr(7, 6));
}

function generateUserName() {
  return Number('4' + Math.random().toString().substr(3, 3) + Date.now().toString().substr(7, 4));
}
module.exports = {
  generateGoodID: generateGoodID,
  generatePersonID: generatePersonID,
  generateComID: generateComID,
  generateUserName: generateUserName
}