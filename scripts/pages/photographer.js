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
function displayData(photographer) {
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
   console.log(medias);
    await displayData(photographer);
}

init();
function photographerPage(data) {

    const { name, id, city, country, tagline, price, portrait} = data;
    const picture = `/assets/photos/photographers/${portrait}`;

    function photographerPageDOM(){
        const photographerHeader = document.createElement("div");
        photographerHeader.classList.add("photographer-header")
        const btnModal = document.createElement("div")
        btnModal.innerHTML = `<button class="contact_button" onclick="displayModal()">Contactez-moi</button>`
        const photographerInfos = document.createElement("div")
        photographerHeader.classList.add("photographer-infos")
        photographerInfos.innerHTML =
        `<h1>${name}</h1><br>
        <h2>${city},${country}</h2><br>
        <h3>${tagline}</h3>`
        const photographerPortrait = document.createElement("img")
        photographerPortrait.setAttribute("src", picture)
        photographerHeader.appendChild(photographerInfos)
        photographerHeader.appendChild(btnModal)
        photographerHeader.appendChild(photographerPortrait)

        return (photographerHeader);
    }
    
    return {photographerPageDOM}

}