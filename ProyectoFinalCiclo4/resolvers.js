const ProjectModel = require('./model/proyectoModel')

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

const resolvers = {
    Query: {
        usuarios: () => listUsuarios,
        usuario: (parent, args, context, info) => {
            return listUsuarios.find(user => user.identificacion === args.identificacion)
        },
        proyectos: async ()=> await ProjectModel.find({})
        
    }
}

module.exports = resolvers