

import { AbstractComponent } from './AbstractComponent.js';

function createListComponentTemplate() {
    return (

        `<select id="city-select">
        <option value="">Выберите город</option>
        <option value="London">Лондон</option>
        <option value="Paris">Париж</option>
        <option value="Berlin">Берлин</option>
        </select>`
    );
}

export class ListComponent extends AbstractComponent {

    getTemplate() {
        return createListComponentTemplate();
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

  

