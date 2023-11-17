
/* eslint-disable no-unused-vars */
 function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait} = data;

    const picture = `/assets/photos/photographers/${portrait}`;

    function getUserCardDOM() {
        
        const article = document.createElement( 'article' );
        article.setAttribute('id', `${id}`);

        const divClick = document.createElement('div');
        divClick.classList.add('divClick');
        divClick.addEventListener("click", () => {
            location.href = `/photographer.html?id=${id}`
        })

        const img = document.createElement('img')
        img.setAttribute('src', picture)

        divClick.appendChild(img);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        divClick.appendChild(h2);

        const infoDiv = document.createElement('div')
        infoDiv.innerHTML = `<h3>${city}, ${country}</h3><br>
        <p><span>${tagline}<span><br><i>${price}€/jour</i></p>`;

        article.appendChild(divClick);
        
        article.appendChild(infoDiv);
        
        return (article);
    }
    return { getUserCardDOM }
}

