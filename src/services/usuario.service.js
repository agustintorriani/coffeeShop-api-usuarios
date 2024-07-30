// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/Usuario.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');

_this = this

exports.getUsers = async function (query, page, limit) {

    var options = {
        page,
        limit
    }
    try {
        var Users = await User.paginate(query, options)
        return Users;
    } catch (e) {
        throw Error('Ha ocurrido un error mientras se paginaban los usuarios');
    }
}

exports.getUsuarioById = async function (id){

    try {
        let user = await User.findOne({ _id: id });
        console.log("user en servicio",user);
        return user;
    } catch (err) {
        throw new Error("Error al consultar usuario");
    }
}

exports.obtenerUsuarioPorMail = async function (email){

    try {
        let user = await User.findOne({ email: email });
        user.password = null;
        if(user){
            return user;
        } else {
            return null;
        }

    } catch (err) {
        throw new Error("Error al consultar usuario");
    }
}

exports.crear = async function (user) {

    try {
        let userExistente = await User.findOne({ email: user.email}).exec();

        if(!userExistente){
            var hashedPassword = bcrypt.hashSync(user.password, 8);
            var newUser = new User({
                username: user.username,
                email: user.email,
                date: new Date(),
                password: hashedPassword
            })           
            
            var savedUser = await newUser.save();
            
            var token = jwt.sign({
                id: savedUser._id
            }, process.env.SECRET, {
                expiresIn: 86400 //86400 // expires in 24 hours
            });
            
            return {token:token, user: savedUser};
        } else {
            return null;
        }

    } catch (e) {
        throw Error("Ha ocurrido un error mientras se creaba el usuario")
    }
}

exports.updateUser = async function (user) {
    var hashedPassword = bcrypt.hashSync(user.password, 8);

    try {
        User.updateOne({email: user.email}, { $set: { username: user.username, email: user.email, password: hashedPassword }}).then((result) => {
        });
        return user;        
    } catch (e) {
        throw Error("Ha ocurrido un error mientras se actualizaba el usuario")
        return null;
    }
    
}


exports.ingresar = async function (mail,password) {

    try {
        var _details = await User.findOne({
            email: mail
        });
        if(_details){
            var passwordIsValid = bcrypt.compareSync(password, _details.password);
            if (!passwordIsValid) return null;
            var token = jwt.sign({
                id: _details._id
            }, process.env.SECRET, {
                expiresIn: 86400 // expires in 24 hours
            });
    
            _details.password = null;
            return {token:token, user:_details};
        } else {
            return null;
            
        }
        
    } catch (e) {
        throw Error("Error while Login User", e)
    }
}
