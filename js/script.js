/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const header = document.querySelector('header.header')
header.insertAdjacentHTML(
   'beforeend',
   `<label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
 </label>`
)

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page = 1) {
   const startindex = (page * 9) - 9
   const endindex = page * 9
   let ul = document.querySelector('ul.student-list')
   ul.innerHTML = ''

   for (i=0; i < list.length; i++) {
      if (i >= startindex && i < endindex) {
         ul.insertAdjacentHTML(
            'beforeend',
            `<li class="student-item cf">
            <div class="student-details">
              <img class="avatar" src="${list[i].picture["large"]}" alt="Profile Picture">
              <h3>${list[i].name["first"]} ${list[i].name["last"]}</h3>
              <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
              <span class="date">Joined ${list[i].registered["date"]}</span>
            </div>
          </li>`
         );
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   let ul = document.querySelector('ul.link-list')
   ul.innerHTML = ''

   // Inserted the wanted number of buttons
   ul.insertAdjacentHTML(
      'afterbegin',
      `<li>
         <button type="button" class="active">${1}</button>
      </li>`
   )
   
   // A for loop that is iterating over all the objects inside the data variable in each page
   for(i=1; i < Math.ceil(list.length / 9); i++) {
   ul.insertAdjacentHTML(
      'beforeend',
      `<li>
         <button type="button">${i + 1}</button>
      </li>`
   )
   }

   // Created an event listener that listens for button clicks and navigates through pages
   ul.addEventListener('click', function(event){
      if(event.target.tagName === "BUTTON") {
         //Styles the buttons
         document.querySelector('.active').removeAttribute("class")
         event.target.className = "active"

         // Makes the buttons navigate through pages
         showPage(list, event.target.textContent)
      }
   })
}


// Call functions
showPage(data)
addPagination(data)

function searchFunc() {
   let filteredStudents = []
   const h3 = '<h3>404. No matching results found</h3>'
   const ul = document.querySelector('ul.student-list')

   for(i=0; i < data.length; i++) {
      if(`${data[i].name.first} ${data[i].name.last}`.toUpperCase().includes(search.value.toUpperCase())) {
         filteredStudents.push(data[i]) 
      }
   }
   
   if(!filteredStudents) {
      ul.innerHTML = h3
   } else if (ul.innerHTML !== h3) {
      showPage(filteredStudents)
   }
}

const search = document.querySelector('input#search')
const label = document.querySelector('label.student-search')

search.addEventListener('keyup', searchFunc)
label.addEventListener('submit', searchFunc)