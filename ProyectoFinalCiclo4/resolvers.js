const {addUserToProject,
    getProject,
    proyectos,
    deleteProject,
    createProject} = require('./service/proyecto.service');
const {buscarUsuarioPorIdentificacion} = require('./service/usuario.service')
const Project = require('./model/proyectoModel')
const User = require('./model/usuarioModel')
var aes256 = require('aes256');
const {isLider} = require('./middleware/authjwt');
const jwt= require('jsonwebtoken')


const listUsuarios = [
    {
        nombre: 'Anita',
        identificacion: 1128390263,
        correo: 'amalzate21@gmail.com',
        estado: 'activo',
        tipo_usuario: 'estudiante'
    },
    {
        nombre: 'Santi',
        identificacion: 1890048016,
        correo: 'santi@gmail.com',
        estado: 'inactivo',
        tipo_usuario: 'lider'
    }

]
const key = 'CLAVEDIFICIL';
const resolvers = {
    Query: {
        // usuarios: () => listUsuarios,
        // usuario: (parent, args, context, info) => buscarUsuarioPorIdentificacion(args.identificacion),
        proyectos: async (parent, args, context, info)=> {
            return proyectos()
        },
        usuariosEstudiantes: async () => await User.find({tipo_usuario:'Estudiante'}),
        getProject: async (parent, args, context, info)=> getProject(args.nombre),
        liderProject: async (parent, args, context, info)=> Project.find({lider:args.lider})
    },
    Mutation:{
        createUser: (parent, args, context, info) => {
            const {clave} = args.user;
            const nuevoUsuario = new User(args.user);
            const encryptedPlainText = aes256.encrypt(key, clave);
            nuevoUsuario.clave= encryptedPlainText;
            return nuevoUsuario.save()
                .then(u => "Usuario Creado")
                .catch(err => "Falló la creación");
            
        },
        activeUser:(parent, args, context, info) => {
            return User.updateOne({identificacion:args.identificacion}, {estado: "Autorizado"})
                .then(u => "Usuario Autorizado")
                .catch(err => "Falló la validación");
            
        },

        deleteUser: (parent, args, context, info) => {
            if(isLider(context.rol)){
                return User.deleteOne({identificacion:args.ident})
                    .then(u => "Usuario Eliminado")
                    .catch(err => "Falló la eliminacións");
            }
        },

        deleteProject: (parent, args, context, info) =>{ 
            if(isLider(context.rol)){
                deleteProject(args.nombreProyecto)
            }
        },

        createProject: (parent, args, context, info) => {
            // if(isLider(context.rol)){
            return createProject(args.project)
            //}
        },

        autenticar: async(parent, args, context, info) => {
            try {
                const usuario = await User.findOne({ correo: args.usuario })
                if (!usuario) {
                    return  "Verique usuario y contrasena" 
                }
        
                const claveDesencriptada = aes256.decrypt(key, usuario.clave)
                if (args.clave != claveDesencriptada) {
                    return "Verique usuario y contrasena"
                }
                const token = jwt.sign({
                    role: usuario.tipo_usuario
                }, key, { expiresIn: 60 * 60 * 2 })
        
                return token 
            } catch (error) {
                console.log(error)
            }
        },
        insertUserToProject: (parent, args, context, info) => addUserToProject(args.identificacion, args.nombreProyecto),
 
    }
}

module.exports = resolvers