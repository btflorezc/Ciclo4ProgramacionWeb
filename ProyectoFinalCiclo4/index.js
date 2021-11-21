require('./infraestructura/conectionDB')

const express = require('express')
const {ApolloServer } = require('apollo-server-express')
const typeDefs = require('./typeDef')
const resolvers = require('./resolvers')


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






const iniciarServidor = async () => {
    const api = express();
    const apollo = new ApolloServer(
        {
            typeDefs,
            resolvers
        });
    await apollo.start()
    apollo.applyMiddleware({ app: api })
    api.use((request, response) => {
        response.send('Hola')
    })
    api.listen('9090', () => console.log('Inició servidor'))

}
iniciarServidor()

