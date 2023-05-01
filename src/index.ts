import express, { type Express, type Request, type Response } from 'express'
import * as dotenv from 'dotenv'

dotenv.config()
const app: Express = express()

app.get('/', (req: Request, res: Response) => {
  res.send('html')
})

app.listen(process.env.PORT, () => {
  console.log('server is listening')
})
