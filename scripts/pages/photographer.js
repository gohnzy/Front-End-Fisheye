/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { MediaFactory } from '../factories/mediaFactory.js';
import { displayContactCard } from '../templates/photographerContactCard.js';
import { displaySortMenu } from '../templates/sortMenu.js';

// Récupère les datas des photographes
async function getDatas() {
    let response = await fetch('data/photographers.json');
    
    if(!response) {
        alert("Error 404");
        return {};
    }

    return response.json();
}

async function init() {
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

    mediaFactory.init(photographer.id, photographer.price, data.media);

    displayContactCard(photographer);
    displaySortMenu();

    const photographerContent = document.querySelector(".photographerContent");
    mediaFactory.setMedia(photographer.id, data.media);
    mediaFactory.displayMediasContent(photographerContent);
    lightboxFunction(mediaFactory);
    likeFunction(mediaFactory);

    contactForm(photographer);
    submitForm();

    // DOM Elements for sorting 
    
    const dropdownMenu = document.querySelector(".dropdownMenu");
    const first = document.querySelector(".dropdownMenu :nth-child(2)");
    const second = document.querySelector(".dropdownMenu :nth-child(3)");
    const third = document.querySelector(".dropdownMenu :nth-child(4)");

    document.querySelector(".popularDiv").addEventListener("click", () => {
        mediaFactory.sortPopular();
        mediaFactory.displayMediasContent(photographerContent);
        lightboxFunction(mediaFactory);
        likeFunction(mediaFactory);

        if(document.querySelector(".dropdownMenu :nth-child(2)").classList == "dateDiv"){
            dropdownMenu.insertBefore(first, second);
        } else if(document.querySelector(".dropdownMenu :nth-child(2)").classList == "titleDiv") {
            dropdownMenu.insertBefore(first, third);
        }
    });

    // Sorting by date 
    document.querySelector(".dateDiv").addEventListener("click", () => {
        mediaFactory.sortDate();
        mediaFactory.displayMediasContent(photographerContent);
        lightboxFunction(mediaFactory);
        likeFunction(mediaFactory);

        if(document.querySelector(".dropdownMenu :nth-child(2)").classList == "popularDiv"){
            dropdownMenu.insertBefore(second, first);
        } else if(document.querySelector(".dropdownMenu :nth-child(2)").classList == "titleDiv"){
            dropdownMenu.insertBefore(second, third);
        }

    });

    // Sorting by title
    document.querySelector(".titleDiv").addEventListener("click", () => {
        mediaFactory.sortTitle();
        mediaFactory.displayMediasContent(photographerContent);
        lightboxFunction(mediaFactory);
        likeFunction(mediaFactory);

        if(document.querySelector(".dropdownMenu :nth-child(2)").classList == "popularDiv"){
            dropdownMenu.insertBefore(third, first);
        } else if(document.querySelector(".dropdownMenu :nth-child(2)").classList == "dateDiv"){
            dropdownMenu.insertBefore(third, second);
        }
    });
}

function likeFunction(mediaFactory) {
    const mediaLikes = document.querySelectorAll(".mediaLikes");
    mediaLikes.forEach(m => m.addEventListener("click", (event) => {
        mediaFactory.likeMedia(event);
    }));
}

function lightboxFunction(mediaFactory) {
    const mediaForLightbox = document.querySelectorAll(".medias");
    const lightbox = document.querySelector(".lightbox");
    const body = document.querySelector("body");
    const left = document.querySelector(".left");
    const right = document.querySelector(".right");

    mediaForLightbox.forEach((i, index) => i.firstElementChild.addEventListener("click", () => {
        const lightboxMedia = document.querySelector(".lightboxMedia");
        const closeLightboxBtn = document.querySelector("svg");
        
        let thisMedia = mediaFactory.mediasDatas[index];

        document.addEventListener("keydown", (event) => { 
            if(event.key === "ArrowLeft") {
                if(index > 0){
                    lightboxMedia.innerHTML = "";
                    index-=1;
                    thisMedia = mediaFactory.mediasDatas[index];
                    mediaFactory.createLightbox(thisMedia);
                    
                } else if (index === 0) {
                    lightboxMedia.innerHTML = "" ;
                    index = mediaForLightbox.length-1;
                    thisMedia = mediaFactory.mediasDatas[index];
                    mediaFactory.createLightbox(thisMedia);
                }
            }
        });

        left.addEventListener("click", () => {
            if(index > 0){
                lightboxMedia.innerHTML = "";
                index-=1;
                thisMedia = mediaFactory.mediasDatas[index];
                mediaFactory.createLightbox(thisMedia);
            } else if (index === 0) {
                lightboxMedia.innerHTML = "" ;
                index = mediaForLightbox.length-1;
                thisMedia = mediaFactory.mediasDatas[index];
                mediaFactory.createLightbox(thisMedia);
            }
        });

        document.addEventListener("keydown", (event) => {
            if(event.key === "ArrowRight") {
                if(index < mediaForLightbox.length-1) {
                    lightboxMedia.innerHTML = "";
                    index+=1;
                    thisMedia = mediaFactory.mediasDatas[index];
                    mediaFactory.createLightbox(thisMedia);
                } else {
                    lightboxMedia.innerHTML = "" ;
                    index = 0;
                    thisMedia = mediaFactory.mediasDatas[index];
                    mediaFactory.createLightbox(thisMedia);
                }
            }
        });

        right.addEventListener("click", () => {
            if(index < mediaForLightbox.length-1) {
                lightboxMedia.innerHTML = "";
                index+=1;
                thisMedia = mediaFactory.mediasDatas[index];
                mediaFactory.createLightbox(thisMedia);
            } else {
                lightboxMedia.innerHTML = "" ;
                index = 0;
                thisMedia = mediaFactory.mediasDatas[index];
                mediaFactory.createLightbox(thisMedia);
            }
        });

        mediaFactory.createLightbox(thisMedia);

        closeLightboxBtn.addEventListener("click", (event) => {
            if(event.target) {
                document.documentElement.scrollTop = i.offsetTop;
                lightbox.style.display = "none";
                body.style.overflow = "visible";
                lightboxMedia.innerHTML = "";
            }
        })

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                document.documentElement.scrollTop = i.offsetTop;
                lightbox.style.display = "none";
                body.style.overflow = "visible";
                lightboxMedia.innerHTML = "";
                document.removeEventListener("keydown");
            }
        });
    }));
}

init();