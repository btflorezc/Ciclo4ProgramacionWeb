const {Schema, model} = require('mongoose')

const project= new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    lider: String,
    facultad: String,
    fechaInicio: {
        type:Date,
        default: new Date()
    },
    activo: {
        type: Boolean,
        default: true
    },
    integrantes:[{
        ref: "usuarios",
        type: Schema.Types.ObjectId
    }]

    
},
    {
        timestamps : true
    }

)
module.exports = model('proyectos', project)