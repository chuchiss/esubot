global.owner = ['5491127640079'] // Put your number here
global.mods = ['5491127640079'] // Want some help?
global.prems = ['5492246455555','5491158339928','5491158339928','5492664878044','5491133702539','5493875334179','5493875693600','5491133985311','5493874035123','5491167236344','5492615355264','5492241518919','5492901402913','5493815046812','5491124647929','5493467581651','5493400659349','5493516595224','5493513397283','5493624000604','5493513397283','5493513397283','5491125969434','5493544443433','5493518079277','5491155719007','5493884649210','5493878344906','5493434566456','5492954690494','5491164468109','541123393579','5492954690494','5491132426559','34688867726','5491173611359','5491170895479','50371562879','5493412101895','5491123879197','5491124047606','5491151783284','5492342465998','5492314401811','51977783315','5491164232573','5493814030220','5493815905346','5493544542402','5491165749003','5492216103838','549383484151','5491160491192','5491122893429','5491133573834','5491165749003','5492216103838','5493834584151','5493782511210','5491161685666','5491127640079','5493412651417','5491160421156','5492645068890','5491125200816','642776797777','17817501861','5492964625346','5491133012139','5491136910923','5491125958955','33677755490','13019735945','34655357416','641777500052','5492644861964','5492235946039','5491155709938','5491133374641','5492314577661','33677755490','13019735945','34655357416','5492235946039','5492644861964','641777500052','595976653303','5491150271801','51912790602','5491168550035','5491137593495','5492665020777','5491168550035','5491137593495','5426650271801','5491137593495','5491162636019','36302225322','5493416995649'] // Premium user has unlimited limit
global.APIs = { // API Prefix
  // name: 'https://website'
  nrtm: 'https://nurutomo.herokuapp.com',
  xteam: 'https://api.xteam.xyz'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.xteam.xyz': 'd90a9e986e18778b'
}

// Sticker WM
global.packname = ' Insane BOT '
global.author = 'segui a @insanebot.oficial '

global.multiplier = 69 // The higher, The harder levelup

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})
