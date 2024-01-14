import express from 'express';
import bodyParser from 'body-parser';
import authRoute from './Src/route/auth';
import userRoute from './Src/route/user';
import taskRoute from './Src/route/task';
import './Src/database/index';
import cors from "cors"
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api', userRoute);
app.use('/api', taskRoute);

app.listen(port, () => {
  console.log('Node.js running on port', port);
});

