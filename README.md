# Simple CLI Task Tracker

A simple command-line task tracker built with Node.js to manage tasks from the terminal.

This project was built as part of the [Task Tracker project on roadmap.sh](https://roadmap.sh/projects/task-tracker).

## Features

* Add, update, and delete tasks
* Mark tasks as `todo`, `in-progress`, or `done`
* List all tasks
* Filter tasks by status
* Store tasks in a JSON file

## Usage

Run the application with:

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

Updates the task with ID `1`.

### Mark a task as done

```bash
node index.js mark-done 1
```

Marks the task as `done`.

### Mark a task as in progress

```bash
node index.js mark-in-progress 1
```

Marks the task as `in-progress`.

### Mark a task as todo

```bash
node index.js mark-todo 1
```

Marks the task as `todo`.

### List all tasks

```bash
node index.js list
```

Shows all tasks.

### List tasks by status

```bash
node index.js list todo
```

Shows tasks with `todo` status.

```bash
node index.js list done
```

Shows tasks with `done` status.

```bash
node index.js list in-progress
```

Shows tasks with `in-progress` status.

## Task Properties

Each task includes:

* `id` — unique task ID
* `description` — task description
* `status` — `todo`, `in-progress`, or `done`
* `createdAt` — creation timestamp
* `updatedAt` — last update timestamp

## Project Source

This project is based on the Task Tracker challenge from [roadmap.sh](https://roadmap.sh/?utm_source=chatgpt.com). The original project brief is available here: [Task Tracker project page](https://roadmap.sh/projects/task-tracker).

