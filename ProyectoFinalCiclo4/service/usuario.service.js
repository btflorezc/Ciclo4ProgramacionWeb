
const Usuario = require('../model/usuarioModel');

const usuario= async (nombre)=> await Usuario.findOne({nombre});


module.exports ={
    usuario
}