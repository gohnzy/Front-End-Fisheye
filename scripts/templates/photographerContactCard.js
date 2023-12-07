// Affiche le header de présentation du photographe
export function displayContactCard(photographer) {
    const {name, city, country, tagline, portrait} = photographer;
    const picture = `/assets/photos/photographers/${portrait}`;

    const photographerHeader = document.querySelector('.photographerHeader');
    const btnModal = document.createElement("button");
    btnModal.classList.add("openModal");
    btnModal.setAttribute("onclick", "displayModal()");
    btnModal.setAttribute("tabindex", "0");
    btnModal.setAttribute("role", "dialog");
    btnModal.innerText="Contactez-moi";
    const photographerInfos = document.createElement("div");
    photographerInfos.classList.add("photographer-infos");
    photographerInfos.innerHTML =
    `<h1>${name}</h1><br>
    <h2>${city}, ${country}</h2><br>
    <h3>${tagline}</h3>`;
    const portraitDiv = document.createElement("div");
    portraitDiv.classList.add("portraitDiv");
    const photographerPortrait = document.createElement("img");
    photographerPortrait.setAttribute("src", picture);
    photographerHeader.appendChild(photographerInfos);
    photographerHeader.appendChild(btnModal);
    portraitDiv.appendChild(photographerPortrait);
    photographerHeader.appendChild(portraitDiv);
}