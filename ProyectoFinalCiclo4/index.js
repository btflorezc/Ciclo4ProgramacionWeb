require('./infraestructura/conectionDB')
const { validarToken, admin, estudiante } = require('./middleware/authjwt')
const jwt = require('jsonwebtoken')

const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./typeDef')
const resolvers = require('./resolvers')
const authRoute = require('./routes/auth.routes')
const { request } = require('express')

const key = 'CLAVEDIFICIL';
const iniciarServidor = async () => {
    const api = express();
    const apollo = new ApolloServer(
        {
            typeDefs,
            resolvers,
            context: ({ req }) => {
                const token = request.headers.authorization;
                try {
                    const tipo_usuario = jwt.verify(token, key)
                    if (tipo_usuario) {
                        rol = tipo_usuario.role
                        return {rol}
                    }
                } catch (error) {
                    console.log(error)
                }

            }
        });
    await apollo.start()
    apollo.applyMiddleware({ app: api })
    /* api.use((request, response) => {
        response.send('Hola')
    }) */
    api.use(express.json())
    api.use('/api', authRoute)
    api.get('/api/dashboard/admin', [validarToken, admin], (request, response) => {
        response.json("Soy el dashboard")
    })
    api.get('/api/dashboard/estudiante', [validarToken, estudiante], (request, response) => {
        response.json("Soy el dashboard")
    })
    api.listen('9090', () => console.log('Inició servidor'))

}
iniciarServidor()

