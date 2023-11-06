//Mettre le code JavaScript lié à la page photographer.html

/* eslint-disable no-undef */

// Récupère les datas des photographes
async function getPhotographersAndMedias() {
    const response = await fetch('data/photographers.json');
    if (!response) {
        return {};
    }

    return response.json();
}

// Affiche les photographes
function displayData(photographer, medias) {
    const sidePages = document.querySelector(".mainSide");
    const photographPage = photographerPage(photographer);
    const photographPageDOM = photographPage.photographerPageDOM();
    sidePages.appendChild(photographPageDOM);
}

async function init() {
    const id = new URLSearchParams(window.location.search).get('id');
    const data = await getPhotographersAndMedias();

    if (!data.photographers) {
        location.href = 'notFound.html';
    }

    const photographer = data.photographers.find(p => String(p.id) === id);

    if (!photographer) {
        location.href = 'notFound.html';
    }

    const medias = data.media.filter(p => String(p.photographerId) === String(photographer.id)); 
    console.log(medias)

    await displayData(photographer);
}

init();
