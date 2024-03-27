// Импорт функций readFile и writeFile из модуля 'fs' для работы с файловой системой
import { readFile, writeFile } from 'node:fs';

// Импорт класса Task из файла './task.js'
import { Task } from './task.js';

// Импорт класса EventEmitter из модуля 'events' для создания пользовательских событий
import { EventEmitter } from 'events';

// Определение класса TaskManager, который наследуется от EventEmitter
export class TaskManager extends EventEmitter {
    constructor() {
        super(); // Вызов конструктора родительского класса

        this.path = "./tasks.json"; // Путь к файлу с задачами
    }

    // Метод для загрузки задач из файла
    loadTasks() {
        return new Promise((resolve, reject) => {
            const path = "./tasks.json"; // Путь к файлу с задачами
            readFile(path, 'utf8', (err, data) => {
                if (err) {
                    console.error("Ошибка чтения файла с задачами", err);
                    reject(err); // В случае ошибки, отклоняем обещание
                    return;
                }
                // Преобразование данных из файла в объект JavaScript
                const tasksData = JSON.parse(data);
                // Преобразование каждого элемента в объект Task и сохранение в массиве tasks
                const tasks = tasksData.map(task => new Task(task.id, task.description, task.status));
                // Разрешение обещания с массивом задач
                resolve(tasks);
                // Генерация события 'tasksLoaded' с массивом загруженных задач
                this.emit('tasksLoaded', tasks);
            });
        });
    }

    // Метод для вывода задач в консоль
    printTasks(tasks) {
        if (!tasks || tasks.length === 0) {
            console.log("Нет задач, которые можно было бы напечатать.");
            return;
        }
        // Перебор задач и вызов метода ToString() для каждой задачи
        tasks.forEach(task => {
            task.ToString();
        });
    }

    // Метод для сохранения задач в файл
    async saveTasks(tasks) {
        return new Promise((resolve, reject) => {
            // Преобразование массива задач в формат JSON
            const tasksJson = JSON.stringify(tasks, null, 2);
            // Запись данных в файл
            writeFile(this.path, tasksJson, 'utf8', (err) => {
                if (err) {
                    console.error("Ошибка записи задачи в файл: ", err);
                    reject(err); // В случае ошибки, отклоняем обещание
                    return;
                }
                resolve(); // Разрешаем обещание
                // Генерация события 'tasksSaved' после успешной записи задач в файл
                this.emit('tasksSaved', tasks);
            });
        });
    }

    // Метод для добавления новой задачи
    async addTask(task) {
        try {
            // Загрузка текущего списка задач
            const tasks = await this.loadTasks();
            // Добавление новой задачи в массив задач
            tasks.push(task);
            // Сохранение обновленного списка задач
            await this.saveTasks(tasks);
            
            // Генерация события 'taskCreated' после успешного добавления задачи
            this.emit('taskCreated', task);
        } catch (error) {
            console.error("Ошибка добавления задачи: ", error);
        }
    }

    // Метод для удаления задачи по ее ID
    async deleteTask(taskId) {
        try {
            // Загрузка текущего списка задач
            const tasks = await this.loadTasks();
            // Поиск индекса задачи по ее ID
            const index = tasks.findIndex(task => task.id === taskId);
            if (index !== -1) {
                // Удаление задачи из массива задач
                tasks.splice(index, 1);
                // Сохранение обновленного списка задач
                await this.saveTasks(tasks);
                // Генерация события 'taskDeleted' после успешного удаления задачи
                this.emit('taskDeleted', taskId);
            } else {
                console.log("Задача не найдена.");
            }
        } catch (error) {
            console.error("Ошибка при удалении задачи: ", error);
        }
    }
}
