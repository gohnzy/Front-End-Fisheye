/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

let totalLikes = 0;
let price = 0;

// Affiche les photographes
function displayHeader(photographer) {
    const {name, city, country, tagline, portrait} = photographer;
    const picture = `/assets/photos/photographers/${portrait}`;

    const photographerHeader = document.querySelector('.photographerHeader');
    const btnModal = document.createElement("button");
    btnModal.classList.add("openModal");
    btnModal.setAttribute("onclick", "displayModal()");
    btnModal.innerText="Contactez-moi";
    const photographerInfos = document.createElement("div");
    photographerInfos.classList.add("photographer-infos");
    photographerInfos.innerHTML =
    `<h1>${name}</h1><br>
    <h2>${city}, ${country}</h2><br>
    <h3>${tagline}</h3>`;
    const portraitDiv = document.createElement("div");
    portraitDiv.classList.add("portraitDiv")
    const photographerPortrait = document.createElement("img");
    photographerPortrait.setAttribute("src", picture);
    photographerHeader.appendChild(photographerInfos);
    photographerHeader.appendChild(btnModal);
    portraitDiv.appendChild(photographerPortrait);
    photographerHeader.appendChild(portraitDiv);
}

// Création DOM menu de tri
function displayNav() {
    const insertAfter = document.querySelector(".photographerHeader")
    const sortMenu = document.createElement("div");
    sortMenu.classList.add("sortMenu");
    sortMenu.innerHTML = `<h4>Trier par</h4>
    <ul class="dropdownMenu">
        <li class="popularDiv">Popularité</li>
        <i class="fa-solid fa-chevron-up"></i>
        <li class="dateDiv">Date</li>
        <li class="titleDiv">Titre</a></li>
    </ul>`;
    insertAfter.parentNode.insertBefore(sortMenu, insertAfter.nextElementSibling);
}

const reRenderLikes = (target, media, operator) => {
    if (operator === '-') {
        target.innerHTML = `${media.likes} <i class="unliked fa-solid fa-heart"></i>`;
    }
    if (operator === '+') {
        target.innerHTML = `${media.likes} <i class="liked fa-solid fa-heart"></i>`;
    }
}

// Création du DOM pour le contenu de la page (medias)
function createMediaElement(data) {

    let {image, video, id, photographerId, title, date, likes} = data;
    let file;    

    if(image) {
        file = `assets/photos/${photographerId}/${image}`;
    } else if(video) {
        file = `assets/photos/${photographerId}/${video}`;
    } else {
        return null
    }

    const media = document.createElement("div");
    media.classList.add("medias");
    media.setAttribute("id", id);
    media.setAttribute("date", date);
    media.setAttribute("name", title);

    if(image) {
        const image = document.createElement("img");
        image.setAttribute("src", file);
        media.appendChild(image);
    }

    else if(video) {
        const video = document.createElement("video");
        video.setAttribute("controls", "")
        const source = document.createElement("source");
        source.setAttribute("src", file);
        video.appendChild(source);
        media.appendChild(video);
    }
    
    const mediaText = document.createElement("p");
    mediaText.classList.add("mediaDescription")
    const mediaTitle = document.createElement("h4");
    mediaTitle.innerText = `${title}`;
    mediaText.appendChild(mediaTitle);
    const mediaLikes = document.createElement("p");
    mediaLikes.classList.add("mediaLikes")
    mediaLikes.innerHTML = `${likes} <i class="unliked fa-solid fa-heart"></i>`

    mediaLikes.addEventListener("click", (event) => {
        if (mediaLikes.innerHTML === `${likes} <i class="unliked fa-solid fa-heart"></i>`) {
            data.likes += 1;
            totalLikes++
            reRenderLikes(mediaLikes, data, '+');
        }
        else {
            data.likes -= 1;
            totalLikes--
            reRenderLikes(mediaLikes, data, '-');
        }

        displayToolTip()
    })

    
    mediaText.appendChild(mediaLikes);
    media.appendChild(mediaText);
    
    return media
} 

// Création du DOM pour le tool tip
function displayToolTip() {
    const toolTip = document.querySelector(".toolTip");
    
    const toolTipLikes = document.createElement("div");
    toolTipLikes.classList.add("toolTipLikes");
    toolTipLikes.innerHTML = `${totalLikes} <i class="fa-solid fa-heart"></i>`;

    const toolTipPrice = document.createElement("p");
    toolTipPrice.classList.add("toolTipPrice");
    toolTipPrice.innerHTML = `${price}€ / jour`;
   
    toolTip.replaceChildren(toolTipLikes, toolTipPrice);
}


// Affiche le contenu de la page
function displayMediasContent(sortedMedias, photographer) {
    price = photographer.price;

    const photographerContent = document.querySelector(".photographerContent");

    sortedMedias.forEach(media => {
        photographerContent.appendChild( createMediaElement(media));
    });

    displayToolTip()
}

// Récupère les datas des photographes
const getPhotographersAndMedias = async () =>  {
    let response = await fetch('data/photographers.json');
    
    if(!response) {
        alert("Error 404");
        return {}
    }

    return response.json();
}

// Function principale regroupant l'appel à toutes les autres fonctions
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

    const medias = data.media.filter(p => String(p.photographerId) === String(photographer.id)).sort(function (a,b) {
        return b.likes - a.likes;
    }); 

    medias.forEach(m => {
        totalLikes += m.likes
    })



    displayHeader(photographer);
    displayMediasContent(medias, photographer);
    displayNav();
    contactForm(photographer);
    submitForm();
    
    // Sort events

    console.log("1",document.querySelector(".dropdownMenu :nth-child(1)"));
    console.log("2",document.querySelector(".dropdownMenu :nth-child(2)"));
    console.log("3",document.querySelector(".dropdownMenu :nth-child(3)"));

    const drpMenu = document.querySelector(".dropdownMenu")
    // Sorting by likes (popularity)
    const popularSort = document.querySelector(".popularDiv");
    popularSort.addEventListener("click", () => {
        const photographerContent = document.querySelector('.photographerContent');
        const menu = Array.prototype.slice.call(drpMenu.children)
        const nodes = Array.prototype.slice.call(photographerContent.childNodes);
        console.log(menu);
        nodes.sort(function (a, b) {
            const likesA = a.children[1].children[1].outerText;
            const likesB = b.children[1].children[1].outerText;
            return likesB - likesA
        })
       
        nodes.forEach(n => photographerContent.appendChild(n));

    })
    // Sorting by date 
    const dateSort = document.querySelector(".dateDiv");
    dateSort.addEventListener("click", () => {
        const photographerContent = document.querySelector('.photographerContent');
        const nodes = Array.prototype.slice.call(photographerContent.childNodes);

        nodes.sort(function (a, b) {
            const dateA = new Date(a.attributes.date.value);
            const dateB = new Date(b.attributes.date.value);
            return dateA - dateB
        })
       
        nodes.forEach(n => photographerContent.appendChild(n));
    })

    // Sorting by title
    const titleSort = document.querySelector(".titleDiv");
    titleSort.addEventListener("click", () => {
        const photographerContent = document.querySelector('.photographerContent');
        const nodes = Array.prototype.slice.call(photographerContent.childNodes);
        console.log(nodes);
        nodes.sort(function (a, b) {
            const titleA = a.attributes.name.value;
            const titleB = b.attributes.name.value;
            if (titleA < titleB) {
                return -1
            }

            return 0
        })
        console.log('sortedNodes', nodes);
        nodes.forEach(n => photographerContent.appendChild(n));
        
    })

}

init()
localStorage.clear()