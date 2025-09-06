import express from 'express'
import cors from 'cors'
import taskRouter from '../routes/TaskR.mjs'
import morgan from 'morgan';

const app = express();

app.use(cors());

app.use(morgan('tiny'))

app.use(express.json());

app.use('/api/tasks', taskRouter);

app.listen(5000, (err) =>{
    console.log("Server listening at port 5000");
});
