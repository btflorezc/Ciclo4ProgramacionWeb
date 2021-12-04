const { gql} = require('apollo-server-express')

const typeDefs = gql`
    scalar Date

    type Usuario{
        nombre: String
	    identificacion: Int
	    correo: String
		estado: String
	    tipo_usuario: String
    }
    type Proyecto{
        identificador: String
        lider: String
        nombre: String
        objetivosGenerales: String
        presupuesto: Int
        fechaTerminacion: Date
        
    }
    type Query{
        usuariosEstudiantes : [Usuario]
        usuario(identificacion: Int): Usuario
        proyectos:[Proyecto]
        getProject(nombre:String):Proyecto
        liderProject(lider:String): [Proyecto]

    }
    input UserInput{
        nombre: String
        identificacion: Int
        clave: String
        tipo_usuario: String
    }

    input ProjectInput{
        lider: String
        nombre: String
        objetivos_generales: String
        presupuesto: Int
        fecha_inicio: Date
        fecha_terminacion: Date
    }

    type Mutation{
        createUser(user: UserInput): String
        createProject(project:ProjectInput): String
        activeUser(identificacion:Int): String
        deleteUser(ident:Int): String
        deleteProject(nombreProyecto:String): String
        insertUserToProject(identificacion:Int, nombreProyecto: String):String
        autenticar(usuario:String, clave:String): String
    }
`
module.exports = typeDefs
