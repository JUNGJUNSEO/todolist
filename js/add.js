const popUp = document.querySelector(".popup")
const overlay = popUp.querySelector(".popup__overlay")
const closeBtn = popUp.querySelector(".popup__close")

function openPopUp(){
    popUp.classList.remove("hidden")
}
function closePopUp(){
    popUp.classList.add("hidden")
}
openButton.addEventListener("click",openPopUp)
overlay.addEventListener("click", closePopUp)
closeBtn.addEventListener("click", closePopUp)