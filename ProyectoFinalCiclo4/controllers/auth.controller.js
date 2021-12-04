const Usuario = require('../model/usuarioModel');
const jwt = require('jsonwebtoken')
let aes256 = require('aes256');
const key = 'CLAVEDIFICIL';

const signIn = async (request, response) => {
    try {
        const usuario = await Usuario.findOne({ correo: request.body?.correo })
        if (!usuario) {
            return response.status(401).json({ response: "Verifique usuario y contraseña" })
        }
        const claveDesencriptada = aes256.decrypt(key, usuario.clave)
        if(request.body?.clave != claveDesencriptada){
            return response.status(401).json({ response: "Verifique usuario y contraseña" })
        }
        const token = jwt.sign({
            role: usuario.tipo_usuario
        }, key, {expiresIn: 60*60*2})
        response.status(200).json({jwt: token})

    }catch(error){
        console.log(error)
        response.status(500).json({response: "Contacte al administrador"})
    }
}


module.exports = signIn;