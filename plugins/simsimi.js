let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')

let handler  = async (m, { conn, args, usedPrefix, command }) => {
	if (!args || !args[0]) return conn.reply(m.chat, `No es así!\n\n*tenes que poner* : _${usedPrefix + command} Hola_`, m)
	let text = args.join` `
	fetch("https://api.simsimi.net/v2/?text=" + encodeURIComponent(text) + "&lc=es")
  .then(res => res.json())
  .then(batch => {
    conn.updatePresence(m.chat, Presence.composing)
  conn.reply(m.chat, `${batch.success}`, m)
  }) .catch(() => { conn.reply(m.chat, `_Perdón :(_`, m) })
global.DATABASE._data.users[m.sender].limit -= 1
global.DATABASE._data.users[m.sender].lastme = new Date * 1
}
handler.help = ['simi','s','bot'].map(v => v + ' *text*')
handler.tags = ['fun']
handler.command = /^(simi|s|bot)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
handler.limit = false
handler.exp = 750
module.exports = handler

