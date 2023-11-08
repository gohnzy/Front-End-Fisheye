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

function displayMedia(medias) {
    medias.forEach(m => {
       console.log(m); // create medias elements
    });

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
    displayData(photographer);
    displayMedia(medias);
    contactForm(photographer)
    submitForm()
}

init();
function photographerPage(data) {

    const { name, city, country, tagline, portrait} = data;
    const picture = `/assets/photos/photographers/${portrait}`;

    function photographerPageDOM(){
        const photographerHeader = document.createElement("div");
        photographerHeader.classList.add("photographer-header")
        const btnModal = document.createElement("button")
        btnModal.classList.add("openModal")
        btnModal.setAttribute("onclick", "displayModal()")
        btnModal.innerText="Contactez-moi"
        const photographerInfos = document.createElement("div")
        photographerInfos.classList.add("photographer-infos")
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

