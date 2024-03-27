import { TaskManager } from "./task-manager.js";
import { Task } from "./task.js";

async function main() {
    const taskManager = new TaskManager();
    const newTask = new Task("5", "test5", "backlog");

    try {
        console.log("Изначальные задачи");
        const initialTasks = await taskManager.loadTasks();
        taskManager.printTasks(initialTasks);
        
        // await taskManager.addTask(newTask);
        // const tasksAfterAdding = await taskManager.loadTasks();
        // taskManager.printTasks(tasksAfterAdding);

        await taskManager.deleteTask("5");
        const tasksAfterDeleting = await taskManager.loadTasks();
        taskManager.printTasks(tasksAfterDeleting);
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
