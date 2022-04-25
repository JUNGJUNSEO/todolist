const calendarHead = document.querySelector(".calender__top")

function bigCalendar(){
    const mainScreen = document.querySelector(".main-screen")
    const calender = document.querySelector(".calender")
    const table = document.querySelector(".tb")

    const tableDate = document.querySelectorAll(".tb_tbody td")
    const tableDateDiv = document.querySelectorAll(".tb_tbody td > div")
    const insideDiv = document.querySelectorAll(".insidetd div")
    const hiddenContents = document.querySelectorAll(".hidden-contents")


    const complete = document.querySelectorAll(".complete")
    const tdBox = document.querySelectorAll(".tdbox")

    mainScreen.style.display = "none"
    calender.style.width = "85%"
    calender.style.padding = "15px"
    
    calendarHead.style.display = "none"
    table.style.width = "100%"
    for (let i=0; i<tableDate.length; i++){
        
        tableDate[i].style.height =  "180px"
        tableDateDiv[i].style.maxHeight =  "180px"
        tableDate[i].style.borderTop = "2px solid var(--backgroundcolor)"
    }
    for (let i=0; i<insideDiv.length; i++){
        insideDiv[i].style.display = "none"
    }
    for (let i=0; i<hiddenContents.length; i++){
        hiddenContents[i].style.display = "flex"
    }
    for (let i=0; i<complete.length; i++){
        tdBox[i].style.position = "absolute";
        complete[i].style.display = "flex"
    }

}
calendarHead.addEventListener("click", bigCalendar)
