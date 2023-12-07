import express from 'express'
import * as dotenv from "dotenv"
import cors from "cors"
import mongoose from 'mongoose'
import businessRouter from "./routes/businesses.js"
import userRouter from './routes/users.js'
dotenv.config()
const port = 3000

const app = express()
app.use(cors())
app.use(express.json());

app.use('/businesses', businessRouter)
app.use('/user', userRouter)

async function connect() {
  try {
    await mongoose.connect(String(process.env.DB_URL));
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})