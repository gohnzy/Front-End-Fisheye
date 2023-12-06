/* eslint-disable no-undef */
import { PhotographerFactory } from '../factories/photographerFactory.js';

async function init() {
    const photographerFactory = new PhotographerFactory();
    const photographersSection = document.querySelector(".photographer_section");

    await photographerFactory.init();

    photographerFactory.displayData(photographersSection);
    let index = 1;

    document.querySelectorAll(".divClick").forEach(photographer => photographer.setAttribute("tabindex", index++));
}

init();


