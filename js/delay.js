const delay = document.querySelector(".delay")
const delayOverlay = delay.querySelector(".delay__overlay")
const delayCloseBtn = delay.querySelector(".delay__close")
const delayDate = delay.querySelector('input[type="date"]')
const delayButton = delay.querySelector(".delay__button")


function opendelay(){
    delay.classList.remove("delay__hidden")
}
function closedelay(){
    delay.classList.add("delay__hidden")
}
delayOverlay.addEventListener("click", closedelay)
delayCloseBtn.addEventListener("click", closedelay)


function delaySubmit(event){
    event.preventDefault()
    const key = new Date(delayDate.value.replace('-',','))

    const savedToDos = localStorage.getItem(key);
  
    for(let i=0 ; i<toDos.length ; i++){
        
        if (toDos[i].id == delayId){
            toDos[i].color = ""
            
            if (savedToDos !== null){

                const parsedToDos = JSON.parse(savedToDos);
                
                parsedToDos.push(toDos[i])
                localStorage.setItem(key, JSON.stringify(parsedToDos));
            }
            else {
        
                localStorage.setItem(key, JSON.stringify([toDos[i]]));
            }     
        break}
    }
    closedelay()
    delayCurState.innerHTML = `<div class='arrow-right'><i class='fas fa-arrow-right fa-lg'></i></i></i></div><div><span>${delayDate.value} 로 연기</span></div>`
    stateToDo(delayCurState)
    
}



delayButton.addEventListener("click", delaySubmit)
