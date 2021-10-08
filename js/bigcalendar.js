const mainScreen = document.querySelector(".main-screen")
const calender = document.querySelector(".calender")
const calendarHead = document.querySelector(".calender__top")
const calendarBody = document.querySelector(".calender__down")
const insideTd = document.querySelector(".insidetd")
const table = document.querySelector(".tb")
const hiddenContents = document.querySelectorAll(".hidden-contents")
// const tableDate = document.querySelectorAll(".tb_tbody tr td")
const tableBodyRow = document.querySelectorAll(".calendar-body-tr")

calendarHead.addEventListener("click",() => {
    mainScreen.style.display = "none"
    calender.style.width = "85%"
    calender.style.height = "100%"
    calender.style.padding = 0

    calendarHead.style.display = "none"
    
    calendarBody.style.height = "100%"

    table.style.width = "100%"
    table.style.height = "1000px"
    
    for (let i=0; i<hiddenContents.length; i++){
        hiddenContents[i].style.display = "flex"
    }
    

})