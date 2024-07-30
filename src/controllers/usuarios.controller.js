var UsuarioService = require('../services/usuario.service');
const CryptoJS = require('crypto-js');

_this = this;

// exports.getUsersByMail = async function (req, res, next) {
//     try {
//         var Users = await UserService.getUsers(filtro, page, limit)
//         return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
//     } catch (e) {
//         return res.status(400).json({status: 400, message: e.message});
//     }
// }

// exports.getUserById = async function(req, res, next) {
//     try {
//         const id = req.params.id;
//         let user = await UserService.getUsuarioById(id);
//         if (!user) {
//             return res.status(200).json({
//                 method: "getUserById",
//                 message: "Usuario no encontrado",
//                 success: false
//         });
//         }
//         return res.status(200).json({user, success:true});
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             method: "getUserById",
//             message: err,
//         });
//     }
// }

exports.obtenerPerfil = async function (req, res, next) {
    try {
        var user = await UsuarioService.obtenerUsuarioPorMail(req.body.email);

        if (!user) {
            return res.status(200).json({
                method: "obtenerPerfil",
                message: "Usuario no encontrado",
                success: false
            });
        }
        
        return res.status(200).json({status: 200, user, success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            method: "obtenerPerfil",
            message: "Ocurrió un error al obtener el perfil",
            success: false
        });
    }

}

exports.crear = async function (req, res, next) {
    var encryptedPassword = req.body.password;
    // const secretKey = process.env.SECRET_KEY;
    // const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
    // let password = bytes.toString(CryptoJS.enc.Utf8);

    var Usuario = {
        email: req.body.email,
        password: encryptedPassword,
        usuario: req.body.usuario
    }

    try {
        await UsuarioService.crear(Usuario).then((createdUser) => {
            if (createdUser) {
                createdUser.password = null;
                return res.status(200).json({status: 200, createdUser, message: "Usuario creado exitosamente", success: true});
            } else {
                return res.status(200).json({status: 200, createdUser, message: "El mail ingresado ya existe", success: false});
            }
        });

    } catch (e) {
        return res.status(400).json({status: 400, message: "Hubo un error al crear el usuario"})
    }
}

// exports.updateUser = async function (req, res, next) {

//     if (!req.body.name) {
//         return res.status(400).json({status: 400., message: "El nombre es obligatorio"})
//     }
//     var User = {
//         name: req.body.name ? req.body.name : null,
//         email: req.body.email ? req.body.email : null,
//         password: req.body.password ? req.body.password : null
//     }
//     try {
//         var updatedUser = await UserService.updateUser(User)
//         return res.status(200).json({status: 200, data: updatedUser, message: "Usuario actualizado exitosamente"})
//     } catch (e) {
//         return res.status(400).json({status: 400., message: e.message})
//     }
// }

// // exports.removeUser = async function (req, res, next) {

// //     var id = req.body.id;
// //     try {
// //         var deleted = await UserService.deleteUser(id);
// //         res.status(200).send("Succesfully Deleted... ");
// //     } catch (e) {
// //         return res.status(400).json({status: 400, message: e.message})
// //     }
// // }

exports.ingresar = async function (req, res, next) {
    var email = req.body.email;
    var encryptedPassword = req.body.password;

    // const secretKey = process.env.SECRET_KEY;
    // const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
    // let password = bytes.toString(CryptoJS.enc.Utf8);

    try {
        var user = await UsuarioService.ingresar(email, encryptedPassword);
        if (user != null) {
            user.password = null;
            res.status(200)
            res.json({ status: 200, data: user, message: "Login exitoso", success: true});
            return res
        } else {
            return res.status(200).json({ status: 401, message: "Email o contraseña invalidos",  success: false });
        }
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message, success: false });
    }
}

// exports.sendResetPasswordEmail = async function (req, res, next) {

//     /*El mail siempre se envía a la casilla mobee.application@gmail.com*/

//     var email = req.body.email;
//     try {
//         var resetToken = await UserService.generatePasswordResetToken(email);
//         var user = await UserService.getUsuarioByMail(email);
//         var resetLink = `http://localhost:3000/paginas/autenticacion/reestablecer-password?token=${resetToken}&userId=${user._id}`;

//         await UserService.sendPasswordResetEmail(email, resetLink);

//         return res.status(200).json({ status: 200, message: "El mail se ha enviado correctamente", success:true });
//     } catch (e) {
//         return res.status(500).json({ status: 500, message: "Ha ocurrido un error inseperado",success:false });
//     }
// }

// exports.resetPassword = async function (req, res, next) {
//     var userId = req.body.userId;
//     var encryptedPassword = req.body.password;
//     const secretKey = process.env.SECRET_KEY;
//     const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
//     let password = bytes.toString(CryptoJS.enc.Utf8);
//     try {
//         let user = await UserService.getUsuarioById(userId);

//         if(user != null){
//             user.password = password;   
//             let resp = UserService.updateUser(user);

//             if(resp != null){
//                 return res.status(200).json({ status: 200, message: "La contraseña se ha cambiado correctamente",success: true });
//             } else {
//                 return res.status(200).json({ status: 200, message: "No se pudo cambiar la contraseña", success:false });
//             }


//         } else {
//             return res.status(200).json({ status: 200, message: "El usuario no existe" });
//         }
//     } catch (e) {
//         console.log("error",e);
//         return res.status(500).json({ status: 500, message: e.message });
//     }

// }
