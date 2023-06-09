import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import Joi from 'joi'
import cors from 'cors';
import dotenv from 'dotenv'
import AppRouter from './routes';
import connectDB from './config/database';
import helmet from 'helmet'
dotenv.config()

const app = express();
app.use(helmet())
const router = new AppRouter(app);
// Connect to MongoDB
connectDB();

// console.log(process.env.CLIENT_ROOT_URL);

// Express configuration
app.use(cors({
  origin: ["https://lazy-todo-app.netlify.app",process.env.CLIENT_ROOT_URL],
  methods: ["GET", "POST", "OPTIONS", "PATCH", "PUT", 'DELETE'],
  credentials: true,
  exposedHeaders: ['Authorization']
}))
app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.init();

const port = app.get('port');


// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  if (err instanceof Joi.ValidationError) {
    res.status(400).send(err.message)
  }
  if (!res.statusCode) res.status(500)
  res.send(err.message || 'Internal error')
})

// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

export default server
