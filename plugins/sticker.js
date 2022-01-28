const { MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')
let handler  = async (m, { conn, args }) => {
if (new Date - global.DATABASE._data.users[m.sender].lastme > 4200) {
  let stiker = false
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image|video/.test(mime)) {
      let img = await q.download()
      if (!img) return conn.reply(m.chat, `seleccione foto/video`, m)
      stiker = await sticker(img, false, global.packname, global.author)
    } else if (args[0]) stiker = await sticker(false, args[0], global.packname, global.author)
  } finally {
    if (stiker) conn.sendMessage(m.chat, stiker, MessageType.sticker, {
      quoted: m
    })
    else throw 'Conversion failed'
  }
global.DATABASE._data.users[m.sender].lastme = new Date * 1
  } else return
}
handler.help = ['stiker (caption|reply media)', 'stiker <url>', 'stikergif (caption|reply media)', 'stikergif <url>']
handler.tags = ['sticker']
handler.command = /^s(tic?ker)?(gif)?(wm)?$/i
handler.limit = true
handler.group = true
module.exports = handler