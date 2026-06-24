import prompts from "prompts";
import fs from "node:fs";
import path from 'path'

async function main () {
    const file = path.join('tasks.json');
    const chosenMethod = await prompts (
        {
        type: 'select',
        name: 'option',
        message: 'choose one of the following options:',
        choices: [
            { title: 'add', value: 'add' },
            { title: 'list', value: 'list' },
            { title: 'delete', value: 'delete' }
        ]
    }
    
)




    async function addTasks (){
        const taskToAdd = await prompts({
            type: 'text',
            name: 'taskToAdd',
            message: 'Enter the task you want to add:'
        });

        const task = {
            name : taskToAdd.taskToAdd ,
            status : 'pending'
        }

       
        fs.writeFileSync(file, JSON.stringify(task)+ '\n', { flag: 'a' });

        console.log(`Task "${taskToAdd.taskToAdd}" has been added to the list.`);


    }
     async function  deleteTasks(){
        const tasksList = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf-8')) : [];


        const taskToDelete = await prompts({
              type: 'text',
            name: 'taskToDelete',
            message: 'Enter the task you want to delete:'

        })

        tasks = tasksList.filter(task => task.name !== taskToDelete.taskToDelete )
        fs.writeFileSync(file, JSON.stringify(tasks) + '\n', { flag: 'a' });
        console.log(`Task "${taskToDelete.taskToDelete}" has been deleted from the list.`);

    }
    function listTasks(){
        const tasksList = JSON.parse(fs.readFileSync(file, 'utf-8').split('\n').filter(Boolean));

        console.log('name + status');
        for ( const task of tasksList) {
            console.log(task.name + '  ' + task.status)

        }

        
    }




    switch (chosenMethod.option) {
        case "add" :
            addTasks();
            break;
        case "list" :
            listTasks();
            break;
        case "delete" :
            deleteTasks();
            break;
    }

}

 main();