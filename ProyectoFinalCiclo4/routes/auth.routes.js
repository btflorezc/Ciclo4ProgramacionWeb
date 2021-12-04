const {Router} = require ('express')
const signIn = require('../controllers/auth.controller')

const route = Router();

route.use((request, response, next) =>{

next()
})
route.post('/login', signIn)

module.exports = route