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
        return {}
    }

    return response.json();
}

// Function principale regroupant l'appel à toutes les autres fonctions
async function init() {
    const mediaFactory = new MediaFactory()
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
    mediaFactory.displayMediasContent(photographerContent);

    contactForm(photographer);
    submitForm();
    
    const mediaForLightbox = document.querySelectorAll(".medias");
    const lightbox = document.querySelector(".lightbox");
    const body = document.querySelector("body");
    const left = document.querySelector(".left");
    const right = document.querySelector(".right");


    function leftClick() {
        console.clear()
    }

    function rightClick() {
        console.log("droite");
    }

    mediaForLightbox.forEach((i, index) => i.addEventListener("click", () => {

        let thisMedia = mediaFactory.mediasDatas[index];
      
        mediaFactory.createLightbox(thisMedia)

        const lightboxMedia = document.querySelector(".lightboxMedia");



        left.removeEventListener("click",leftClick);
        left.addEventListener("click", ()=>{console.log(index+1)});

        
        right.removeEventListener("click", rightClick);
        right.addEventListener("click", rightClick);
        
        const svg = document.querySelector("svg")

        svg.addEventListener("click", (event) => {
            if(event.target) {
                
                document.documentElement.scrollTop = i.offsetTop;
                lightbox.style.display = "none";
                body.style.overflow = "visible";
                lightboxMedia.innerHTML = "";
            }
        })

        document.addEventListener("keydown", handleEscKey);

        function handleEscKey(event) {
            if (event.key === "Escape") {
                document.documentElement.scrollTop = i.offsetTop;
                lightbox.style.display = "none";
                body.style.overflow = "visible";
                lightboxMedia.innerHTML = "";
                document.removeEventListener("keydown", handleEscKey);
            }
        }
        
    }))
    const dropMenu = document.querySelector(".dropdownMenu");
    // Sorting by likes (popularity)

    const popularSort = document.querySelectorAll(".popularDiv");
    popularSort.forEach(btn => btn.addEventListener("click", () => {
        const photographerContent = document.querySelector('.photographerContent');

        const nodes = Array.prototype.slice.call(photographerContent.childNodes);

        nodes.sort(function (a, b) {
            const likesA = a.children[1].children[1].outerText;
            const likesB = b.children[1].children[1].outerText;
            return likesB - likesA
        })
       
        nodes.forEach(n => photographerContent.appendChild(n));
    }));

    // Sorting by date 
    const dateSort = document.querySelectorAll(".dateDiv");
    dateSort.forEach(btn => btn.addEventListener("click", () => {
        const photographerContent = document.querySelector('.photographerContent');
        const nodes = Array.prototype.slice.call(photographerContent.childNodes);

        nodes.sort(function (a, b) {
            const dateA = new Date(a.attributes.date.value);
            const dateB = new Date(b.attributes.date.value);
            return dateA - dateB
        })
       
        nodes.forEach(n => photographerContent.appendChild(n));
        const first = document.querySelector(".dropdownMenu :nth-child(2)")
        const second = document.querySelector(".dropdownMenu :nth-child(3)")

        dropMenu.insertBefore(second, first)
    }))

    // Sorting by title
    const titleSort = document.querySelectorAll(".titleDiv");
    titleSort.forEach(btn => btn.addEventListener("click", () => {
        const photographerContent = document.querySelector('.photographerContent');
        const nodes = Array.prototype.slice.call(photographerContent.childNodes);
        nodes.sort(function (a, b) {
            const titleA = a.attributes.name.value;
            const titleB = b.attributes.name.value;
            if (titleA < titleB) {
                return -1
            }

            return 0
        })
        nodes.forEach(n => photographerContent.appendChild(n));
        
    }))
}

init();


