/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { MediaFactory } from '../factories/mediaFactory.js';
import { displayContactCard } from '../templates/photographerContactCard.js';

// Récupère les datas des photographes
async function getDatas() {
    let response = await fetch('data/photographers.json');
    
    if(!response) {
        alert("Error 404");
        return {};
    }

    return response.json();
}

// Fonction principale

async function init() {

    // Nouvelle instance de la class
    const mediaFactory = new MediaFactory();

    // Recupération des données 
    const id = new URLSearchParams(window.location.search).get('id');
    
    const data = await getDatas();
    if (!data.photographers) {
        location.href = 'notFound.html';
    }

    // Choix du photoghraphe par l'ID

    const photographer = data.photographers.find(p => String(p.id) === id);
    if (!photographer) {
        location.href = 'notFound.html';
    }

    // Class : Fonction principale
    mediaFactory.init(photographer.id, photographer.price, data.media);

    // Affiche le header du photographe
    displayContactCard(photographer);

    // Affiche le contenu du photographe
    const photographerContent = document.querySelector(".photographerContent");
    mediaFactory.setMedia(photographer.id, data.media);
    mediaFactory.displayMediasContent(photographerContent);

    // Fonctions annexes pour l'ouverture de la lightbox et le compte des likes
    lightboxFunction(mediaFactory);
    likeFunction(mediaFactory);

    // Fonctions de gestion du formulaire
    contactForm(photographer);
    submitForm();

    // DOM Elements pour le tri 
    
    const dropdownMenu = document.querySelector(".dropdownMenu");
    const first = document.querySelector(".dropdownMenu :nth-child(2)");
    const second = document.querySelector(".dropdownMenu :nth-child(3)");
    const third = document.querySelector(".dropdownMenu :nth-child(4)");

    // Tri par popularité
    document.querySelector(".popularDiv").addEventListener("click", () => {
        mediaFactory.sortPopular();
        mediaFactory.displayMediasContent(photographerContent);
        lightboxFunction(mediaFactory);
        likeFunction(mediaFactory);

        // Modification de l'ordre d'affichage du menu déroulant
        if(document.querySelector(".dropdownMenu :nth-child(2)").classList == "dateDiv"){
            dropdownMenu.insertBefore(first, second);
        } else if(document.querySelector(".dropdownMenu :nth-child(2)").classList == "titleDiv") {
            dropdownMenu.insertBefore(first, third);
        }
    });

    // Tri par date
    document.querySelector(".dateDiv").addEventListener("click", () => {
        mediaFactory.sortDate();
        mediaFactory.displayMediasContent(photographerContent);
        lightboxFunction(mediaFactory);
        likeFunction(mediaFactory);

        // Modification de l'ordre d'affichage du menu déroulant
        if(document.querySelector(".dropdownMenu :nth-child(2)").classList == "popularDiv"){
            dropdownMenu.insertBefore(second, first);
        } else if(document.querySelector(".dropdownMenu :nth-child(2)").classList == "titleDiv"){
            dropdownMenu.insertBefore(second, third);
        }

    });

   // Tri par popularité titre
    document.querySelector(".titleDiv").addEventListener("click", () => {
        mediaFactory.sortTitle();
        mediaFactory.displayMediasContent(photographerContent);
        lightboxFunction(mediaFactory);
        likeFunction(mediaFactory);

        // Modification de l'ordre d'affichage du menu déroulant
        if(document.querySelector(".dropdownMenu :nth-child(2)").classList == "popularDiv"){
            dropdownMenu.insertBefore(third, first);
        } else if(document.querySelector(".dropdownMenu :nth-child(2)").classList == "dateDiv"){
            dropdownMenu.insertBefore(third, second);
        }
    });

    mediaFactory.mediasDatas.forEach(m => {
        document.getElementById(m.id).addEventListener('keypress', (event) => {
            if (event.keyCode === 13) {
                document.getElementById(m.id).firstElementChild.click();
            }
        });
    });
}

function likeFunction(mediaFactory) {
    const mediaLikes = document.querySelectorAll(".mediaLikes");

    mediaLikes.forEach(m => {
        m.addEventListener("click", () => {
            const increaseThisMediaLikes = m.querySelector(".fa-heart");
            mediaFactory.likeMedia(increaseThisMediaLikes);
        });

        m.addEventListener("keydown", (event) => {
            if (event.key === 'Enter') {
                const increaseThisMediaLikes = m.querySelector(".fa-heart");
                mediaFactory.likeMedia(increaseThisMediaLikes);
                event.preventDefault();
                m.focus();
                m.removeEventListener("keydown", likeFunction)
            }
        });
    });
}


// Variables pour stocker les éléments à modifier

// Éléments dont l'attribut tabindex doit être supprimé
let removeTabindexElements = [];

// Éléments dont enlevé l'attribut controls (pour supprimer le focus)
let videosToClean = [];

function tabindexRemoveLightbox() {
    const elementsToClean = document.querySelectorAll("[tabindex]:not(.lightbox [tabindex])");
    removeTabindexElements = Array.from(elementsToClean);
    const videos = document.querySelectorAll("video");
    videosToClean = Array.from(videos);
}


// Fonction de gestion de la lightbox
function lightboxFunction(mediaFactory) {

    // DOM Elements pour la gestion de la lightbox
    const mediaForLightbox = document.querySelectorAll(".medias");
    const lightbox = document.querySelector(".lightbox");
    const body = document.querySelector("body");
    const left = document.querySelector(".left");
    const right = document.querySelector(".right");

    // Ouverture et fonctionnalités de la lightbox
    mediaForLightbox.forEach((i, index) => i.firstElementChild.addEventListener("click", () => {
        const lightboxMedia = document.querySelector(".lightboxMedia");
        const closeLightboxBtn = document.querySelector("svg");

        // Gestion des events au clic clavier
        let handleKeyDown;
        document.addEventListener("keydown", handleKeyDown);

        function addListeners() {
            document.addEventListener("keydown", handleKeyDown);
        }

        function removeListeners() {
            document.removeEventListener("keydown", handleKeyDown);
        }

        // Keyboard events pour la lightbox
        handleKeyDown = function(event) {
            if (event.key === "Escape") {
                removeListeners()
                document.documentElement.scrollTop = i.offsetTop;
                lightbox.style.display = "none";
                body.style.overflow = "visible";
                lightboxMedia.innerHTML = "";
                removeTabindexElements.forEach(element => {
                    element.setAttribute("tabindex", "0")
                })
            
                videosToClean.forEach(v => {
                    v.setAttribute("controls", "");
                })

            } else if(event.key === "ArrowLeft") {
                navigateLeft();
            } else if(event.key === "ArrowRight") {
                navigateRight()
            } 
        }

        addListeners()

        // Création de la lightbox
        let thisMedia = mediaFactory.mediasDatas[index];

        tabindexRemoveLightbox();

        removeTabindexElements.forEach(element => {
            element.removeAttribute("tabindex");
        });
        videosToClean.forEach(v => {
            v.removeAttribute("controls");
        });



        // Média précédent (souris)
        left.addEventListener("click", () => {
            navigateLeft();
        });
        
        left.addEventListener("keydown", (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                navigateLeft();
            }
        });
        
        function navigateLeft() {
            if (index > 0) {
                lightboxMedia.innerHTML = "";
                index -= 1;
                thisMedia = mediaFactory.mediasDatas[index];
                mediaFactory.createLightbox(thisMedia);
            } else if (index === 0) {
                lightboxMedia.innerHTML = "";
                index = mediaForLightbox.length - 1;
                thisMedia = mediaFactory.mediasDatas[index];
                mediaFactory.createLightbox(thisMedia);
            }
        }

        // Média suivant (souris)
        right.addEventListener("click", () => {
            navigateRight();
        });
        
        right.addEventListener("keydown", (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                navigateRight();
            }
        });
        
        function navigateRight() {
            if (index < mediaForLightbox.length - 1) {
                lightboxMedia.innerHTML = "";
                index += 1;
                thisMedia = mediaFactory.mediasDatas[index];
                mediaFactory.createLightbox(thisMedia);
            } else {
                lightboxMedia.innerHTML = "";
                index = 0;
                thisMedia = mediaFactory.mediasDatas[index];
                mediaFactory.createLightbox(thisMedia);
            }
        }
        
        mediaFactory.createLightbox(thisMedia);

        // Fermeture de la lightbox
        function closeLightbox() {
            removeListeners()
                document.documentElement.scrollTop = i.offsetTop;
                lightbox.style.display = "none";
                body.style.overflow = "visible";
                lightboxMedia.innerHTML = "";
                removeTabindexElements.forEach(element => {
                    element.setAttribute("tabindex", "0")
                })
            
                videosToClean.forEach(v => {
                    v.setAttribute("controls", "");
                })
        }
        closeLightboxBtn.addEventListener("click", (event) => {
            if(event.target) {
                removeListeners();
                closeLightbox();
            }
        });

        closeLightboxBtn.addEventListener("keydown", (event) => {
            if(event.key === 'Enter') {
                removeListeners();
                closeLightbox();
            }
        });
    }));
}

init();