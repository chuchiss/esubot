let handler = async (m, {conn}) => {
  if (new Date - global.DATABASE._data.users[m.sender].lastmp > 5400) {
m.reply(`
    📍🄻🄾🅂 🄲🄾🄼🄰🄽🄳🄾🅂 🅂🄾🄽 
_.menu_
_.perfil_
_.ranking_
_.likes_
_.comandos_
_.Buy_ (comprar exp)
_.buyall_ (comprar toda la exp)
_.reclamar_
_.pagar_ @mension <cantidad de exp>
_.robar_ @mension <cantidad de exp>
_.robos_
_.ping_
_.politica_
_.creditos_
*___________________________________*
      📌🄰🄲🅃🄸🅅🄸🄳🄰🄳🄴🅂  
_.attp_ Texto
_.ttp_ Texto 
_.ttpd_ Texto
_.style_ texto
_.sticker_ (seleccionando imagen)
_.imagen_ texto
_.frases_
_.memes_
_.play_ (nombre de la musica)
_.play2_ (nombre del video)
_.anime_
_.google_ (busqueda de wikipedia)
_.traducir_ idioma ( marca el texto ) 
_.tts_ texto
_.s_ 
_.bot_ pregunta
*___________________________________*
        ➿🄹🅄🄴🄶🄾🅂
_.mate_ medium (ganar exp)
_.adiv_ start (ganar exp)
_.tateti_
_proximo a salir preguntados..._
*___________________________________*
  ȼøᵽɏɍɨǥħŧ©ɨnsȺnɇƀøŧ.øfɨȼɨȺł
                                        
`.trim()) 
global.DATABASE._data.users[m.sender].lastmp = new Date * 1
  } else return
}
handler.help = ['comandos']
handler.tags = ['info']
handler.command = /^(cmd|comandos|commandos|com|hola|list|comando|ayuda)$/i

module.exports = handler