const { addUserProject,
    getProject,
    proyectos,
    deleteProject,
    createProject } = require('./service/proyecto.service');
const { buscarUsuarioPorIdentificacion } = require('./service/usuario.service')
const Project = require('./model/proyectoModel')
const User = require('./model/usuarioModel')
let aes256 = require('aes256');
const { isLider } = require('./middleware/authjwt');
const jwt = require('jsonwebtoken')


const listUsuarios = [
    {
        nombre: 'Ramon Castano',
        identificacion: 123456789,
        estado: 'activo',
        clave: 'claveFacil',
        correo: 'ramon@gmail.com',
        tipo_usuario: 'estudiante'
    },
    {
        nombre: 'Ernesto',
        identificacion: 98765,
        estado: 'inactivo',
        clave: 'ClaveDificil',
        correo: 'ernesto@gmail.com',
        tipo_usuario: 'estudiante'
    },
    {
        nombre: 'Daniel Saavedra',
        identificacion: 123456789,
        estado: 'activo',
        correo: 'daniel@gmail.com',
        tipo_usuario: 'lider'
    },

]
const key = 'CLAVEDIFICIL';

const resolvers = {
    Query: {
        usuarios: () => listUsuarios,
        usuario: (parent, args, context, info) => buscarUsuarioPorIdentificacion(args.identificacion),
        proyectos: async (parent, args, context, info) => {
            return proyectos()
        },
        getProject: async (parent, args, context, info) => getProject(args.nombre),
        findLiderProjects: async (parent, args, context, info) => {
           return await Project.find({lider:args.lider})
        },
    },
    Mutation: {
        createUser: (parent, args, context, info) => {
            const { clave } = args.user;
            const nuevoUsuario = new User(args.user);
            const encryptedPlainText = aes256.encrypt(key, clave);
            nuevoUsuario.clave = encryptedPlainText
            return nuevoUsuario.save()
                .then(u => "usuario creado")
                .catch(err => console.log(err));
        },
        activeUser: (parent, args, context, info) => {
            return User.updateOne({ identificacion: args.identificacion }, { estado: "Activo" })
                .then(u => "Usuario activo")
                .catch(err => "Fallo la activacion");
        },
        deleteUser: (parent, args, context, info) => {
            if (isLider(context.rol)) {
                return User.deleteOne({ identificacion: args.ident })
                    .then(u => "Usuario eliminado")
                    .catch(err => "Fallo la eliminacion");
            }
        },
        deleteProject: (parent, args, context, info) => {
            if (isLider(context.rol)) {
                deleteProject(args.nombreProyecto)
            }
            //code smells... Recuerdan?
        },
        insertUserToProject: async (parent, args, context, info) => addUserProject(args.identificacion, args.nombreProyecto),
        createUser: (parent, args, context, info) => {
            const { clave } = args.user;
            const nuevoUsuario = new User(args.user);
            const encryptedPlainText = aes256.encrypt(key, clave);
            nuevoUsuario.clave = encryptedPlainText
            return nuevoUsuario.save()
                .then(u => "usuario creado")
                .catch(err => console.log(err));
        },
        createProject: (parent, args, context, info) => {
            if (isLider(context.rol)) {
                createProject(args.project)
            }
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
                    rolesito: usuario.tipo_usuario
                }, key, { expiresIn: 60 * 60 * 2 })
        
                return token 
            } catch (error) {
                console.log(error)
            }
        },
        updateProject: async(parent, args, context, info) => {
            try {
                const project = await Project.findOne({ _id : args.project._id })
                if (project.estado_proyecto == "Activo"){
                await Project.updateOne({ _id : project.id }, {  $set: {objetivos_generales: args.project.objetivos_generales,objetivos_especificos: args.project.objetivos_especificos,  presupuesto: args.project.presupuesto,nombre:args.project.nombre} })
                return "proyecto Actualizado "
            }
            else {
                return "Proyecto no Activo " 
            }
            } catch (error) {
                console.log(error)
            }
        },
        updateEstadoIncripcion: async(parent, args, context, info) => {
            try {
                const project = await Project.findOne({ _id : args._id })
             await  Project.updateOne({"nombre": project.nombre},{$set: {"inscripciones.$[ins].estado": args.nuevo_estado}},{arrayFilters:[{"ins.id_inscripcion": {$eq: (args.id_inscripcion)}},]})
            //     if (project.estado_proyecto == "Activo"){
            //     await Project.updateOne({ _id : project.id }, {  $set: {objetivos_generales: args.project.objetivos_generales,objetivos_especificos: args.project.objetivos_especificos,  presupuesto: args.project.presupuesto,nombre:args.project.nombre} })
            //     return "proyecto Actualizado "
            // }
            // else {
                return "inscricion actualizada " 
            // }
            } catch (error) {
                console.log(error)
            }
        },
        updateObservaciones: async(parent, args, context, info) => {
            try {
                const project = await Project.findOne({ _id : args._id })
             await  Project.updateOne({"nombre": project.nombre},{$set: {"avances.$[avc].observaciones_lider": args.observaciones}},{arrayFilters:[{"avc.id_avance": {$eq: (args.id_avance)}},]})
            //     if (project.estado_proyecto == "Activo"){
            //     await Project.updateOne({ _id : project.id }, {  $set: {objetivos_generales: args.project.objetivos_generales,objetivos_especificos: args.project.objetivos_especificos,  presupuesto: args.project.presupuesto,nombre:args.project.nombre} })
            //     return "proyecto Actualizado "
            // }
            // else {
                return "avance actualizada " 
            // }
            } catch (error) {
                console.log(error)
            }
        },
        activeProject: (parent, args, context, info) => {
            return Project.updateOne({id_proyecto:args.Id_proyecto}, {estado_proyecto:"Activo"})
                .then(u => "Se realizó la activación del proyecto")
                .catch(err => "Fallo la activación del proyecto");
        },
        updateFaseProjec: (parent, args, context, info) => {
            return proyecto.updateOne({id_proyecto:args.id_proyecto}, {fase:"Terminado",estado_proyecto:"Inactivo"})
                .then(u => "Se realizo el cambio de fase del proyecto, de “En desarrollo” a “Terminado”.")
                .catch(err => "Fallo el cambio de fase del proyecto, de “En desarrollo” a “Terminado”.")
          }  
    }
}
module.exports = resolvers