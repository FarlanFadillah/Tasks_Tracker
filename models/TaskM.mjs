import sqlite3 from 'sqlite3'

let db = new sqlite3.Database('./db/main.sqlite3', (err) => {
    if(err){
        console.log(err.message);
    }
    else{
        console.log('Database created');
    }
});

db.serialize(() =>{
    
    db.run(`CREATE TABLE IF NOT EXISTS task (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, 
        status INT(1), createdAt DATETIME, updatedAt DATETIME)`, (err) =>{
            if (err) {
                console.log(err.message);
            }
            else {
                console.log("Table Created");
            }
        });
});

export function addTask(description, res){
    db.run(`INSERT INTO task (description, status, createdAt, updatedAt) VALUES (?, ?, datetime('now', 'localtime'), datetime('now', 'localtime'))`, 
    [description, 0], (err) =>{
        if (err) return console.log(err);
        else res.status(200).json({success : true, task : description});
    });
}

export function getAllTasks(res){
    db.all(`SELECT * FROM task`, [], (err, rows) =>{
        if(err)
        {
            return res.status(400).json({success : false, msg : err.message});
        }

        res.status(200).json({success : true, data : rows});
    });
}

export function deleteTask(id, res){
    db.run(`DELETE FROM task WHERE id = ?`, [id], (err) => {
        if(err) return res.status(400).json({success : false, msg : err.message});
        res.status(200).json({success : true, msg : "Task Deleted"});
    });
}

export function updateTaskDescription(id, new_description, res)
{
    db.run(`UPDATE task SET description = ?, updatedAt = datetime('now', 'localtime') where id = ?`, [new_description, id], (err)=>{
        if(err) return res.status(400).json({success: false, msg : err.message});

        res.status(200).json({success: true, msg : "Task Description Updated"});
    });
}


export function updateTaskStatus(id, new_status, res){
    db.run(`UPDATE task SET status = ?, updatedAt = datetime('now', 'localtime') where id = ?`, [Number(new_status), id], (err)=>{
        if(err) return res.status(400).json({success: false, msg : err.message});

        res.status(200).json({success: true, msg : "Task Status Updated"});
    });
}
