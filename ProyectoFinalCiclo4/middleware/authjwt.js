const jwt = require('jsonwebtoken')
const key = 'CLAVEDIFICIL'

const validarToken = (request, response, next) => {
    const token = request.headers['authorization']
    if (!token) {
        return response.status(401).json({ response: "Token inválido" })
    }
    try {
        const perfil = jwt.verify(token, key)
        if (perfil) {
            request.perfil = perfil.role
            next();
            return
        }
        return response.status(401).json({ response: "Token inválido" })
    }catch(error){
        return response.status(401).json({ response: "Token inválido" })
    }
    
}
const admin = (request, response, next)=>{
    if(request.perfil != "Administrador"){
        return response.status(403).json({ response: "Permisos insuficientes" })
    }
    next();
}

const estudiante = (request, response, next)=>{
    if(request.perfil != "Estudiante"){
        return response.status(403).json({ response: "Permisos insuficientes" })
    }
    next();
}

module.exports = {
    validarToken,
    admin,
    estudiante
}