// Function to create UI card new Entry
const newEntry = async (data) => {
  const ctToDo = document.getElementById('ct-ToDo');  
  
  //Card container
  const containerCard = document.createElement('div');
  containerCard.setAttribute("class","card");
  
  const taskCard = document.createElement('div');
  taskCard.setAttribute("class","cardTask");

  const ctIcon = document.createElement('div');
  const icon = document.createElement('i');
  icon.setAttribute("class","far fa-circle fa-lg iColor")
  ctIcon.appendChild(icon);
  
  //adding input checkbox to Card Container
  taskCard.appendChild(ctIcon);
  //adding task name
  taskCard.appendChild(document.createTextNode(`${data.task}`));

  containerCard.appendChild(taskCard);

  //insert at end of to do list
  ctToDo.insertAdjacentElement("beforeend", containerCard);

  //add Event Listener  
  ctIcon.addEventListener("click", (e) => { 
    //If clicked checkBox --> Move to a ct
    const ctCard = ctIcon.parentNode.parentNode; 
    ctCard.remove();
    if(ctIcon.classList.contains("finish")){
      ctIcon.removeAttribute("class");
      document.getElementById("ct-ToDo").insertAdjacentElement("beforeend", ctCard);
    } else {
      ctIcon.classList.add("finish");
      document.getElementById("ct-Finish").insertAdjacentElement("beforeend", ctCard);
    }
   
  });
};

// Function to POST newEntry
const postNewEntry = async (url = '', data = {}) => {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data)
    });
      
    try {
      //await server post response ()   
      const newData = await response.json();
      return newData;
    } catch(error) {
      console.log('error : '+ error);
    }
};

//Event Listener
document.addEventListener('DOMContentLoaded', () => {
    const entry = document.getElementById("ct-newEntry");

    //Event Listeners Here
    
    entry.addEventListener("submit", async(e) => {
      /*
        Event listener for submit new entry
      */
        //prevent page reaload
        e.preventDefault();
            
        //post newEntry on server
        //let taskDay = document.getElementById("newtaskfinishDate");
        postNewEntry('/newEntry', { task: document.getElementById("newtaskName").value,
                                   // day: (taskDay.value == null) ? new Date.now() : taskDay.value
                                  })
        .then(data => {
            console.log(data);
            newEntry(data);
        })
        
        //turn back to default value at new Task entries
        document.getElementById("newtaskName").value = "";
       // document.getElementById("newtaskfinishDate").value = "";
    });

});

const deleteCard = async(e) => {
  console.log(e);
};

export { newEntry, postNewEntry, deleteCard}