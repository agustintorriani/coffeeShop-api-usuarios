var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var UsuarioSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    date: Date
})

UsuarioSchema.plugin(mongoosePaginate)
const User = mongoose.model('usuarios', UsuarioSchema)

module.exports = User;