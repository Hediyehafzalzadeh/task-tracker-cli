# Simple CLI Task Tracker

A simple command-line task tracker built with Node.js.

## Usage

Run the app with:

```bash
node index.js <command>
```

## Commands

### Add a task

```bash
node index.js add "task name"
```

Adds a new task.

### Delete a task

```bash
node index.js delete 1
```

Deletes the task with ID `1`.

### Update a task

```bash
node index.js update 1 "new task name"
```

Updates the task with ID `1` and changes its name.

### Mark a task as done

```bash
node index.js mark-done 1
```

Marks the task with ID `1` as `done`.

### Mark a task as in progress

```bash
node index.js mark-in-progress 1
```

Marks the task with ID `1` as `in-progress`.

### Mark a task as todo

```bash
node index.js mark-todo 1
```

Marks the task with ID `1` as `todo`.

### List all tasks

```bash
node index.js list
```

Shows all tasks.

### List tasks by status

```bash
node index.js list todo
```

Shows all tasks with `todo` status.

```bash
node index.js list done
```

Shows all tasks with `done` status.

```bash
node index.js list in-progress
```

Shows all tasks with `in-progress` status.


node index.js list done -> To show tasks with "done" status 

node index.js list in-progress -> To show tasks with "in progress" status 


