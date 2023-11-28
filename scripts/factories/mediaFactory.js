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
        this.mediasDatas = medias.filter(m => String(m.photographerId) === String(photographerId));
        this.sortPopular();
    }

    sortPopular() {
        this.mediasDatas.sort(function (a, b) {
            const likesA = a.likes;
            const likesB = b.likes;

            return likesB - likesA;
        });
    }

    sortDate() {
        this.mediasDatas.sort(function (a, b) {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            return dateB - dateA;
        });
    }

    sortTitle() {
        this.mediasDatas.sort(function (a, b) {
            const titleA = a.title;
            const titleB = b.title;

            if (titleA < titleB) {
                return -1;
            }

            return 0;
        });
    }

    setPrice(price) {
        this.price = price;
    }

    setTotalLikes() {
        this.mediasDatas.forEach(m => {
            this.totalLikes += m.likes;
        });
    }

    displayMediasContent(section) {
        section.innerHTML = "";
        this.mediasDatas.forEach(media => {
            section.appendChild(this.createMediaElement(media));
        });
    
        this.displayToolTip();
    }

    createMediaElement(data) {
        let {image, video, id, photographerId, title, likes} = data;
        let file;    
    
        if(image) {
            file = `assets/photos/${photographerId}/${image}`;
        } else if(video) {
            file = `assets/photos/${photographerId}/${video}`;
        } else {
            return null
        }
    
        const media = document.createElement("article");
        media.classList.add("medias");
        media.setAttribute("id", id);
    
        if(image) {
            const image = document.createElement("img");
            image.setAttribute("src", file);
            media.appendChild(image);
        } else if(video) {
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
        mediaLikes.classList.add("mediaLikes");
        if (data.liked) {
            mediaLikes.innerHTML = `${likes} <i class="liked fa-solid fa-heart" mediaId="${media.id}"></i>`;
        } else {
            mediaLikes.innerHTML = `${likes} <i class="unliked fa-solid fa-heart" mediaId="${media.id}"></i>`;
        }
        
        
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

    likeMedia(event) {
        const mediaId = event.target.attributes["mediaid"].value;

        const mediaElement = document.getElementById(mediaId);
        const mediaLikesElement = mediaElement.querySelector(".mediaLikes");
        const mediaDescription = mediaElement.querySelector(".mediaDescription");

        this.mediasDatas.map(m => {
            if (String(m.id) === mediaId) {
                if (!m.liked) {
                    m.liked = true;
                    m.likes += 1;
                    this.totalLikes += 1;
                    mediaLikesElement.innerHTML = `${m.likes} <i class="liked fa-solid fa-heart" mediaId="${m.id}"></i>`;

                } else {
                    m.liked = false;
                    m.likes -= 1;
                    this.totalLikes -= 1;
                    mediaLikesElement.innerHTML = `${m.likes} <i class="unliked fa-solid fa-heart" mediaId="${m.id}"></i>`;
                }        
            }
            
            return m;
        });

        mediaDescription.appendChild(mediaLikesElement);
        mediaElement.appendChild(mediaDescription);
        this.displayToolTip();
    }

    createLightbox(media) {
        let {image, video, title, id, photographerId} = media;
        const body = document.querySelector("body");
        const top = document.getElementById("header");

        const lightbox = document.querySelector(".lightbox");
        const lightboxMedia = document.querySelector(".lightboxMedia");

        let file;
    
        if(image) {
            const imageDiv = document.createElement("img");
            file = `assets/photos/${photographerId}/${image}`;
            imageDiv.setAttribute("src", file);
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
