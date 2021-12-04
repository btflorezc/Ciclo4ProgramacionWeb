const {Schema, model} = require('mongoose')

const project= new Schema({
    identificador:{
        type: String,
        required: true,
        unique: true
    },
    
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    objetivosGenerales: String,
    objetivosEspecificos: [String],
    presupuesto: Number,
    
    fecha_terminacion: Date,
    estado: {
        type:String,
        default:"inactivo"
    },
    fase: String,
    lider: String,
    facultad: String,
    fechaInicio: {
        type:Date,
        default: new Date()
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