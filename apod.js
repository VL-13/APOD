import {dateFormatter, renderApp, addPictureOfDay} from './utils.js';

export function Apod(id){
    this.id = id;
    this.date = undefined;
    let body = document.body;
    this.container = document.createElement('div');
    this.container.setAttribute('id', this.id);

    this.dateFormatter = dateFormatter;
    this.renderApp = renderApp;
    this.addPictureOfDay = addPictureOfDay;
    this.addPictureOfDay();
    
    body.append(this.container);
}