const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
let readmore = readMore

let handler  = async (m, { conn }) => {
if (new Date - global.DATABASE._data.users[m.sender].lastme > 5400) {
let { name, limit, exp, lastclaim, preg, registered, warning, robos, like, banned, regTime, age, level } = global.DATABASE.data.users[m.sender]
    let id = m.all
    conn.twit = conn.twit ? conn.twit : {}
    let [reason, si, no] = conn.twit[id]
conn.reply(m.chat, `╭╭─「⚫🄿🅁🄸🄽🄲🄸🄿🄰🄻」
│ Tienes *${limit} Limit* *${exp} XP* 
${reason}
│.menu
│.perfil
│.ranking
│.top2
│.comandos
│.buy (comprar exp)
│.buyall (comprar toda la exp)
│.reclamar
│.pagar @mension <cantidad de │exp>
│.robar @mension <cantidad de │exp>
│.link
│.ping
│.politica
│.creditos
╰────
${readmore}
╭─「🔹🄰🄲🅃🄸🅅🄸🄳🄰🄳🄴🅂  
│.attp Texto
│.ttp Texto 
│.style texto
│.sticker (seleccionando imagen)
│.imagen texto
│.frases
│.memes
│.play (nombre de la musica)
│.play2 (nombre del video)
│.random (canción random)
│.stickerly
│.estados
│.anime
│.google (busqueda de wikipedia)
│.traducir idioma ( marca el texto ) 
│.tts texto
│.s
│.simi pregunta
│.twittear (quue esta pasando?)
│.twit (ver twits)
╰────
${readmore}
╭─「➿🄹🅄🄴🄶🄾🅂
│.mate medium (ganar exp)
│.adiv start (ganar exp)
│.tateti
│.tutti
│.luck
│.pozo
│.palabra
│.preguntados
╰────
`, m)
//if (!(id in conn.vote))

global.DATABASE._data.users[m.sender].lastme = new Date * 1
}else return
}
handler.help = ['']
handler.tags = ['']
handler.command = /^prueba2$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

