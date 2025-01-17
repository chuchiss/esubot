let util = require('util')
let simple = require('./lib/simple')
let { MessageType } = require('@adiwajshing/baileys')

const isNumber = x => typeof x === 'number' && !isNaN(x)
module.exports = {
  async handler(chatUpdate) {
    // console.log(chatUpdate)
    if (!chatUpdate.hasNewMessage) return
    if (!chatUpdate.messages && !chatUpdate.count) return
    let m = chatUpdate.messages.all()[0]
    try {
      simple.smsg(this, m)
      m.exp = 0
      m.limit = false
      try {
        let user
        if (user = global.DATABASE._data.users[m.sender]) {
          if (!isNumber(user.exp)) user.exp = 0
          if (!isNumber(user.limit)) user.limit = 10
          if (!isNumber(user.lastclaim)) user.lastclaim = 0
          if (!isNumber(user.lastrob)) user.lastrob = 0
          if (!isNumber(user.yugi)) user.yugi = 0
          if (!isNumber(user.lastmp)) user.lastmp = 0
          if (!isNumber(user.lastme)) user.lastme = 0
          if (!isNumber(user.robos)) user.robos = 0
          if (!isNumber(user.preg)) user.preg = 0
          if (!isNumber(user.pregu)) user.pregu = 0
          if (!isNumber(user.resets)) user.resets = 0
          if (!isNumber(user.preisi)) user.preisi = 0
          if (!isNumber(user.suit)) user.suit = 0
          if (!isNumber(user.point)) user.point = 0
          if (!isNumber(user.mismo)) user.mismo = 0
          if (!isNumber(user.warning)) user.warning = 0
          if (!'registered' in user) user.registered = false
          if (!user.registered) {
            if (!'name' in user) user.name = this.getName(m.sender)
            if (!isNumber(user.age)) user.age = -1
            if (!isNumber(user.regTime)) user.regTime = -1
          }
          if (!isNumber(user.afk)) user.afk = -1
          if (!'afkReason' in user) user.afkReason = ''
          if (!'twiteos' in user) user.twiteos = ''
          if (!'banned' in user) user.banned = false
          if (!isNumber(user.level)) user.level = 0
          if (!'autolevelup' in user) user.autolevelup = false
        } else global.DATABASE._data.users[m.sender] = {
          exp: 0,
          limit: 10,
          lastclaim: 0,
          lastrob: 0,
          suit: 0,
          robos: 0,
          preg: 0,
          pregu: 0,
          resets: 0,
          preisi: 0,
          lastmp: 0,
          lastme: 0,
          mismo: 0,
          registered: false,
          name: this.getName(m.sender),
          age: -1,
          regTime: -1,
          afk: -1,
          point: 0,
          afkReason: '',
          twiteos: '',
          banned: false,
          warning: 0,
          level: 0,
          autolevelup: false,
        }

        let chat
        if (chat = global.DATABASE._data.chats[m.chat]) {
          if (!'isBanned' in chat) chat.isBanned = false
          if (!'welcome' in chat) chat.welcome = false
          if (!'detect' in chat) chat.detect = false
          if (!'sWelcome' in chat) chat.sWelcome = ''
          if (!'sBye' in chat) chat.sBye = ''
          if (!'sPromote' in chat) chat.sPromote = ''
          if (!'sDemote' in chat) chat.sDemote = ''
          if (!'delete' in chat) chat.delete = true
          if (!'porno' in chat) chat.porno = true
          if (!isNumber(chat.tutti)) chat.tutti = 0
          if (!isNumber(chat.tutti)) chat.jog = 0
          if (!isNumber(chat.pozo)) chat.pozo = 0
          if (!'antiLink' in chat) chat.antiLink = false
          if (!'aLink' in chat) chat.aLink = true
        } else global.DATABASE._data.chats[m.chat] = {
          isBanned: false,
          welcome: false,
          detect: false,
          sWelcome: '',
          sBye: '',
          sPromote: '',
          sDemote: '',
          delete: true,
          porno: true,
          antiLink: false,
          alink: true,
          tutti: 0,
          jog: 0,
          pozo: 0,
        }
      } catch (e) {
        console.log(e, global.DATABASE.data)
      }
      if (opts['nyimak']) return
      if (!m.fromMe && opts['self']) return
      if (typeof m.text !== 'string') m.text = ''
      if (m.isBaileys) return
      m.exp += Math.ceil(Math.random() * 10)

      let usedPrefix
      let _user = global.DATABASE.data && global.DATABASE.data.users && global.DATABASE.data.users[m.sender]

      let isROwner = [global.conn.user.jid, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
      let isOwner = isROwner || m.fromMe
      let isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
      let isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
      let groupMetadata = m.isGroup ? await this.groupMetadata(m.chat) : {}
      let participants = m.isGroup ? groupMetadata.participants : []
      let user = m.isGroup ? participants.find(u => u.jid == m.sender) : {} // User Data
      let bot = m.isGroup ? participants.find(u => u.jid == this.user.jid) : {} // Your Data
      let isAdmin = user.isAdmin || user.isSuperAdmin || false // Is User Admin?
      let isBotAdmin = bot.isAdmin || bot.isSuperAdmin || false // Are you Admin?
      for (let name in global.plugins) {
        let plugin = global.plugins[name]
        if (!plugin) continue
        if (!opts['restrict']) if (plugin.tags && plugin.tags.includes('admin')) continue
        const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
        let match = (_prefix instanceof RegExp ? // RegExp Mode?
          [[_prefix.exec(m.text), _prefix]] :
          Array.isArray(_prefix) ? // Array?
            _prefix.map(p => {
              let re = p instanceof RegExp ? // RegExp in Array?
                p :
                new RegExp(str2Regex(p))
              return [re.exec(m.text), re]
            }) :
            typeof _prefix === 'string' ? // String?
              [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
              [[[], new RegExp]]
        ).find(p => p[1])
        if (typeof plugin.before == 'function') if (await plugin.before.call(this, m, {
          match, user, groupMetadata, chatUpdate
        })) continue
        if ((usedPrefix = (match[0] || '')[0])) {
          let noPrefix = m.text.replace(usedPrefix, '')
          let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
          args = args || []
          let _args = noPrefix.trim().split` `.slice(1)
          let text = _args.join` `
          command = (command || '').toLowerCase()
          let fail = plugin.fail || global.dfail // When failed
          let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
            plugin.command.test(command) :
            Array.isArray(plugin.command) ? // Array?
              plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
                cmd.test(command) :
                cmd === command
              ) :
              typeof plugin.command === 'string' ? // String?
                plugin.command === command :
                false

          if (!isAccept) continue
          m.plugin = name
          if (m.chat in global.DATABASE._data.chats || m.sender in global.DATABASE._data.users) {
            let chat = global.DATABASE._data.chats[m.chat]
            let user = global.DATABASE._data.users[m.sender]
            if (name != 'unbanchat.js' && chat && chat.isBanned) return // Except this
            if (name != 'unbanuser.js' && user && user.banned) return
          }
          if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner
            fail('owner', m, this)
            continue
          }
          if (plugin.rowner && !isROwner) { // Real Owner
            fail('rowner', m, this)
            continue
          }
          if (plugin.owner && !isOwner) { // Number Owner
            fail('owner', m, this)
            continue
          }
          if (plugin.mods && !isMods) { // Moderator
            fail('mods', m, this)
            continue
          }
          if (plugin.premium && !isPrems) { // Premium
            fail('premium', m, this)
            continue
          }
          if (plugin.group && !m.isGroup) { // Group Only
            fail('group', m, this)
            continue
          } else if (plugin.botAdmin && !isBotAdmin) { // You Admin
            fail('botAdmin', m, this)
            continue
          } else if (plugin.admin && !isAdmin) { // User Admin
            fail('admin', m, this)
            continue
          }
          if (plugin.private && m.isGroup) { // Private Chat Only
            fail('private', m, this)
            continue
          }
          if (plugin.register == true && _user.registered == false) { // Butuh daftar?
            fail('unreg', m, this)
            continue
          }

          m.isCommand = true
          let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17 // XP Earning per command
          if (!isPrems && plugin.limit && global.DATABASE._data.users[m.sender].limit < plugin.limit * 1) {
            this.reply(m.chat, `No tienes más Limites, para comprar ponne *${usedPrefix}buy*`, m)
            continue // Limit habis
          }
          try {
            await plugin.call(this, m, {
              match,
              usedPrefix,
              noPrefix,
              _args,
              args,
              command,
              text,
              conn: this,
              participants,
              groupMetadata,
              user,
              bot,
              isROwner,
              isOwner,
              isAdmin,
              isBotAdmin,
              isPrems,
              chatUpdate,
            })
            if (!isPrems) m.limit = m.limit || plugin.limit || false
          } catch (e) {
            // Error occured
          require('./lib/image')(m, this)
     return handler ()
            m.error = e
            console.log(e)
            if (e) {
           require('./lib/image')(m, this)
          return handler()
             console.log(e)
            }
          } finally {
            // m.reply(util.format(_user)) 
            if (m.limit) m.reply(+ m.limit + ' Limites aplicados')
          }
          break
        }
      }
    } finally {
      //console.log(global.DATABASE._data.users[m.sender])
      let user, stats = global.DATABASE._data.stats
      if (m) {
        if (m.sender && (user = global.DATABASE._data.users[m.sender])) {
          user.exp += m.exp
          user.limit -= m.limit * 1
        }

        let stat
        if (m.plugin) {
          let now = + new Date
          if (m.plugin in stats) {
            stat = stats[m.plugin]
            if (!isNumber(stat.total)) stat.total = 1
            if (!isNumber(stat.success)) stat.success = m.error ? 0 : 1
            if (!isNumber(stat.last)) stat.last = now
            if (!isNumber(stat.lastSuccess)) stat.lastSuccess = m.error ? 0 : now
          } else stat = stats[m.plugin] = {
            total: 1,
            success: m.error ? 0 : 1,
            last: now,
            lastSuccess: m.error ? 0 : now
          }
          stat.total += 1
          stat.last = now
          if (!m.error) {
            stat.success += 1
            stat.lastSuccess = now
          }
        }
      }

      try {
        require('./lib/print')(m, this)
      } catch (e) {
        console.log(m, m.quoted, e)
      }
    }
  },
  async participantsUpdate({ jid, participants, action }) {
    let chat = global.DATABASE._data.chats[jid]
    let text = ''
    switch (action) {
      case 'add':
      case 'remove':
        if (chat.welcome) {
          for (let user of participants) {
            let pp = './src/avatar_contact.png'
            try {
              pp = await this.getProfilePicture(user)
            } catch (e) {
            } finally {
              text = (action === 'add' ? (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!').replace('@subject', this.getName(m.key.remoteJid)) :
                (chat.sBye || this.bye || conn.bye || 'Bye, @user!')).replace('@user', '@' + user.split('@')[0])
              this.sendFile(jid, pp, 'pp.jpg', text, null, false, {
                contextInfo: {
                  mentionedJid: [user]
                }
              })
            }
          }
        }
        break
      case 'promote':
        text = (chat.sPromote || this.spromote || conn.spromote || '@user ```is now Admin```')
      case 'demote':
        if (!text) text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```is no longer Admin```')
        text = text.replace('@user', '@' + participants[0].split('@')[0])
        if (chat.detect) this.sendMessage(jid, text, MessageType.extendedText, {
          contextInfo: {
            mentionedJid: this.parseMention(text)
          }
        })
        break
    }
  },
  async delete(m) {
    if (m.key.fromMe) return
    let chat = global.DATABASE._data.chats[m.key.remoteJid]
    if (chat.delete) return
    await this.reply(m.key.remoteJid, `
@${m.participant.split`@`[0]} en este grupo 
no se pueden eliminar mensajes.
`.trim(), m.message, {
      contextInfo: {
        mentionedJid: [m.participant]
      }
    })
    this.copyNForward(m.key.remoteJid, m.message).catch(e => console.log(e, m))
  }
}

global.dfail = (type, m, conn) => {
  let msg = {
    rowner: 'Este comando solo puede ser utilizado por _*OWWNER!1!1!*_',
    owner: '_Este comando en_ *MANTENIMIENTO*\n disculpe los inconvenientes!\n\n_Utiliza *.comandos*_\n_para ver_ _otros comandos_ _disponibles_',
    mods: 'Este comando solo puede ser utilizado por _*Moderator*_ !',
    premium: 'Este comando es solo para miembros _*Premium*_ !\n Gana premium gratis pone .premium',
    group: 'Este comando solo se puede usar en grupos!\nRegistrate .nuevogrupo  * link *',
    private: '_Solo al priv!_ 🙃',
    admin: 'Este comando es solo para el *Admin*!',
    botAdmin: 'Haga que el bot sea un *Admin* para usar este comando!',
    unreg: 'Regístrese para utilizar esta función'
  }[type]
  if (msg) return m.reply(msg)
}

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'handler.js'"))
  delete require.cache[file]
  if (global.reloadHandler) console.log(global.reloadHandler())
})
