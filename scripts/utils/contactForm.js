/* eslint-disable no-unused-vars */

const modal = document.getElementById("contact_modal");
function displayModal() {

	modal.style.display = "block";

}

function closeModal() {

    modal.style.display = "none";
}


modal.addEventListener("click", (event) => {

    if(event.target === modal) {
        closeModal()
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
let textRegExp = new RegExp("^[a-zA-ZÀ-ÖØ-öø-ÿ-' ]+$")
let mailRegExp = new RegExp("^[a-z0-9.-_]+@[a-z0-9.-_]+\\.[a-z0-9.-_]+")

function validateForm() {
    let validate = true 

    // DOM's Inputs
    const firstNameInput = document.getElementById("firstName");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const message = document.getElementById("message");

    // DOM's divs
    const formFirst = document.querySelector(".formFirst");
    const formName = document.querySelector(".formName");
    const formEmail = document.querySelector(".formEmail");
    const formMessage = document.querySelector(".formMessage");

    if(firstNameInput.value.length < 2 || !textRegExp.test(firstNameInput.value)) {
        formFirst.setAttribute("data-error-visible", "true");
        validate = false;
    }
    else {
        formFirst.setAttribute("data-error-visible", "false");

    }
    if(nameInput.value.length < 2 || !textRegExp.test(nameInput.value)){
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
    if(message.value.length < 2 || !textRegExp.test(message.value)){
        formMessage.setAttribute("data-error-visible", "true");
        validate = false;
    }
    else {
        formMessage.setAttribute("data-error-visible", "false");

    }

    return validate
}

function submitForm() {
    
    const modalHeader = document.querySelector(".modalHeader")
    const form = document.querySelector(".form");
    const sent = document.querySelector(".sent");

    form.addEventListener("submit", (event) => {

        if(!validateForm()) {
            event.preventDefault();

        }
        else {
            event.preventDefault()
            modalHeader.style.display = "none"
            form.style.display = "none";
            sent.style.display = "block"

        }
    })
}

