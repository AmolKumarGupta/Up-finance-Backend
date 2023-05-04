import express, { type NextFunction, type Express, type Request, type Response } from 'express'
import * as dotenv from 'dotenv'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import session from 'express-session'
import Logger from './utils/Logger'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'

import AuthRouter from './routes/auth'

dotenv.config()
const app: Express = express()
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
  })
)

app.get('/', (req: Request, res: Response) => {
  res.send('html')
})
app.use('/users', AuthRouter)

app.use((err: { message: string }, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send('Server Error!')
  Logger.error(`${req.method} ${req.originalUrl}: ${err.message}`)
})

mongoose.connect(process.env.MONGO_URI as string).then(() => {
  app.listen(process.env.PORT)
}).catch((err: Error) => {
  Logger.error(err.message)
})
