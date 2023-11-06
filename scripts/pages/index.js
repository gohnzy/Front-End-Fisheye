<<<<<<< Updated upstream
/* eslint-disable no-undef */

   async function getPhotographers() {

        let response = await fetch('data/photographers.json')
        let datas = await response.json()
        let photographers = [datas["photographers"]]
            for (let i = 0; i < photographers.length; i++) {
                return {photographers: [...photographers[i]]}
            }
       

=======
    
    async function getPhotographers() {
        const reponse = await fetch("data/photographers.json")
    const pho = await reponse.json()
    const pp = pho["photographers"]
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        let photo = pp[0]
        let photographers = [
            {
                name: photo.name,
                id: photo.id,
                city: photo.city,
                tagline: photo.tagline,
                price: photo.price,
                portrait: photo.portrait
            },
        ]
        // et bien retourner le tableau photographers seulement une fois récupéré
        return ({
            photographers: [...photographers]})
>>>>>>> Stashed changes
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        
            photographers.forEach((photographer) => {
                const photographerModel = photographerTemplate(photographer);
                const userCardDOM = photographerModel.getUserCardDOM();
                photographersSection.appendChild(userCardDOM);
            });
        
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        await displayData(photographers);
        
    }
    
    init();
    
    