import * as taskModel from '../models/TaskM.mjs'


export function getAllTasks(req, res) {
    taskModel.getAllTasks(res);
}
export function addTask (req, res){
    const {task_description} = req.body;

    if(!task_description) 
    {
        return res.status(400).json({success : false, msg : "Please provide the description of your task"});
    }
    taskModel.addTask(task_description, res);
}

export function deleteTask(req, res){
    const {task_id} = req.params;
    if(!task_id) return console.log("Please provide the task id that you want to delete");
    taskModel.deleteTask(task_id, res);
}

export function updateTask(req, res){
    const {task_id} = req.params;
    const {new_description, new_status} = req.body;

    if(!task_id){
        return res.status(400).json({success : false, msg : "Task id undefined"});
    }
    if(new_description) taskModel.updateTaskDescription(task_id, new_description, res);
    else if(new_status) taskModel.updateTaskStatus(task_id, new_status, res);
    
}

