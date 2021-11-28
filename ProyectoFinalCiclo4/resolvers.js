const {addUserToProject,
    getProject,
    proyectos,
    deleteProject,
    createProject} = require('./service/proyecto.service');
const Project = require('./model/proyectoModel')
const User = require('./model/usuarioModel')
var aes256 = require('aes256');

const listUsuarios = [
    {
        nombre: 'Anita',
        identificacion: 1128390263,
        email: 'amalzate21@gmail.com',
        estado: 'activo',
        perfil: 'estudiante'
    },
    {
        nombre: 'Santi',
        identificacion: 1890048016,
        email: 'santi@gmail.com',
        estado: 'inactivo',
        perfil: 'lider'
    }

]
const key = 'CLAVEDIFICIL';
const resolvers = {
    Query: {
        usuarios: () => listUsuarios,
        usuario: (parent, args, context, info) => {
            return listUsuarios.find(user => user.identificacion === args.identificacion)
        },
        proyectos: async ()=> proyectos(),
        getProject: async (parent, args, context, info)=> getProject(args.nombre)
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
            return User.updateOne({identificacion:args.identificacion}, {estado: "Activo"})
                .then(u => "Usuario Activo")
                .catch(err => "Falló la activación");
            
        },

        deleteUser: (parent, args, context, info) => {
            return User.deleteOne({identificacion:args.ident})
                .then(u => "Usuario Eliminado")
                .catch(err => "Falló la eliminacións");
        },

        deleteProject: (parent, args, context, info) => deleteProject(args.nombreProyecto),

        createProject: (parent, args, context, info) => {
            
                createProject(args.project)
            
        },

        insertUserToProject: (parent, args, context, info) => addUserToProject(args.identificacion, args.nombreProyecto),
 
    }
}

module.exports = resolvers