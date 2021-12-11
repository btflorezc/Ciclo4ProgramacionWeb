const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const usuario = require('./public/user');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

const mongo_uri = 'mongodb+srv://juan:admin@minticapp.f0y6b.mongodb.net/MinticProyecto?retryWrites=true&w=majority';

mongoose.connect(mongo_uri, function (err) {
    if (err) {
        throw err;
    } else {
        console.log(`Successfully connected to ${mongo_uri}`);
    }
});

app.post('/register', (req, res) => {
    const { nombre_completo, identificacion, correo, clave, tipo_usuario } = req.body;

    console.log (req);

    const user = new usuario({ nombre_completo, identificacion, correo, clave, tipo_usuario });

    user.save(err => {
        console.log("Guardando usuario");
        if (err) {
            console.log(err);
            res.status(500).send('Error al registrar al usuario');
        } else {
            res.status(200).send('Usuario registrado');
        }
    });
});
app.post('/authenticate', (req, res) => {
    const { correo, clave } = req.body;

    usuario.findOne({ "correo": correo }, (err, user) => {
        if (err) {
            res.status(500).send('Error al autenticar al usuario');
        } else if (!user) {
            res.status(500).send('El usuario no existe');
        } else {
            user.isCorrectClave(clave, (err, result) => {
                if (err) {
                    res.status(500).send('Error al autenticar al usuario');
                } else if (result) {
                    res.status(200).send('Usuario autenticado correctamente');
                } else {
                    res.status(500).send('Usuario y/o contraseña incorrecta');
                }
            });
        }
    });
});

app.listen(4001, () => {
    console.log('server started')
})
module.exports = app;