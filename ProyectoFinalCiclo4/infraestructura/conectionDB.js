const mongoose = require('mongoose')

const urlDB = 'mongodb+srv://Ana:Anita@misiontic.tlc6o.mongodb.net/ProyectoCiclo4-Desarrollo?retryWrites=true&w=majority'
mongoose.connect(urlDB)
const mongoDB = mongoose.connection;
mongoDB.on('open', _ =>{
    console.log("Conectado a la bd")
})