let handler = m => m

handler.before = function (m, { user }) {
    function desblock() {
let users = global.DATABASE.data.users
                users[m.sender].banned = false
return console.log('desbloqueado a los usuarios')
}
setTimeout (desblock, 8888)
} 

module.exports = handler
