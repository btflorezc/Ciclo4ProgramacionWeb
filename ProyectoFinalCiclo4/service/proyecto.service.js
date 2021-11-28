const Project = require('../model/proyectoModel')
const User = require('../model/usuarioModel')

const addUserToProject = async (identificacion, nombreProyecto) => {
    const user = await User.findOne({identificacion})
    if(user && user.estado === "Activo"){
        const project = await Project.findOne({nombre: nombreProyecto})
        if(project && project.activo){
            if(project.integrantes.find(i=> i == user._id)){
                return "El usuario ya pertenece al proyecto"
            }
            else{
                await Project.updateOne({nombre: args.nombreProyecto},{$push:{integrantes:user._id}})
                return "Usuario adicionado correctamente"
            }
            
        }else{
            return "Proyecto no válido para adicionar un integrante, consulte al administrador"
        }
        //suscripción proyecto
    } else{
        return "Usuario no válido"
    }
};

const createProject= (project) => {
    const nuevoProyecto = new Project(project);
    return nuevoProyecto.save()
        .then(u => "Proyecto Creado")
        .catch(err => console.log(err));
    
};

const deleteProject= (nombreProyecto) => {
    return Project.deleteOne({nombre:args.nombreProyecto}, {activo: false})
        .then(u => "Proyecto Eliminado")
        .catch(err => "Falló la eliminacións");
};

const proyectos = async ()=> await Project.find({}).populate("integrantes");
const getProject= async (nombre)=> await Project.findOne({nombre});

module.exports ={
    addUserToProject,
    getProject,
    proyectos,
    deleteProject,
    createProject
}