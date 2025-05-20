import express from 'express'
import { dbConnection } from './database/dbconnection.js'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './src/modules/user/user.router.js'

const app = express()
const port = 5000

dotenv.config()
app.use(cors())
app.use(express.json())


app.use('/api/v1', userRouter)


dbConnection()
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

