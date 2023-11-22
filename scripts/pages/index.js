/* eslint-disable no-undef */
import { PhotographerFactory } from '../factories/photographerFactory.js';

async function init() {
    const photographerFactory = new PhotographerFactory();
    const photographersSection = document.querySelector(".photographer_section");

    await photographerFactory.init();

    photographerFactory.displayData(photographersSection);
}

init();


