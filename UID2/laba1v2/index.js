
import chalk from 'chalk';


// Создаем массив с задачами
const tasks = [
    {
        id: 1,
        description: 'Сделать упражнение по программированию',
        status: 'выполнено'
    },
    {
        id: 2,
        description: 'Подготовить презентацию по проекту',
        status: 'в процессе'
    },
    {
        id: 3,
        description: 'Прочитать главу из учебника',
        status: 'не начато'
    }
];

// Функция для вывода информации о задачах в консоль с разными цветами
function printTasks(tasks) {
    tasks.forEach(task => {
        // Если задача выполнена, выводим зеленым цветом
        if (task.status === 'выполнено') {
            console.log(chalk.green(`Задача ${task.id}: ${task.description} (${task.status})`));
        }
        // Если задача в процессе выполнения, выводим желтым цветом
        else if (task.status === 'в процессе') {
            console.log(chalk.yellow(`Задача ${task.id}: ${task.description} (${task.status})`));
        }
        // Если задача не начата, выводим красным цветом
        else {
            console.log(chalk.red(`Задача ${task.id}: ${task.description} (${task.status})`));
        }
    });
}

// Вызов функции для вывода информации о задачах
printTasks(tasks);
