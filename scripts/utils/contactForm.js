/* eslint-disable no-unused-vars */

const modal = document.getElementById("contact_modal");
const body = document.querySelector("body");

const firstNameInput = document.getElementById("firstName");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");


const formFirst = document.querySelector(".formFirst");
const formName = document.querySelector(".formName");
const formEmail = document.querySelector(".formEmail");
const formMessage = document.querySelector(".formMessage");

function displayModal() {

	modal.style.display = "block";
    body.style.overflow = "hidden";

}

function closeModal() {

    modal.style.display = "none";
    body.style.overflow = "visible";
}


modal.addEventListener("click", (event) => {

    if(event.target === modal) {
        closeModal();
    }

})

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

