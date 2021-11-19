// require('./infraestructura/conectionDB')
const ProjectModel = require('./model/proyectoModel')
const express = require('express')
const {gql, ApolloServer} = require('apollo-server-express')


/* const projectAguas = new ProjectModel({
    nombre: 'Proyecto de aguas residuales',
    lider: 'Andres Delgado',
    facultad: 'Ingenieria X'
})

/* projectAguas.save((err, document)=>{
    if(err){
        console.log(err);
        return;
    }
}) */

/* const consultaProyectos= async ()=>{
    return await ProjectModel.find({})
    
}

api.get('/proyectos', (request, response)=>{
    consultaProyectos().then(function(resultado){
        response.json({projects: resultado})
    })
}) */




const typeDefs=gql`
    type Usuario{
        nombre: String
	    identificacion: Int
	    email: String
		estado: String
	    perfil: String
    }
    type Query{
        usuario : [Usuario]

    }
`
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
    Query:{
        usuario:()=> listUsuarios
    }
}

const iniciarServidor = () => {
    const api  = express();
    const server = new ApolloServer(
        {typeDefs, 
        resolvers
    });
    await apollo.start()
    apollo.applyMiddleware({app:api})
    api.use((request, response)=>{
        response.send('Hola')
    })
    api.listen('9090', ()=>console.log('Inició servidor'))

}
iniciarServidor()

