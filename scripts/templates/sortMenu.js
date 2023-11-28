// Création DOM menu de tri
export function displaySortMenu() {
    const insertAfter = document.querySelector(".photographerHeader");
    const sortMenu = document.createElement("div");
    sortMenu.classList.add("sortMenu");
    sortMenu.innerHTML = `<h4>Trier par</h4>
    <ul class="dropdownMenu">
        <i class="fa-solid fa-chevron-up"></i>
        <li class="popularDiv">Popularité</li>
        <li class="dateDiv">Date</li>
        <li class="titleDiv">Titre</a></li>
    </ul>`;
    insertAfter.parentNode.insertBefore(sortMenu, insertAfter.nextElementSibling);
}