export class PhotographerFactory {
    photographersDatas = [];

    constructor() {}

    async init() {
        await this.fetchPhotographersData();
    }

    async fetchPhotographersData() {
        let response = await fetch('data/photographers.json');
        
        if(!response) {
            alert("Error 404");
            return {};
        }

        const data = await response.json();      
        this.photographersDatas = data.photographers;
    }

    displayData(section) {
        this.photographersDatas.forEach(photographer => {
            const photographerModel = this.photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            section.appendChild(userCardDOM);
        });
    }

    photographerTemplate(data) {
        const { name, id, city, country, tagline, price, portrait} = data;
    
        const picture = `/assets/photos/photographers/${portrait}`;
    
        function getUserCardDOM() {
            
            const article = document.createElement( 'article' );
            article.setAttribute('id', `${id}`);
    
            const divClick = document.createElement('a');
            divClick.classList.add('divClick');
            divClick.setAttribute("role", "link");
            divClick.setAttribute("href",`/photographer.html?id=${id}`)
            divClick.setAttribute("aria-label", `Profil de ${name}`)
    
            const img = document.createElement('img');
            img.setAttribute('src', picture);
            img.setAttribute("alt", name);
    
            divClick.appendChild(img);
    
            const h2 = document.createElement( 'h2' );
            h2.textContent = name;
    
            divClick.appendChild(h2);
    
            const infoDiv = document.createElement('div');
            infoDiv.innerHTML = `<h3>${city}, ${country}</h3>
            <p>${tagline}<br><i>${price}€/jour</i></p>`;
    
            article.appendChild(divClick);
            
            article.appendChild(infoDiv);
            
            return (article);
        }
        return { getUserCardDOM };
    }
}