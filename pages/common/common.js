function block(context, x, y, a, b) {
  context.moveTo(x - a, y)
  context.lineTo(x, y - b)
  context.lineTo(x + a, y)
  context.lineTo(x, y + b)
  context.lineTo(x - a, y)
  context.stroke()
}

function ball(context, x, y, r) {
  var g1 = context.createCircularGradient(x, y, r)
  g1.addColorStop(0.1, 'red')
  g1.addColorStop(1, 'rgb(50,0,0)')
  context.setFillStyle(g1)
  context.arc(x, y, r, 0, 2 * Math.PI, true)
  context.fill()
  context.stroke()
}

module.exports.block = block
module.exports.ball = ball