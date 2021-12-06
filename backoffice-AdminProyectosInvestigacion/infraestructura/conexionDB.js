const mongoose = require('mongoose')

const urlDB = 'mongodb+srv://btflorezc84:admin@udea.ndtx7.mongodb.net/AdminProyectosInvestigacion?retryWrites=true&w=majority'
mongoose.connect(urlDB)

const mongoDB = mongoose.connection;
mongoDB.on('open', _ =>{
    console.log("Estoy conectado a la base de datos.")
})