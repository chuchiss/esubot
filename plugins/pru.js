

let handler = async (m, {conn, args}) => {
  if (new Date - global.DATABASE._data.users[m.sender].lastme > 4400) {
global.yeca = [ 'hola','numero','castilll'
]
global.logi = [ 'funda','cepillo','coron'
]
let Numero = Math.ceil(2 * Math.random())
if (!args || !args[0]) return conn.reply(m.chat, `No es así!\n\n*tenes que po`, m)
let text = args.join` `


m.reply(`
${global.yeca[Numero]}   
Respuesta : ${turro}
${Numero}    

`.trim()) 
global.DATABASE._data.users[m.sender].lastme = new Date * 1
  } else return
}
handler.help = ['']
handler.tags = ['']
handler.command = /^pru$/i

module.exports = handler
