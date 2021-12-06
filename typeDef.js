const {gql} = require ('apollo-server-express')

/*type Proyecto {
        nombre: String
        lider: String
    }*/

const typeDefs = gql`
    
    type Usuario {
        correo: String
        estado: String
        identificacion: Int
        nombre_completo: String
        tipo_usuario: String
    }

    type Proyecto {
        Id_proyecto: String
        nombre: String
        objetivos_generales: String
        objetivos_especificos: String
        presupuesto: Int
        fecha_inicio: String
        fecha_terminacion: String
        documento: Int
        lider: String
        estado_creacion: String
        estado_proyecto: String
        fase: String
        inscripciones: [String]
    }

    type Query{
        usuarios : [Usuario]
        usuario(identificacion: Int): Usuario
        proyectos : [Proyecto]
        getProyecto (nombre: String) : Proyecto 
    }

    input UserInput{
        nombre_completo: String
        identificacion: Int
        correo: String
        tipo_usuario: String
        contrasena: String
    }

    input ProyectoInput{
        Id_proyecto: String
        nombre: String
        objetivos_generales: String
        objetivos_especificos: String
        presupuesto: Int
        fecha_inicio: String
        fecha_terminacion: String
        documento: Int
        lider: String
        estado_creacion: String
        estado_proyecto: String
        fase: String
    }

    input InscripcionInput{
        id_inscripcion: String 
        id_estudiante: String
        estado: String
        fecha_ingreso: String
        fecha_egreso: String
    }

    type Mutation{
        createUser(user:UserInput):String
        createProyecto(proyecto:ProyectoInput): String
        activeUser(identificacion:Int):String
        aprobarcrearProyecto(Id_proyecto:String): String
        activarProyecto(Id_proyecto:String): String
        inactivarProyecto(Id_proyecto:String): String
        cambiarfaseProyecto(Id_proyecto:String): String
    }
`
module.exports = typeDefs