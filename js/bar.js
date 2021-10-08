let navigationList = document.querySelectorAll(".navigation__list")
for (let i=0; i<navigationList.length; i++){
    navigationList[i].addEventListener("click" , () =>{
        let j = 0
        while(j < navigationList.length){
            navigationList[j++].className = "navigation__list"
        }
        navigationList[i].className = "navigation__list navigation__active"

})
}
