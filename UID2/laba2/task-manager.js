// Импорт функций readFile и writeFile из модуля 'fs' для работы с файловой системой
import { readFile, writeFile } from 'node:fs';

// Импорт класса Task из файла './task.js'
import { Task } from './task.js';

// Определение класса TaskManager
export class TaskManager {
    constructor() {
        this.path = "./tasks.json"; // Путь к файлу с задачами
    }

    // Метод для загрузки задач из файла
    loadTasks() {
        return new Promise((resolve, reject) => {
            // Чтение данных из файла
            readFile(this.path, 'utf8', (err, data) => {
                if (err) {
                    console.error("Ошибка чтения файла с задачами", err);
                    reject(err); // В случае ошибки, отклоняем обещание
                    return;
                }
                // Парсинг данных JSON
                const tasksData = JSON.parse(data);

                // Преобразование каждого элемента в объект Task и добавление в массив задач
                const tasks = tasksData.map(task => new Task(task.id, task.description, task.status));

                resolve(tasks); // Разрешаем обещание с массивом задач
            });
        });
    }

    // Метод для вывода задач в консоль
    printTasks(tasks) {
        if (!tasks || tasks.length === 0) {
            console.log("Нет задач, которые можно было бы напечатать.");
            return;
        }

        tasks.forEach(task => {
            task.ToString(); // Вызов метода ToString() для каждой задачи
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
            });
        });
    }

    // Метод для добавления новой задачи
    async addTask(task) {
        try {
            // Загрузка текущих задач
            const tasks = await this.loadTasks();

            // Добавление новой задачи в массив
            tasks.push(task);

            // Сохранение обновленного списка задач в фаил
            await this.saveTasks(tasks);

            console.log("Задача успешно добавлена.");
        } catch (error) {
            console.error("Ошибка добавления задачи: ", error);
        }
    }

    // Метод для удаления задачи по её ID
    async deleteTask(taskId) {
        try {
            // Загрузка текущих задач
            const tasks = await this.loadTasks();

            // Поиск задачи по ID
            const index = tasks.findIndex(task => task.id === taskId);

            if (index !== -1) {
                // Удаление задачи из массива
                tasks.splice(index, 1);

                // Сохранение обновленного списка задач
                await this.saveTasks(tasks);

                console.log("Задача успешно удалена.");
            } else {
                console.log("Задача не найдена.");
            }
        } catch (error) {
            console.error("Ошибка при удалении задачи: ", error);
        }
    }
}
