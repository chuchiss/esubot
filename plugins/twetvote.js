let handler = async (m, { conn, usedPrefix, command }) => {
    let id = m.all
    conn.twit = conn.twit ? conn.twit : {}
    if (!(id in conn.twit)) return 
    let isVote = conn.twit[id][1].concat(conn.twit[id][2])
    const wasVote = isVote.includes(m.sender)
    if (wasVote) return conn.reply(m.chat, `ya haz votado `, m)
    if (/megusta/i.test(command)) {
        conn.twit[id][1].push(m.sender)
    } else if (/nomegusta/i.test(command)) {
        conn.twit[id][2].push(m.sender)
    }
}
handler.help = ['megusta', 'nomegusta']
handler.tags = ['vote']
handler.command = /^(megusta|nomegusta)$/i
handler.group = true
module.exports = handler