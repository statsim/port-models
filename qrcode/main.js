const { qrcode } = require('pure-svg-code')

module.exports = function QRCode (params) {
  return qrcode({
    content: params.content || 'http://github.com/',
    padding: params.padding || 5,
    width: params.size || 256,
    height: params.size || 256,
    color: params.color || '#000000',
    background: params.background || '#ffffff',
    ecl: params.ecl || 'M'
  })
}
