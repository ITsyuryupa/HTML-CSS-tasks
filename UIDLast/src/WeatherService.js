import { Status } from "./const.js";
import { weather } from "./mock/task.js";

export class WeatherService {
    #boardWeather = weather;
    
    getTasksByStatus(status){
        const tasksStatus = this.#boardWeather.filter(function(weather) {
            return task.status == status;
        });
        return(tasksStatus)
    }
    
    create({id='', city, weather}) {
        id = this.generateId();
        this.#boardWeather.push({id, city, weather});
        window.dispatchEvent(new CustomEvent("create-task"));//создание события create-task
    }

    /*
    deleteAll(){
        const filteredTasks = this.#boardTasks.filter(task => task.status !== 'bin');
        this.#boardTasks = filteredTasks;
    }
    */
    getTasks(){
        return this.#boardWeather;
    }
    generateId(){
        return crypto.randomUUID();
    }
}