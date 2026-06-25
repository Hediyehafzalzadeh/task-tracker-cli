import readline from 'node:readline';
import fs from 'node:fs';
import path from 'node:path';

const filePath = "tasks.json";

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath , "");
}


 function getTasksFromFile (){
    const existing =  fs.readFileSync(filePath , 'UTF-8');
    return existing.split("\n").filter(Boolean).map(line => JSON.parse(line));
}
 const makeID =  () => {

        const tasks =  getTasksFromFile();
        if(tasks.length === 0){
            return 1;
        }
        return tasks[tasks.length - 1].id + 1;
}
 function addTask(taskName) {

    const tasks =  getTasksFromFile();

    if(tasks.find(task => task.name === taskName)){
        console.log(`Task "${taskName}" already exists in the list.`);
        return null;
    }
  
    const task = {

        id :  makeID(),
        name : taskName ,
        description : '',
        status : 'todo' ,
        createdAt : new Date().toISOString(),
        updatedAt : new Date().toISOString()

    }


    tasks.push(task);
    
     fs.writeFileSync(filePath , tasks.map(task => JSON.stringify(task)).join("\n") + "\n");
    console.log(`Task "${taskName}" has been added to the list.(ID: ${task.id})`);

}

 function deleteTask(taskId){

    const tasks =  getTasksFromFile();
   
    const newTasks = tasks.filter(task => task.id !== Number(taskId))

     fs.writeFileSync(filePath , newTasks.map(task => JSON.stringify(task)).join("\n") + "\n");
    console.log(`Task with ID "${taskId}" has been deleted from the list.`);

}

 function listTasks(sub) {

    const tasks =  getTasksFromFile();

    switch (sub) {

        case null : 
            console.log(tasks);
            break;

        case 'done':
            console.log(tasks.filter(task => task.status === "done"));
            break ;
        
        case 'todo':
            console.log(tasks.filter(task => task.status === "todo"));
            break ;
        case 'in-progress':
            console.log(tasks.filter(task => task.status === "in-progress"));
            break ;
        default :
            console.log('invalid request')


    }

}

 function updateTask(taskId , newTask , status){
    const tasks =  getTasksFromFile();
    let filteredTasks = tasks.filter(task => task.id !== Number(taskId) );

    filteredTasks.push({
        id : Number(taskId),
        name : newTask ? newTask : tasks.find(task => task.id === Number(taskId)).name,
        status : status ? status : tasks.find(task => task.id === Number(taskId)).status,
        createdAt : tasks.find(task => task.id === Number(taskId)).createdAt,
        updatedAt : new Date().toISOString()
    })

         fs.writeFileSync(filePath , filteredTasks.map(task => JSON.stringify(task)).join("\n") + "\n");
        console.log(`Task with ID "${taskId}" has been updated.`);



}

const command = process.argv[2];

switch (command) {
    case 'add':
        addTask(process.argv[3]);
        break;
    case 'delete' :
        deleteTask(process.argv[3]);
        break;
    case 'list':
        if(process.argv[3] === undefined){
            listTasks(null);
        } else {
            listTasks(process.argv[3]);
        }
        break;
    case 'update':
        updateTask(process.argv[3], process.argv[4] , "todo");
        break;
    case 'mark-in-progress':
        updateTask(process.argv[3], null , "in-progress");
        break;
    case 'mark-done' :
        updateTask(process.argv[3], null , "done");
        break ;
    default :
        console.log('invalid request');

}

