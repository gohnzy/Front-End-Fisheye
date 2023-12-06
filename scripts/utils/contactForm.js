/* eslint-disable no-unused-vars */

const modal = document.getElementById("contact_modal");
const body = document.querySelector("body");

const firstNameInput = document.getElementById("firstName");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const submitBtn = document.querySelector(".submit");

const closeModalBtn = document.querySelector(".closeModal");

const formFirst = document.querySelector(".formFirst");
const formName = document.querySelector(".formName");
const formEmail = document.querySelector(".formEmail");
const formMessage = document.querySelector(".formMessage");

let removeTabindexElements = [];
let videosToClean = [];

function tabindexRemoveContactModal() {
    const elementsToClean = document.querySelectorAll("[tabindex]:not(#contact_modal [tabindex])");
    removeTabindexElements = Array.from(elementsToClean);
    const videos = document.querySelectorAll("video");
    videosToClean = Array.from(videos);
}

function displayModal() {
    document.addEventListener("keydown", escModal);

    document.documentElement.scrollTop = document.offsetTop;
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    body.style.overflow = "hidden";
    body.setAttribute("aria-hidden", "true");

    tabindexRemoveContactModal();

    removeTabindexElements.forEach(element => {
        element.removeAttribute("tabindex");
    });
    videosToClean.forEach(v => {
        v.removeAttribute("controls");
    });

}

function closeModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    body.style.overflow = "visible";
    body.setAttribute("aria-hidden", "false");

    removeTabindexElements.forEach(element => {
        element.setAttribute("tabindex", "0")
    })

    videosToClean.forEach(v => {
        v.setAttribute("controls", "");
    })
    
}

modal.addEventListener("click", (event) => {

    if(event.target === modal) {
        closeModal();
    }

})


function escModal(event) {
    if(event.key === "Escape") {
        closeModal();
        document.removeEventListener("keydown", escModal);
    }
}

function contactForm(data) {
    const {name} = data;
    const modalHeader = document.querySelector(".modalHeader");
    const photographerName = document.createElement("h2");
    photographerName.innerText = `Contactez-moi
    ${name}`;
    modalHeader.appendChild(photographerName);

}

// RegExp
let namesRegExp = new RegExp("[a-zA-ZÀ-ÖØ-öø-ÿ-' ]");
let mailRegExp = new RegExp("^[a-z0-9.-_]+@[a-z0-9.-_]+\\.[a-z0-9.-_]+");

function validateForm() {
    let validate = true;

    if(firstNameInput.value.length < 2 || !namesRegExp.test(firstNameInput.value)) {
        formFirst.setAttribute("data-error-visible", "true");
        validate = false;
    }
    else {
        formFirst.setAttribute("data-error-visible", "false");

    }
    if(nameInput.value.length < 2 || !namesRegExp.test(nameInput.value)){
        formName.setAttribute("data-error-visible", "true");
        validate = false;
    }
    else {
        formName.setAttribute("data-error-visible", "false");

    }
    if(emailInput.value.length < 2 || !mailRegExp.test(emailInput.value)){
        formEmail.setAttribute("data-error-visible", "true");
        validate = false;
    }
    else {
        formEmail.setAttribute("data-error-visible", "false");

    }
    if(messageInput.value.length < 2){
        formMessage.setAttribute("data-error-visible", "true");
        validate = false;
    }
    else {
        formMessage.setAttribute("data-error-visible", "false");

    }

    return validate
}

function submitForm() {
    
    const modalHeader = document.querySelector(".modalHeader");
    const form = document.querySelector(".form");
    const sent = document.querySelector(".sent");

    form.addEventListener("submit", (event) => {

        let storeInputs = {
            Prénom: firstNameInput.value,
            Nom: nameInput.value,
            Email :emailInput.value,
            Message : messageInput.value,
        };

        if(!validateForm()) {
            event.preventDefault();
            console.log(storeInputs);

        } else {
            event.preventDefault();
            modalHeader.style.display = "none";
            form.style.display = "none";
            sent.style.display = "block";

            console.log(storeInputs);

        }
    });
}

