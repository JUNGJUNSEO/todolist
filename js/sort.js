function orderToDo(){
    // ToDOList를 정렬
    
    deleteToDos()
    const savedToDos = localStorage.getItem(TODOS_KEY);
    if (savedToDos !== null) {
      const parsedToDos = JSON.parse(savedToDos);
      toDos = parsedToDos;
      toDos.sort(function(a, b) {
        const sequenceA = a.sequence.toUpperCase(); 
        const sequenceB = b.sequence.toUpperCase(); 
        if (sequenceA < sequenceB) {
          return -1;
        }
        if (sequenceA > sequenceB) {
          return 1;
        }
        return 0;
      });
      toDos.forEach(paintToDo);
    }
    saveToDos()
}

function appearSort(){
    toDoOrderSpan.style.display = "flex";
}
function disappearSort(){
    toDoOrderSpan.style.display = "none";
}
const toDoOrder = document.querySelector(".todo__order button");
const toDoOrderSpan = document.querySelector(".todo__order span");

toDoOrder.addEventListener("mouseenter" ,appearSort);
toDoOrder.addEventListener("mouseleave" ,disappearSort);
toDoOrder.addEventListener("click", orderToDo);

