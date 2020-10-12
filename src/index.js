import dotenv from 'dotenv'
dotenv.config()
import app from './app'
import './database'
app.listen(3000)
console.log('Server listen on port 3000')