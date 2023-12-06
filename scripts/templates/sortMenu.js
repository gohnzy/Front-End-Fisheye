// Création DOM menu de tri
export function displaySortMenu() {
    const insertAfter = document.querySelector(".photographerHeader");
    const sortMenu = document.createElement("div");
    sortMenu.classList.add("sortMenu");
    sortMenu.innerHTML = `<h4>Trier par</h4>
    <ul class="dropdownMenu" tabindex="0">
        <i class="fa-solid fa-chevron-up" aria-hidden="true"></i>
        <li class="popularDiv" tabindex="0">Popularité</li>
        <li class="dateDiv" tabindex="0">Date</li>
        <li class="titleDiv" tabindex="0">Titre</a></li>
    </ul>`;
    insertAfter.parentNode.insertBefore(sortMenu, insertAfter.nextElementSibling);
}