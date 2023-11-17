/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

let totalLikes = 0;
let price = 0;

// Récupère les datas des photographes
async function getPhotographersAndMedias() {
    let response = await fetch('data/photographers.json');
        if(!response) {
            alert("Error 404");
            return {}
        }
    function localMediasInfos(){
        let mediasDatas = response.medias;
        let localMediasDatas = JSON.stringify(mediasDatas)
        window.localStorage.setItem("mediasDatas", localMediasDatas);
    
    }
    return response.json()
}

// Création DOM pour le header du photographe
function photographerPageHeader(data) {

    const {name, city, country, tagline, portrait} = data;
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

// Affiche les photographes
function displayHeader(photographer) {
    
    const sidePages = document.querySelector(".mainSide");
    const photographPageHeader = photographerPageHeader(photographer);
    const photographerHeader = photographPageHeader.photographerHeader();
    sidePages.appendChild(photographerHeader);
}

// Création DOM menu de tri
function displayNav() {
    const insertAfter = document.querySelector(".photographerHeader")
    const sortMenu = document.createElement("div");
    sortMenu.classList.add("sortMenu");
    sortMenu.innerHTML = `<h4>Trier par</h4>
    <div class="dropdownMenu">
        <div class="popularDiv"><a id="popular">Popularité<i class="fa-solid fa-chevron-up"></i></a></div>
        <div class="dateDiv"><a id="date">Date</a></div>
        <div class="titleDiv"><a id="title">Titre</a></div>
    </div>`;
    insertAfter.parentNode.insertBefore(sortMenu, insertAfter.nextElementSibling);
}

// Création du DOM pour le contenu de la page (medias)
function photographerPageContent(data) {

    let {image, video, id, photographerId, title, date, likes} = data;
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

        mediaLikes.addEventListener("click", () => {

            if (mediaLikes.innerHTML === `${likes} <i class="unliked fa-solid fa-heart"></i>`) {
                likes++
                totalLikes++
                mediaLikes.innerHTML = `${likes} <i class="liked fa-solid fa-heart"></i>`;   

                window.localStorage.setItem("likes", likes)
                console.log(localStorage);
            }
            else {
                likes--
                totalLikes--
                mediaLikes.innerHTML = `${likes} <i class="unliked fa-solid fa-heart"></i>`;

                window.localStorage.setItem("likes", likes)
                console.log(localStorage);

            }

            displayToolTip(price)
        })
   
        
        mediaText.appendChild(mediaLikes);
        
        media.appendChild(mediaText);

        return (media)

    } 

    return {photographerPageSection}

} 

// Création du DOM pour le tool tip
function displayToolTip() {

    const sidePages = document.querySelector(".mainSide");


    const toolTip = document.createElement("div");
    toolTip.classList.add("toolTip");
    const toolTipLikes = document.createElement("div");
    toolTipLikes.classList.add("toolTipLikes");
    toolTipLikes.innerHTML = `${totalLikes} <i class="fa-solid fa-heart"></i>`;

    const toolTipPrice = document.createElement("p");
    toolTipPrice.classList.add("toolTipPrice");
    toolTipPrice.innerHTML = `${price}€ / jour`;

    toolTip.appendChild(toolTipLikes);
    toolTip.appendChild(toolTipPrice);

    sidePages.appendChild(toolTip); 
}


// Affiche le contenu de la page
function displaySortedContent(sortedMedias, photographer) {
    price = photographer.price;
    const {likes} = sortedMedias

    const sidePages = document.querySelector(".mainSide");
    
    const photographerContent = document.createElement("div");
    photographerContent.classList.add("photographerContent");
    photographerContent.setAttribute("id", "notSorted")
    
    sidePages.appendChild(photographerContent);

   
    sortedMedias.forEach(media => {
 
        const photographPageContent = photographerPageContent(media);
        const photographPageSection = photographPageContent.photographerPageSection();
        
        photographerContent.appendChild(photographPageSection);
        
    });

    displayToolTip(price)
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

    const medias = data.media.filter(p => String(p.photographerId) === String(photographer.id)); 
    medias.forEach(m => {
        totalLikes += m.likes
    })

    const sortedMedias = Array.from(medias)
    sortedMedias.sort(function (a,b) {
        return b.likes - a.likes;
    })

    displayHeader(photographer);
    displaySortedContent(sortedMedias, photographer);
    displayNav();
    contactForm(photographer);
    submitForm();
    // Sort events
    const compareContent = document.querySelector(".photographerContent");

    // Sorting by likes (popularity)
    const popularSort = document.querySelector(".popularDiv");
    popularSort.addEventListener("click", () => {
        const sortedMedias = Array.from(medias)
        if (compareContent.id === "notSorted") {
            sortedMedias.sort(function (a, b) {
                return a.likes - b.likes;
            })
            const toBeDeleted = document.querySelector(".photographerContent");
            if (toBeDeleted) {
                toBeDeleted.remove();
            }
            displaySortedContent(sortedMedias, photographer);
            compareContent.setAttribute("id", "popularSorted");
        }

        else {
            sortedMedias.sort(function (a, b) {
                return b.likes - a.likes
            })
            const toBeDeleted = document.querySelectorAll(".photographerContent")
            if (toBeDeleted) {
                toBeDeleted.forEach(e => {
                    e.remove()
                });
            }
            displaySortedContent(sortedMedias, photographer);
            compareContent.setAttribute("id", "notSorted")
        }
        
    })

    // Sorting by date 
    const dateSort = document.querySelector(".dateDiv");
    dateSort.addEventListener("click", () => {
        const sortedMedias = Array.from(medias)
        
        if (compareContent.id === "notSorted") {
            sortedMedias.sort(function (a, b) {
                const dateA = new Date(a.date)
                const dateB = new Date(b.date)
                return dateA - dateB
            })
            const toBeDeleted = document.querySelector(".photographerContent");
            if (toBeDeleted) {
                toBeDeleted.remove();
            }
            displaySortedContent(sortedMedias, photographer);
            compareContent.setAttribute("id", "popularSorted")
        }

        else {
            sortedMedias.sort(function (a, b) {
                const dateA = new Date(a.date)
                const dateB = new Date(b.date)
                return dateB - dateA
            })
            const toBeDeleted = document.querySelectorAll(".photographerContent")
            if (toBeDeleted) {
                toBeDeleted.forEach(e => {
                    e.remove()
                });
            }
            displaySortedContent(sortedMedias, photographer);
            compareContent.setAttribute("id", "notSorted")
        }

    })

    // Sorting by title
    const titleSort = document.querySelector(".titleDiv");
    titleSort.addEventListener("click", () => {
        const sortedMedias = Array.from(medias)
        if (compareContent.id === "notSorted") {
            sortedMedias.sort(function (a, b) {
                if (a.title < b.title) {
                    return -1
                }

                return 0
            })
            const toBeDeleted = document.querySelector(".photographerContent");
            if (toBeDeleted) {
                toBeDeleted.remove();
            }
            displaySortedContent(sortedMedias, photographer);
            compareContent.setAttribute("id", "popularSorted")
        }

        else {
            sortedMedias.sort(function (a, b) {
                if (a.title < b.title) {
                    return 0
                }

                return -1
            })
            const toBeDeleted = document.querySelectorAll(".photographerContent")
            if (toBeDeleted) {
                toBeDeleted.forEach(e => {
                    e.remove()
                });
            }
            displaySortedContent(sortedMedias, photographer);
            compareContent.setAttribute("id", "notSorted")
        }
        
    })

}

init()
localStorage.clear()
console.log(localStorage)