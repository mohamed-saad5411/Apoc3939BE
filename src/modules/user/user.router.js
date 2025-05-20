import express from 'express'
import { createCheckOutSession, register, users } from './user.controller.js'



let userRouter = express.Router()


userRouter.get('/users', users)
userRouter.post('/register', register)
userRouter.post('/register/create-checkout-session/:id', createCheckOutSession)



export default userRouter