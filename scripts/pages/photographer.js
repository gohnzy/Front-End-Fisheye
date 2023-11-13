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
function displayHeader(photographer) {
    
    const sidePages = document.querySelector(".mainSide");
    const photographPageHeader = photographerPageHeader(photographer);
    const photographerHeader = photographPageHeader.photographerHeader();
    sidePages.appendChild(photographerHeader);
}

function displayContent(medias, photographer) {
    const {price} = photographer;
    const {likes} = medias;

    const sidePages = document.querySelector(".mainSide");

    const sortMenu = document.createElement("div");
    sortMenu.classList.add("sortMenu");
    sortMenu.innerHTML = `<h4>Trier par</h4>
    <div class="dropdownMenu">
        <a id="popular">Popularité</a><i class="fa-solid fa-chevron-up"></i>
        <a id="date">Date</a>
        <a id="title">Titre</a>
    </div>`;
    sidePages.appendChild(sortMenu);
    
    const photographerContent = document.createElement("div");
    photographerContent.classList.add("photographerContent");
    
    sidePages.appendChild(photographerContent);

    let mediaLikesCount = 0;
    let displayLikes = 0
    medias.forEach(media => {
        
        const photographPageContent = photographerPageContent(media);
        const photographPageSection = photographPageContent.photographerPageSection();
        
        photographerContent.appendChild(photographPageSection);
        mediaLikesCount += media.likes
        displayLikes = mediaLikesCount.toLocaleString()
    });

    const toolTip = document.createElement("div");
    toolTip.classList.add("toolTip");
    const toolTipLikes = document.createElement("div");
    toolTipLikes.classList.add("toolTipLikes");
    toolTipLikes.innerHTML = `${displayLikes} <i class="fa-solid fa-heart"></i>`;

    const toolTipPrice = document.createElement("p");
    toolTipPrice.classList.add("toolTipPrice");
    toolTipPrice.innerHTML = `${price}€ / jour`;

    toolTip.appendChild(toolTipLikes);
    toolTip.appendChild(toolTipPrice);

    sidePages.appendChild(toolTip); 

    let leek = document.querySelectorAll(".unliked"); 
        leek.forEach((heart) => heart.addEventListener("click", () => {
            
            if(leek.style.color === "#901c1c") {
                console.log(leek);
                leek.style.color = "#D3573C";

            }
            else {
                leek.style.color = "#901c1c";
            }
        }))

            
       
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
    displayHeader(photographer);
    displayContent(medias, photographer)
    contactForm(photographer);
    submitForm();
}

init();
function photographerPageHeader(data) {

    const { name, city, country, tagline, portrait} = data;
    const picture = `/assets/photos/photographers/${portrait}`;

    function photographerHeader(){
        const photographerHeader = document.createElement("div");
        photographerHeader.classList.add("photographerHeader");
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
        

        return (photographerHeader)
    }
    
    return {photographerHeader}

}


function photographerPageContent(data) {

    const {image, video, id, photographerId, title, date, likes} = data;
    let file;    

    if(image) {
        file = `assets/photos/${photographerId}/${image}`;
    }

    else if(video) {
        file = `assets/photos/${photographerId}/${video}`;
    }

    else {
        return null
    }

    function photographerPageSection() {
        const media = document.createElement("div");
        media.classList.add("medias");
        media.setAttribute("id", id);

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
        
        mediaText.appendChild(mediaLikes);
        
        media.appendChild(mediaText);

        return (media)

    }

    return {photographerPageSection}

} 