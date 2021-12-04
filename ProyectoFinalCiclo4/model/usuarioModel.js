const {Schema, model} = require('mongoose')

const usuario = new Schema ({
    nombre: {
        type: String,
        required: true
    },
    identificacion: {
        type: Number,
        unique: true,
        required: true
    },
    tipo_usuario: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        default: "Pendiente"
    },
    clave: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    }
})
module.exports = model('usuarios', usuario)