const calendarHead = document.querySelector(".calender__top")

function originCalender(){
    const mainScreen = document.querySelector(".main-screen")
    const calender = document.querySelector(".calender")
    const table = document.querySelector(".tb")
    const tableDate = document.querySelectorAll(".tb_tbody td")
    const tableDateDiv = document.querySelectorAll(".tb_tbody td > div")
    const insideDiv = document.querySelectorAll(".insidetd div")
    const hiddenContents = document.querySelectorAll(".hidden-contents")
    const complete = document.querySelectorAll(".complete")
    const leftArrow = document.querySelector(".calender-header__left")
    const rightArrow = document.querySelector(".calender-header__right")

    mainScreen.style.display = "flex"
    calender.style.width = "30%"
    calender.style.padding = "85px 0 0 0"
    
    
    calendarHead.style.display = "block"
    table.style.width = "auto"
    for (let i=0; i<tableDate.length; i++){
        
        tableDate[i].style.height = "auto";
        tableDate[i].style.borderTop = "none";
        tableDateDiv[i].style.maxHeight = "none";
        
    }
    for (let i=0; i<insideDiv.length; i++){
        insideDiv[i].style.display = "block";
    }
    for (let i=0; i<hiddenContents.length; i++){
        hiddenContents[i].style.display = "none"
    }
    for (let i=0; i<complete.length; i++){
        complete[i].style.display = "none"
    }
    leftArrow.addEventListener("click", originCalender);
    rightArrow.addEventListener("click", originCalender);

    big = false
}

function bigCalendar(){
    const mainScreen = document.querySelector(".main-screen")
    const calender = document.querySelector(".calender")
    const table = document.querySelector(".tb")
    const tableDate = document.querySelectorAll(".tb_tbody td")
    const tableDateDiv = document.querySelectorAll(".tb_tbody td > div")
    const insideDiv = document.querySelectorAll(".insidetd div")
    const hiddenContents = document.querySelectorAll(".hidden-contents")
    const complete = document.querySelectorAll(".complete")
    const leftArrow = document.querySelector(".calender-header__left")
    const rightArrow = document.querySelector(".calender-header__right")
    big = true

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
        complete[i].style.display = "flex"
    }

    leftArrow.addEventListener("click", bigCalendar);
    rightArrow.addEventListener("click", bigCalendar);
    
}
calendarHead.addEventListener("click", bigCalendar);

