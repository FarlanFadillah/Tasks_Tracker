import express from 'express'
import * as taskC from '../controllers/TaskC.mjs'

const taskRouter = express.Router();

taskRouter.route('/').get(taskC.getAllTasks).post(taskC.addTask)
taskRouter.delete('/:task_id', taskC.deleteTask)
taskRouter.patch('/edit/:task_id', taskC.updateTask);


export {taskRouter};