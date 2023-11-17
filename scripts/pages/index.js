/* eslint-disable no-undef */

async function getPhotographers() {
    let response = await fetch('data/photographers.json');
        if(!response) {
            alert("Error 404");
            return {}
        }
    return response.json()
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    
        photographers.forEach(photographer => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    await displayData(photographers);
    
}
    
init();

