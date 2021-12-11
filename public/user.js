const mongoose      = require('mongoose');
const bcrypt        = require('bcrypt');

const saltRounds    = 10;

const usuario    = new mongoose.Schema({
    nombre_completo: { type: String, required: true },
    identificacion: { type: Number, unique: true, required: true },
    tipo_usuario: { type: String, required: true },
    estado: { type: String, default: "Inactivo" },
    correo: { type: String, required: true, unique:true },
    clave: { type: String, required: true }
});

usuario.pre('save', function(next){
    if(this.isNew || this.isModified('clave')){

        const document = this;
        
        bcrypt.hash(document.clave, saltRounds, (err, hashedPassword) => {
            if(err){
                next(err);
            }else{
                document.clave = hashedPassword;
                next();
            }
        });
    }else{
        next();
    }
});

usuario.methods.isCorrectClave = function(clave, callback){
    bcrypt.compare(clave, this.clave, function(err, same){
        if(err){
            callback(err);
        }else{
            callback(err, same);
        }
    });
}

module.exports = mongoose.model('usuarios', usuario);