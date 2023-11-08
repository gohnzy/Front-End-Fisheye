/* eslint-disable no-unused-vars */
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const modal = document.getElementById("contact_modal");
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
/*
    const formDiv = document.querySelector(".formDiv")
    const message = document.getElementById("message")
    message.addEventListener("input", () => {
        const messageContent = message.value
        var characterCount = messageContent.length
    })

    const characterCountDisplay = document.createElement("p")
    characterCountDisplay.innerHTML = `${characterCount}/1000`
    formDiv.appendChild(characterCountDisplay)
    */
}

// RegExp
let textRegExp = new RegExp("^[a-zA-Z-' ]+$")
let mailRegExp = new RegExp("^[a-z0-9.-_]+@[a-z0-9.-_]+\\.[a-z0-9.-_]+")

function validateForm() {
    let validate = true 
    const firstNameInput = document.getElementById("firstName");


    if(firstNameInput.value.length < 2){

        validate = false;
    }
    else {
        validate = true
    }
    return validate
}

function submitForm() {
    validateForm();
    const form = document.querySelector("form");
    
    form.addEventListener("submit", (event) => {
        event.preventDefault()

        if(!validateForm()) {
            alert("Non non noooon")
        }
    })
}