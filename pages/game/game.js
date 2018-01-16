//index.js
//获取应用实例
var common = require('../common/common.js')
const app = getApp()

Page({
  data: {
    overMsg: '游戏结束',
    gameover: false
  },
  onLoad: function () {
    this.position = {
      x: 120,
      y: 400,
      vx: 0,
      vy: 0
    }
    this.begin = {
      x: this.position.x,
      y: this.position.y
    }
    //设定球心的斜率
    this.k = {
      m: 80,
      n: 60
    }
    this.left = {
      x: 120,
      y: 400,
      a: this.k.m,
      b: this.k.n
    }
    this.right = {
      x: 120 + 1.5 * this.k.m,
      y: 400 - 1.5 * this.k.n,
      a: this.k.m,
      b: this.k.n
    }
    this.remain = {
      x: 0,
      y: 0,
      a: 0,
      b: 0
    }
    
    // 触摸开始时间
    touchStartTime: 0
    // 触摸结束时间
    touchEndTime: 0

    this.draw()
       
  },
  //游戏结束
  restart: function(){

  },
  /// 按钮触摸开始触发的事件
  touchStart: function (e) {
    this.touchStartTime = e.timeStamp
  },
  /// 按钮触摸结束触发的事件
  touchEnd: function (e) {
    this.touchEndTime = e.timeStamp
    var duration = this.touchEndTime - this.touchStartTime
    if(!this.data.gameover){
      this.position.vy = duration * 0.05 > 20 ? 20 : duration * 0.05
      this.position.vx = duration * 0.01 > 10 ? 10 : duration * 0.005
      this.interval = setInterval(this.draw, 20)
    }
  },
  draw: function(){
    var p = this.position
    var q = this.begin
    var left = this.left
    var right = this.right
    //console.log(p)
    //console.log(this.position)
     
    var context = wx.createCanvasContext('Canvas')
    common.ball(context, p.x, p.y, 20)
    common.block(context, left.x, left.y, left.a, left.b)
    common.block(context, right.x, right.y, right.a, right.b)
    
    common.block(context, this.remain.x, this.remain.y, this.remain.a, this.remain.b)
    console.log(this.remain.x)

    context.draw()
    
    if ((p.x - q.x) / (right.x - q.x) <= (p.y - q.y) / (right.y-q.y)){
      p.x += p.vx
      p.y -= p.vy
      p.vy -= 1
    }else{
      if (p.x > right.x - right.a / 2 && p.x < right.x + right.a / 2 && !this.data.gameover) {
        clearInterval(this.interval)
        this.nextinterval = setInterval(this.nextdraw, 20)
      } else {
        p.x += p.vx
        p.y -= p.vy
        p.vy -= 1
        this.setData({
          gameover: true
        })
      }
    }
    if (p.y >560 || p.x>410){
      clearInterval(this.interval)
      this.setData({
        gameover: true
      })
    }
  },
  nextdraw: function(){
    var p = this.position
    var left = this.left
    var right = this.right
    var k = this.k
    var context = wx.createCanvasContext('Canvas')
    
    left.x = left.x - k.m/10
    left.y = left.y + k.n/10
    right.x = right.x - k.m/10
    right.y = right.y + k.n/10
    p.x = p.x - k.m/10
    p.y = p.y + k.n/10
    common.ball(context, p.x, p.y, 20)
    common.block(context, left.x, left.y, left.a, left.b)
    common.block(context, right.x, right.y, right.a, right.b)
    if (this.remain.x + this.remain.a> 0) {
      this.remain.x = this.remain.x - k.m/10
      this.remain.y = this.remain.y + k.n/10
      common.block(context, this.remain.x, this.remain.y, this.remain.a, this.remain.b)
    }
    //console.log(left.x)
    context.draw()
    if (right.x<=120){
      clearInterval(this.nextinterval)
      var newblockpos = Math.random()*1.5+1
      var newblocksize = Math.random()*0.5+0.6
      //console.log(newblockpos)
      common.ball(context, p.x, p.y, 20)
      common.block(context, left.x, left.y, left.a, left.b)
      common.block(context, right.x, right.y, right.a, right.b)
      common.block(context, right.x + newblockpos * k.m, right.y - newblockpos * k.n, k.m * newblocksize, k.n * newblocksize)
      
      context.draw()
      if(left.x + left.a > 0){
        this.remain = this.left        
      }
      this.left = this.right
      this.right = {
        x: right.x + newblockpos * k.m,
        y: right.y - newblockpos * k.n,
        a: k.m * newblocksize,
        b: k.n * newblocksize
      }
      this.begin.x = this.position.x
      this.begin.y = this.position.y
    }
  }


})
