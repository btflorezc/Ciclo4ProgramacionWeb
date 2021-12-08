const { gql } = require('apollo-server-express')

//Nodemon
const typeDefs = gql`
    scalar Date

    type Usuario{
        nombre_completo: String
        identificacion: Int
        estado: String
        correo: String
        tipo_usuario: String
    }
    type Proyecto{
        id_proyecto: String
        objetivos_generales: String
        objetivos_especificos: [String]
        presupuesto: Int
        fecha_inicio: Date
        fecha_terminacion: Date
        lider: String
        fase:String
        nombre:String
        estado_proyecto:String
        inscripciones:[inscripciones]
        avances: [avances]
    }

    type  avances  {
        id_avance : String
        fecha_avance : Date
        descripcion : String
        observaciones_lider : String 
    }

    type inscripciones{
        id_inscripcion : String
        id_estudiante:String
        estado:String
        fecha_ingreso:Date
        fecha_egreso:Date

    }

    type Query{
        usuarios: [Usuario]
        usuario(identificacion: Int): Usuario
        proyectos:[Proyecto]
        getProject(nombre:String):Proyecto
        findLiderProjects (lider:String):[Proyecto]
    }
    input UserInput{
        nombre_completo: String
        identificacion:Int
        clave: String
        tipo_usuario: String
    }
    input ProjectInput{
        objetivos_generales: String
        presupuesto: Int
        fechaTerminacion: Date
        lider: String
        nombre:String
    }
    input ProjectUpdateInput{
        objetivos_generales: String
        objetivos_especificos: [String]
        presupuesto: Int
        nombre:String
        _id:String
    }
    type Mutation{
        createUser(user:UserInput):String
        createProject(project:ProjectInput):String
        activeUser(identificacion:Int):String
        deleteUser(ident:Int):String
        deleteProject(nombreProyecto:String):String
        insertUserToProject(identificacion:Int,nombreProyecto:String):String
        autenticar(usuario:String, clave:String):String
        updateProject(project: ProjectUpdateInput ):String
        updateEstadoInscripcion(_id:String, id_inscripcion:String, nuevo_estado:String):String
        updateObservaciones(_id:String, id_avance:String, observaciones:String ):String
        activeProject(id_proyecto:String):String 
        updateFaseProject(id_proyecto:String):String       
    }
`
module.exports = typeDefs

// db.proyectos.update({"nombre": 'Agua Potable'},{$set: {"inscripciones.$[ins].estado": "Pendiente si"}},{arrayFilters:[{"ins.ins_id": {$eq: ("1")}},]})