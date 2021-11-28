const {Router} = require ('express')
const signIn = require('../controllers/auth.controller')

const route = Router();

route.post('/login', signIn)

module.exports = route