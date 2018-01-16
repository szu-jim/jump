var common = require('../common/common.js')
Page({
  data: {
    overMsg: '跳一跳超级简陋版'
  },
  onLoad: function () {
    this.position = {
      x: 120,
      y: 400,
      vx: 0,
      vy: 0
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

    this.draw()

  },
  draw: function () {
    var p = this.position
    var left = this.left
    var right = this.right

    var context = wx.createCanvasContext('Canvas')
    common.ball(context, p.x, p.y, 20)
    common.block(context, left.x, left.y, left.a, left.b)
    common.block(context, right.x, right.y, right.a, right.b)


    context.draw()
  }
})