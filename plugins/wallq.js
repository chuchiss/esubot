
const fetch = require('node-fetch')

let handler = async (m, { conn, text }) => {
  if (!text) throw 'y el texto del wallpaper?'
  let res = await fetch(global.API('https://wall.alphacoders.com/api2.0','/get.php', {
    auth: '3e7756c85df54b78f934a284c11abe4e',
    method: 'search',
    term: text
  }))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  let img = json.wallpapers[Math.floor(Math.random() * json.wallpapers.length)]
  await conn.sendFile(m.chat, img.url_image, 'wallpaper', 'wallpaper!', m)
}
handler.help = ['wallpaper <texto>']
handler.tags = ['internet']
handler.command = /^wall(paper)?$/i
handler.limit = true

module.exports = handler