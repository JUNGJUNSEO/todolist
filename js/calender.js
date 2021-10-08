// CALENDER
const tBody = document.querySelector(".tb_tbody")
const year = document.querySelector(".calender-header__year")
const month = document.querySelector(".calender-header__month")
const leftButton = document.querySelector(".calender-header__left")
const rightButton = document.querySelector(".calender-header__right")


function checkLeapYear(year){
    if(year%400 == 0){
        return true;
    }else if(year%100 == 0){
        return false;
    }else if(year%4 == 0) {
        return true;
    }else{
        return false;
    }
}
function getFirstDayOfWeek(year,month){
    if(month<10){
        month = "0" + month
    }
    return (new Date(year+"-"+month+"-01")).getDay()
}
function changeYearMonth(year,month){
    let month_day = [31,28,31,30,31,30,31,31,30,31,30,31]
    if (month == 2){
        if(checkLeapYear(year)){
            month_day[1] = 29
        }
    }
    let fist_day_of_week = getFirstDayOfWeek(year,month)
    let arr_calender = []
    for(let i=0 ; i<fist_day_of_week ; i++){
        arr_calender.push("")
    }
    for(let i=1 ; i<=month_day[month-1] ; i++){
        arr_calender.push(String(i))
    }
    let remain_day = 7 - (arr_calender.length&7)
    if(remain_day<7){
        for(let i=0 ; i<remain_day ;i++){
            arr_calender.push("")
        }
    }
    renderCalender(arr_calender)
}
function renderCalender(date){
    for(let i=0 ; i<6 ; i++){
        const tr = document.createElement("tr")
        tr.classList = "calendar-body-tr"
        tBody.appendChild(tr)
        for(let j=i*7 ; j<(i+1)*7 ; j++){
            if (j >= date.length){
                break
            }
            const td = document.createElement("td")
            td.innerHTML = `<div class="insidetd"><span>${date[j]}</span><div></div></div>`
            tr.appendChild(td)
            if (date[j] == ""){
                continue
            }
            td.classList = "active"

            // 일요일이면 빨간색 토요일이면 파란색으로 설정.
            const newDate = new Date(current_year,current_month-1,date[j]);
            if(newDate.getDay()==0){
                td.classList.add("sunday")
            }else if(newDate.getDay()==6){
                td.classList.add("saturday")
            }
            td.classList.add(`set_${date[j]}`)
            
            // 일정이 있는 경우 숫자 밑에 빨간색 점을 표시.
            const savedToDos = localStorage.getItem(newDate);
            if (savedToDos !== null) {
                const parsedToDos = JSON.parse(savedToDos);
                let calendarDate = document.querySelector(`.set_${date[j]}`)
                for(let i=0 ; i<parsedToDos.length ; i++){
                    if (parsedToDos[i].color == ''){
                       document.querySelector(`.set_${date[j]} div div`).style.backgroundColor = "var(--red)"    
                    }
                    calendarDate.innerHTML += `<div class="hidden-contents" style="display: none; justify-content: left; align-items: center; font-size: 12px; margin-bottom: 8px; width:100%"><div style="width: 5px; height: 5px; border-radius: 50%; background:${parsedToDos[i].color}; margin-right:5px;"></div><span>${parsedToDos[i].text}</span></div>`
                }
            }
            td.addEventListener("click",setDate)
            
        }

    }
    
}
function deleteTr() {
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
      }
}
function current_calender(current_year,current_month){
    year.value = current_year
    month.value = current_month
    changeYearMonth(current_year,current_month)
    
}
function changMonthLeft(){
    // Month를 -1 함.

    current_month = parseInt(month.value)-1
    if(current_month == 0){
        current_year = current_year-1
        current_month = 12
    }
    deleteTr()
    current_calender(current_year,current_month)
    if (current_month == date.getMonth()+1){
        current_day = date.getDate()
        setColor(date.getDate())
    }
    
    
}
function changMonthRight(){
    // month를 +1 함.

    current_month = parseInt(month.value)+1
    if(current_month == 13){
        current_year = current_year+1
        current_month = 1
    }
    deleteTr()
    current_calender(current_year,current_month)
    if (current_month == date.getMonth()+1){
        current_day = date.getDate()
        setColor(date.getDate())
    }
}
function changMonth(){
    current_month = parseInt(month.value)
    deleteTr()
    current_calender(current_year,current_month)
}
function deleteToDos(){
    while (toDoBody.firstChild) {
     toDoBody.removeChild(toDoBody.firstChild);
    }
}

function setColor(day){
    //지정된 날짜의 스타일을 변경.

    const today = document.querySelector(`.set_${day} div`)
    console.log(today)
    today.style.background = "var(--yellow)"
    today.style.borderRadius ="50%"
    today.style.color = "#ffffff"
}
function removeColor(day){
    //이전에 지정 된 날짜의 스타일을 지워줌.

    const today = document.querySelector(`.set_${day} div`)
    today.style.removeProperty("background")
    today.style.removeProperty("borderRadius")
    today.style.removeProperty("color")

}
function setDate(event){
    // 달력의 날짜 Click시 to do list에 그 날의 할 일을 표시

    removeColor(current_day)
    current_day = event.currentTarget.textContent
    setColor(current_day)
    TODOS_KEY = new Date(current_year,current_month-1,current_day);
    toDos = []
    deleteToDos()
    reCallToDos(TODOS_KEY)
}

const date = new Date();
let current_year = date.getFullYear()
let current_month = date.getMonth()+1
let current_day = date.getDate()
current_calender(current_year,current_month)
setColor(current_day)

leftButton.addEventListener("click",changMonthLeft)
rightButton.addEventListener("click",changMonthRight)
month.addEventListener("change",changMonth)

// TO DO list
const toDoForm = document.querySelector(".todo__form");
const toDoInput = document.querySelector(".todo__form input");
const toDodetail = document.querySelector(".todo__detail")
const toDoBody = document.querySelector(".todo__body");

const openButton = document.querySelector(".todo__popup")

let TODOS_KEY = new Date(current_year,current_month-1,current_day);
let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const tr = event.target.parentElement.closest(":not(div)").parentElement;
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(tr.id));
    tr.remove();
    saveToDos();
    deleteTr()
    current_calender(current_year,current_month)
    setColor(current_day)
      
}

function stateToDo(curState){
    
    const td = curState.closest(":not(div)")
    const tr = td.parentElement
    for(let i=0 ; i<toDos.length ; i++){
        if (toDos[i].id == tr.id) {
            let statecolor ="";
            if (curState.firstChild.classList == "check"){
                statecolor = "#ed7072"
            }else if(curState.firstChild.classList == "arrow-right"){
                statecolor = "#7811fe"
            }
            tr.firstChild.style.backgroundColor = statecolor
            
            toDos[i].state = curState.outerHTML;
            toDos[i].color = statecolor
            saveToDos();
            deleteToDos()
            reCallToDos(TODOS_KEY)
            deleteTr()
            current_calender(current_year,current_month)
            setColor(current_day)
            break
        }
    }
    
    
}
function processToDo(event){
    const curState = event.currentTarget
    console.log(curState)
    stateToDo(curState)
}
function completeToDo(event){
    const curState = event.currentTarget
    const tr = event.target.parentElement.closest(":not(div)").parentElement
    tr.children[2].style.textDecoration = "line-through"
    stateToDo(curState)
    


}

//edit
const edit = document.querySelector(".edit")
const editOverlay = edit.querySelector(".edit__overlay")
const editCloseBtn = edit.querySelector(".edit__close")
const editForm = edit.querySelector(".edit__form")
const editInput = edit.querySelector(".edit__form input")
const editOption = edit.querySelector(".edit__option")
const editImportance = edit.querySelector(".edit__importance")
const editDetail = edit.querySelector(".edit__detail")
let inputId
function editToDoSubmit(event){
    
    event.preventDefault();
    for(let i=0 ; i<toDos.length ; i++){
        if (toDos[i].id == inputId) {
            toDos[i].text = editInput.value;
            toDos[i].sequence = editImportance.value;
            toDos[i].content = editDetail.value;
            saveToDos();
            deleteToDos() 
            reCallToDos(TODOS_KEY) //수정 가능
            break
        }
    }
    closeEdit()
}
function openEdit(event){
    edit.classList.remove("edit__hidden")
    const tr = event.target.parentElement.closest(":not(div)").parentElement
    inputId = tr.id
    for(let i=0 ; i<toDos.length ; i++){
        if (toDos[i].id == inputId) {
            editInput.value = toDos[i].text;
            editImportance.value = toDos[i].sequence;
            editDetail.value = toDos[i].content;
            break
        }
    }

}
function closeEdit(){
    edit.classList.add("edit__hidden")
}

editOverlay.addEventListener("click", closeEdit)
editCloseBtn.addEventListener("click", closeEdit)
editForm.addEventListener("submit", editToDoSubmit)

let delayId
let delayCurState

function delayToDo(event){

    // 일정을 연기
    opendelay()
    const tr = event.currentTarget.closest(":not(div)").parentElement
    delayId = tr.id
    delayCurState = event.currentTarget
    
    console.log(delayCurState)
    delayDate.value = `${String(TODOS_KEY.getFullYear())}-${String(TODOS_KEY.getMonth()+1).padStart(2, "0")}-${String(TODOS_KEY.getDate()).padStart(2, "0")}`
}
function appearState(event) {
    event.target.children[1].style.display = "flex"
}
function disappearState(event) {
    event.target.children[1].style.display = "none"
 }
function handleMouseEnter(event){
    // 마우스를 table tr에 올리면 숨겨진 아이콘들이 나오게 만듬.
    const tdLastFirstDiv = event.target.lastChild.firstChild;
    const tdLastsecondDiv = event.target.lastChild.lastChild;
    tdLastFirstDiv.style.display = "none";
    tdLastsecondDiv.style.display = "flex";
}
function handleMouseLeave(event){
    // 마우스를 table tr에 올리면 숨겨진 아이콘들이 사라지게 만듬.
    const tdLastFirstDiv = event.target.lastChild.firstChild;
    const tdLastElement = event.target.lastChild.lastChild;
    tdLastFirstDiv.style.display = "flex"
    tdLastElement.style.display = "none";
    
}

const content = document.querySelector(".content")
const contentOverlay = content.querySelector(".content__overlay")
const contentCloseBtn = content.querySelector(".content__close")
const contentTitle = content.querySelector(".content__title")
const contentDetail = content.querySelector(".content__detail")
function opencontents(event){
    // show contents

    content.classList.remove("content__hidden")
    const tr = event.target.parentElement
    for(let i=0 ; i<toDos.length ; i++){
        if (toDos[i].id == tr.id) {
            contentTitle.value = toDos[i].text;
            contentDetail.value = toDos[i].content;
            break
        }
    }
    
}
function closecontents(){  
    // close content
    
    content.classList.add("content__hidden")
}
contentOverlay.addEventListener("click",closecontents)
contentCloseBtn.addEventListener("click",closecontents)

function paintToDo(newTodo) {
    // LocalStorage에 저장된 값을 화면에 보여 줌.

    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td")
    const td4 = document.createElement("td")
    const divChild1 = document.createElement("div");
    const divChild2 = document.createElement("div");
    divChild1.classList = "div__child1"
    divChild2.classList = "div__child2"
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");
    const div4 = document.createElement("div");
    const div5 = document.createElement("div");

    div1.innerHTML = "<div class='spinner'><i class='fas fa-spinner fa-lg'></i></div><div><span>진행중</span></div>";
    div2.innerHTML = "<div class='check'><i class='fas fa-check fa-lg'></i></i></div><div><span>완료</span></div>";
    div3.innerHTML = "<div class='arrow-right'><i class='fas fa-arrow-right fa-lg'></i></i></i></div><div><span>연기</span></div>";
    div4.innerHTML = "<div><i class='fas fa-edit fa-lg'></i></i></i></i></div><div><span>편집</span></div>";
    div5.innerHTML = "<div class='trash'><i class='fas fa-trash fa-lg'></i></i></i></i></i></div><div><span>지우기</span></div>";;


    div1.addEventListener("click", processToDo);
    div2.addEventListener("click", completeToDo);
    div3.addEventListener("click", delayToDo);
    div4.addEventListener("click", openEdit);
    div5.addEventListener("click", deleteToDo);

    div1.addEventListener("mouseenter",appearState);
    div1.addEventListener("mouseleave",disappearState);
    div2.addEventListener("mouseenter",appearState);
    div2.addEventListener("mouseleave",disappearState);
    div3.addEventListener("mouseenter",appearState);
    div3.addEventListener("mouseleave",disappearState);
    div4.addEventListener("mouseenter",appearState);
    div4.addEventListener("mouseleave",disappearState);
    div5.addEventListener("mouseenter",appearState);
    div5.addEventListener("mouseleave",disappearState);

    divChild2.appendChild(div1);
    divChild2.appendChild(div2);
    divChild2.appendChild(div3);
    divChild2.appendChild(div4);
    divChild2.appendChild(div5);

    

    tr.id = newTodo.id;
    tr.addEventListener("mouseenter", handleMouseEnter)
    tr.addEventListener("mouseleave", handleMouseLeave)

    td1.addEventListener("click",opencontents)
    td2.addEventListener("click",opencontents)
    td3.addEventListener("click",opencontents)

    
    td1.style.backgroundColor = newTodo.color;
    td2.innerText = newTodo.sequence;
    td3.innerText = newTodo.text;
    divChild1.innerHTML = newTodo.state;


    td4.appendChild(divChild1)
    td4.appendChild(divChild2)
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    toDoBody.appendChild(tr);

}
// const hiddenTextBox = document.querySelector(".div__child2 div div:last-child")
// hiddenTextBox.addEventListener("mouseleave", () => hiddenTextBox.style.display="none")
// const hiddenIcon = document.querySelector(".div__child2 div div:first-child")
// hiddenIcon.addEventListener("mouseenter", () => hiddenTextBox.style.display="block")


function handleToDoSubmit(event) {
    // 입력받은 값을 localstorage에 저장하고 보여줌.

    event.preventDefault();
    const newTodo = toDoInput.value;
    const importance = document.querySelector(".todo__importance");
    const newContent = toDodetail.value;
    toDoInput.value = "";
    toDodetail.value ="";
    const newTodoObj = {
        color:"",
        sequence: importance.value,
        text: newTodo,
        state: "<div><i class='fas fa-spinner fa-lg'></i></div><div><span>진행 중</span></div>",
        id: Date.now(),
        content: newContent
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
    deleteTr()
    current_calender(current_year,current_month)
    setColor(current_day)
}

toDoForm.addEventListener("submit", handleToDoSubmit);

function reCallToDos(key){
    // local storage에 저장된 값을 불러옴.
    
    const toDoDay = document.querySelector(".todo__day")
    toDoDay.innerText = String(key.getDate()).padStart(2, "0")

    const day = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"]
    const toDoDate = document.querySelector(".todo__date span:first-child");
    const toDoMonth = document.querySelector(".todo__date span:last-child");
    toDoDate.innerText = day[key.getDay()]
    toDoMonth.innerText = `${String(key.getFullYear())}년${String(key.getMonth()+1).padStart(2, "0")}월`;

    const savedToDos = localStorage.getItem(key);
    if (savedToDos !== null) {
      const parsedToDos = JSON.parse(savedToDos);
      toDos = parsedToDos;
      parsedToDos.forEach(paintToDo);
    }
}



reCallToDos(TODOS_KEY)
