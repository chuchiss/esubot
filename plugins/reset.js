let { MessageType } = require('@adiwajshing/baileys')
let pajak = 0.04
let handler = async (m, { conn }) => {

  let users = global.DATABASE.data.users

 if (users[m.sender].limit > 200) {
users[m.sender].limit -= 200
users[m.sender].resets += 1
  m.reply (` Reseteado con éxito`)
} else return m.reply(`Tienes que tener más de 200 limit para hacer reset`)
} 
handler.help = ['reset <resetea tu status>']
handler.tags = ['xp']
handler.command = /^reset$/i
handler.rowner = false

module.exports = handler



