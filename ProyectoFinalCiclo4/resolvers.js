const ProjectModel = require('./model/proyectoModel')
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
        proyectos: async ()=> await ProjectModel.find({}),
        getProject: async (parent, args, context, info)=> await ProjectModel.findOne({nombre: args.nombre})
    },
    Mutation:{
        createUser: async(parent, args, context, info) => {
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

        deleteProject: (parent, args, context, info) => {
            return Project.deleteOne({nombre:args.nombreProyecto}, {activo: false})
                .then(u => "Proyecto Eliminado")
                .catch(err => "Falló la eliminacións");
        },

        insertUserToProject: async (parent, args, context, info) => {
            const user = await User.findOne({identificacion: args.identificacion})
            if(user && user.estado === "Activo"){
                const project = await ProjectModel.findOne({nombre:args.nombreProyecto})
                if(project && project.activo){
                    if(project.integrantes.find(i=> i = user.identificacion)){
                        return "El usuario ya pertenece al proyecto"
                    }
                    else{
                        await ProjectModel.updateOne({nombre: args.nombreProyecto},{$push:{integrantes:user.identificacion}})
                        return "Usuario adicionado correctamente"
                    }
                    
                }else{
                    return "Proyecto no válido para adicionar un integrante, consulte el administrador"
                }
                //suscripción proyecto
            } else{
                return "Usuario no válido"
            }
        }
    }
}

module.exports = resolvers