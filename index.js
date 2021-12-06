require('./infraestructura/conexionDB')
const express = require ('express')
const {ApolloServer} = require ('apollo-server-express')
const typeDefs = require('./typeDef')
const resolvers = require('./resolver')

/*
const ProyectoAguas = new proyectoModelo({
    Id_proyecto: 7,
    nombre: 'Huertas caseras rurales',
    objetivos_generales: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
    objetivos_especificos: '1. Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam sodales erat, at ultricies torquent nunc conubia sapien mus per metus, lobortis eros suspendisse vivamus sed nec cubilia vulputate elementum. 2. Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam sodales erat, at ultricies torquent nunc conubia sapien mus per metus, lobortis eros suspendisse vivamus sed nec cubilia vulputate elementum.',
    presupuesto: 1500000,
    //fecha_inicio: '',
    fecha_terminacion: '',
    documento: '80378556',
    lider: 'Wilmer Manuel Amezquita Obando'
    //estado_proyecto: '',
    //fase: ''
})

/*ProyectoAguas.save((err, document)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("Se guardó el documento.");
})
*/

/*const consultaProyectos = async () => {
    const proyectos = await proyectoModelo.find({})
    console.log(proyectos)
}

consultaProyectos();
*/

/*const consultaLider = async () => {
    const proyectos = await proyectoModelo.find({lider:'Wilmer Manuel Amezquita Obando'})
    console.log(proyectos)
}
consultaLider();

const consultaProyectos = async() => {
    return await proyectoModelo.find({})
}

api.get('/proyectos',(request, response)=>{
    consultaProyectos().then(function(resultado){
        response.json({proyectos: resultado})
    })
})
*/

const iniciarServidor = async() => {
    const api = express();
    const apollo = new ApolloServer({
        typeDefs,
        resolvers
    });
    await apollo.start()
    apollo.applyMiddleware({app:api})
    api.use((request, response)=>{
        response.send ('¡Ojo, revisar, hay un error!.')
    })
    api.listen('9092', () => console.log('Se inició.'))
}
iniciarServidor()