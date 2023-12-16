

import { AbstractComponent } from './AbstractComponent.js';

function createWeatherComponentTemplate(status) {
    return (
        `<h3 id="weather">${status}
        </h3>`
    );
}

export class WeatherComponent extends AbstractComponent {
    #status = null;
    #weatherService=null;
    constructor(status = "Погода"){
        super();
        this.#status = status;
        window.addEventListener("change_city", ()=> this.#reRenderWeather(this.#status,  this.#weatherService));
    }   
    #reRenderWeather(status, taskService){

        const weatherWidgetContainer = document.querySelector('.weather-widget');
        render(new ListComponent(), weatherWidgetContainer, RenderPosition.AFTERBEGIN);

        
        const weatherContainer = document.querySelector('.weather-result');
        render(new WeatherComponent(), weatherContainer, RenderPosition.BEFOREEND);
        
    }

    getTemplate(status) {
        return createWeatherComponentTemplate(this.#status);
    }
    /*
    formSubmitHandler(evt) {
        evt.preventDefault();
        const inputElement = this.getElement().querySelector(`#add-task`);
        const title = inputElement.value.trim();
        this.#weatherService.create({ title });
        inputElement.value = ``;
    }
    */
}

  

