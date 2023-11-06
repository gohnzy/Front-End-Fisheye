<<<<<<< Updated upstream
/* eslint-disable no-unused-vars */
 function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait} = data;

    const picture = `/assets/photos/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.setAttribute('id', `${id}`)
        const divClick = document.createElement('div')
        divClick.classList.add('divClick')
        divClick.addEventListener("click", () => {
            location.href = `/photographer.html?id=${id}`
        })
        const img = document.createElement('img')
        img.setAttribute('src', picture)
        divClick.appendChild(img);
=======
function photographerTemplate(data) {
    const { name } = data;

    

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        
>>>>>>> Stashed changes
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        divClick.appendChild(h2);
        const infoDiv = document.createElement('div')
        infoDiv.innerHTML = `<h3>${city}, ${country}</h3><br>
        <p><span>${tagline}<span><br><i>${price}€/jour</i></p>`
        article.appendChild(divClick);
        
        article.appendChild(infoDiv)
        return (article);
    }
<<<<<<< Updated upstream
    return { getUserCardDOM }
}

function photographerPage(data) {

    const { name, id, city, country, tagline, price, portrait} = data;
    const picture = `/assets/photos/photographers/${portrait}`;

    function photographerPageDOM(){
        const photographerHeader = document.createElement("div");
        photographerHeader.classList.add("photographer-header")
        const btnModal = document.createElement("div")
        btnModal.innerHTML = `<button class="contact_button" onclick="displayModal()">Contactez-moi</button>`
        const photographerInfos = document.createElement("div")
        photographerHeader.classList.add("photographer-infos")
        photographerInfos.innerHTML =
        `<h1>${name}</h1><br>
        <h2>${city},${country}</h2><br>
        <h3>${tagline}</h3>`
        const photographerPortrait = document.createElement("img")
        photographerPortrait.setAttribute("src", picture)
        photographerHeader.appendChild(photographerInfos)
        photographerHeader.appendChild(btnModal)
        photographerHeader.appendChild(photographerPortrait)

        return (photographerHeader);
    }
    
    return {photographerPageDOM}

}
=======
    return { name, getUserCardDOM }
}
>>>>>>> Stashed changes
