import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import {createRoles} from './libs/initialSetup'

const app = express()
createRoles()
import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'

app.set('pkg', pkg)
app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

app.use('/api/products', productsRoutes)
app.use('/api/auth', authRoutes)

export default app