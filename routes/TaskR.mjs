import express from 'express'
import * as taskC from '../controllers/TaskC.mjs'

const taskRouter = express.Router();

taskRouter.get('/', taskC.getAllTasks).post('/', taskC.addTask).delete('/:task_id', taskC.deleteTask)
.put('/edit/:task_id', taskC.updateTask);

export default taskRouter;