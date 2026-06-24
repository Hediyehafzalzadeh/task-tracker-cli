import readline from 'node:readline';
import fs from 'node:fs';
import path from 'node:path';

const filePath = "tasks.json";

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath , "");
}


async function getTasksFromFile (){
    const existing = await fs.readFileSync(filePath , 'UTF-8');
    return existing.split("\n").filter(Boolean).map(line => JSON.parse(line));
}
 const makeID = async () => {

        const tasks = await getTasksFromFile();
        if(tasks.length === 0){
            return 1;
        }
        return tasks[tasks.length - 1].id + 1;
}
async function addTask(taskName) {
    const tasks = await getTasksFromFile();

    if(tasks.find(task => task.name === taskName)){
        console.log(`Task "${taskName}" already exists in the list.`);
        return null;
    }
  
    const task = {
        id : await makeID(),
        name : taskName ,
        status : 'todo' 

    }
    tasks.push(task);
    
    await fs.writeFileSync(filePath , tasks.map(task => JSON.stringify(task)).join("\n") + "\n");
    console.log(`Task "${taskName}" has been added to the list.(ID: ${task.id})`);

}

async function deleteTask(taskId){
    const tasks = await getTasksFromFile();
   
    const newTasks = tasks.filter(task => task.id !== Number(taskId))

    await fs.writeFileSync(filePath , newTasks.map(task => JSON.stringify(task)).join("\n") + "\n");
    console.log(`Task with ID "${taskId}" has been deleted from the list.`);

}

async function listTasks(sub) {
    const tasks = await getTasksFromFile();

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

async function updateTask(taskId , newTask , status){
    const tasks = await getTasksFromFile();
    let filteredTasks = tasks.filter(task => task.id !== Number(taskId) );

    filteredTasks.push({
        id : Number(taskId),
        name : newTask ? newTask : tasks.find(task => task.id === Number(taskId)).name,
        status : status ? status : tasks.find(task => task.id === Number(taskId)).status
    })

        await fs.writeFileSync(filePath , filteredTasks.map(task => JSON.stringify(task)).join("\n") + "\n");
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

