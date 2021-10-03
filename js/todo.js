function todo(year,month,day){
  
  const toDoForm = document.querySelector(".todo__form");
  const toDoInput = document.querySelector(".todo__form input");
  const toDoList = document.querySelector(".todo__list");
  
  const TODOS_KEY = new Date(year+"-"+month+"-"+day);
  
  let toDos = [];
  
  function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
  }
  
  function deleteToDo(event) {
    const li = event.target.parentElement;
    li.style.textDecoration = "line-through";
    
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
  }
  
  function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
  
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox") 
    input.addEventListener("click", deleteToDo);
  
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    
    li.appendChild(input);
    li.appendChild(span);
    toDoList.appendChild(li);
  }
  function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
      text: newTodo,
      id: Date.now(),
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
  }
  
  toDoForm.addEventListener("submit", handleToDoSubmit);
  
  const savedToDos = localStorage.getItem(TODOS_KEY);
  
  if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
  }
}
