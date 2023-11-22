/* eslint-disable no-unused-vars */
export class MediaFactory {
    mediasDatas = [];
    totalLikes = 0;
    price = 0;

    constructor() {}

    init(photographerId, price, medias) {
        this.setMedia(photographerId, medias);
        this.setPrice(price);
        this.setTotalLikes();
    }
    
    setMedia(photographerId, medias) {
        this.mediasDatas = medias.filter(m => String(m.photographerId) === String(photographerId))
        
        .sort(function (a,b) {
            return b.likes - a.likes;
        }); 

    }

    setPrice(price) {
        this.price = price;
    }

    setTotalLikes() {
        this.mediasDatas.forEach(m => {
            this.totalLikes += m.likes
        });
    }

    displayMediasContent(section) {
        this.mediasDatas.forEach(media => {
            section.appendChild(this.createMediaElement(media));
        });
    
        this.displayToolTip()
    }

    createMediaElement(data) {
        let {image, video, id, photographerId, title, date, likes} = data;
        let file;    
    
        if(image) {
            file = `assets/photos/${photographerId}/${image}`;
        } else if(video) {
            file = `assets/photos/${photographerId}/${video}`;
        } else {
            return null
        }
    
        const media = document.createElement("div");
        media.classList.add("medias");
        media.setAttribute("id", id);
        media.setAttribute("date", date);
        media.setAttribute("name", title);
    
        if(image) {
            const image = document.createElement("img");
            image.setAttribute("src", file);
            media.appendChild(image);
        }
    
        else if(video) {
            const video = document.createElement("video");
            video.setAttribute("controls", "")
            const source = document.createElement("source");
            source.setAttribute("src", file);
            video.appendChild(source);
            media.appendChild(video);
        }
        
        const mediaText = document.createElement("p");
        mediaText.classList.add("mediaDescription")
        const mediaTitle = document.createElement("h4");
        mediaTitle.classList.add("titre");
        mediaTitle.innerText = `${title}`;
        mediaText.appendChild(mediaTitle);
        const mediaLikes = document.createElement("p");
        mediaLikes.classList.add("mediaLikes")
        mediaLikes.innerHTML = `${likes} <i class="unliked fa-solid fa-heart"></i>`
    
        mediaLikes.addEventListener("click", () => {
            if (mediaLikes.innerHTML === `${likes} <i class="unliked fa-solid fa-heart"></i>`) {
                data.likes += 1;
                this.totalLikes++
                this.reRenderLikes(mediaLikes, data, '+');
            }
            else {
                data.likes -= 1;
                this.totalLikes--
                this.reRenderLikes(mediaLikes, data, '-');
            }
    
            this.displayToolTip()
        });
    
        
        mediaText.appendChild(mediaLikes);
        media.appendChild(mediaText);
        
        return media
    } 

    displayToolTip() {
        const toolTip = document.querySelector(".toolTip");
        
        const toolTipLikes = document.createElement("div");
        toolTipLikes.classList.add("toolTipLikes");
        toolTipLikes.innerHTML = `${this.totalLikes} <i class="fa-solid fa-heart"></i>`;
    
        const toolTipPrice = document.createElement("p");
        toolTipPrice.classList.add("toolTipPrice");
        toolTipPrice.innerHTML = `${this.price}€ / jour`;
       
        toolTip.replaceChildren(toolTipLikes, toolTipPrice);
    }

    reRenderLikes(target, media, operator)  {
        if (operator === '-') {
            target.innerHTML = `${media.likes} <i class="unliked fa-solid fa-heart"></i>`;
        }
        if (operator === '+') {
            target.innerHTML = `${media.likes} <i class="liked fa-solid fa-heart"></i>`;
        }
    }

    createLightbox(media) {

        let {image, video, title, id, photographerId} = media

        const body = document.querySelector("body");
        const top = document.getElementById("header");

        const lightbox = document.querySelector(".lightbox");
        const lightboxMedia = document.querySelector(".lightboxMedia");

        let file;    
    
        if(image) {
            const imageDiv = document.createElement("img");
            file = `assets/photos/${photographerId}/${image}`;
            imageDiv.setAttribute("src", file)
            lightboxMedia.appendChild(imageDiv);
        } else if(video) {
            file = `assets/photos/${photographerId}/${video}`;
            const videoDiv = document.createElement("video");
            videoDiv.setAttribute("controls", "");
            const source = document.createElement("source");
            source.setAttribute("src", file);     
            videoDiv.appendChild(source);
            lightboxMedia.appendChild(videoDiv);
        } else {
            return null
        }

        const mediaTitle = document.createElement("h4");
        mediaTitle.innerHTML = title;
        lightboxMedia.appendChild(mediaTitle)
    
        document.documentElement.scrollTop = top.offsetTop;
        lightbox.style.display = "flex";
        body.style.cssText = "overflow: hidden;";

    }
}
