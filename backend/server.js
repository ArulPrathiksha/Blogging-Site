import express from 'express';
import { postsRoutes } from './routes/postsRoutes.js';
import { usersRoutes } from './routes/usersRoutes.js';
import mongoose, { mongo } from 'mongoose';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors(
  {
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods:["POST","GET"],
    credentials:true
  }
));
app.use('/file', express.static('files'));

app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);

mongoose
  .connect('mongodb://127.0.0.1:27017', { dbName: 'travelBlog' })
  .then(() => {
    console.log('Connected to DB ');
  })
  .catch((err) => console.log(err));

app.listen(4000, 'localhost', () => console.log('Listening to port 4000'));
