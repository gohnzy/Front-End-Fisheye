/* eslint-disable no-undef */
import { PhotographerFactory } from '../factories/photographerFactory.js';

async function init() {

    // Nouvelle instance de la class
    const photographerFactory = new PhotographerFactory();

    // DOM Elements 
    const photographersSection = document.querySelector(".photographer_section");

    // Class : fonction principale
    await photographerFactory.init();

    photographerFactory.displayData(photographersSection);
    let index = 1;

    document.querySelectorAll(".divClick").forEach(photographer => photographer.setAttribute("tabindex", index++));
}

init();


