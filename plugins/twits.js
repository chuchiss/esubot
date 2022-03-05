let handler = async (m, { conn, usedPrefix }) => {
    let id = m.all
    conn.twit = conn.twit ? conn.twit : {}
    

    let [reason, si, no] = conn.twit[id]
    let mentionedJid = [...si, ...no]
    m.reply(`
      *「 twits 」* \n\n
*TWIT* ${reason} \n
*Megusta*
_Total: ${si.length}_
${si.map(u => '@' + u.split('@')[0]).join('\n')}
\n
*NOmegusta*
_Total: ${no.length}_
${no.map(u => '@' + u.split('@')[0]).join('\n')}
`.trim(), false, { contextInfo: { mentionedJid } })
}
handler.help = ['twitear']
handler.tags = ['vote']
handler.command = /^(twits|(list|ver)twits)$/i
handler.group = false
module.exports = handler
