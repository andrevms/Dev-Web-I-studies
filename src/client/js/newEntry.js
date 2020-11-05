// Function to create UI card new Entry
const newEntry = async (data) => {
  const ctToDo = document.getElementById('ct-ToDo');  
  
  //Card container
  const taskCard = document.createElement('div');

  //creating input checkbox
  const inputCheckBox = document.createElement('input');
  inputCheckBox.setAttribute("type","checkbox");
  inputCheckBox.setAttribute("class","checkTask");

  //adding input checkbox to Card Container
  taskCard.appendChild(inputCheckBox);
  //adding task name
  taskCard.appendChild(document.createTextNode(`${data.task}`));

  //create button to delete
  const delButton = document.createElement('button');
  delButton.setAttribute("class","fal fa-trash");
  taskCard.appendChild(delButton);

  //insert at end of to do list
  ctToDo.insertAdjacentElement("beforeend", taskCard);

  //add Event Listener  
  inputCheckBox.addEventListener("click", (e) => { 
    //If clicked checkBox --> Move to a ct
    const cardTask = inputCheckBox.parentNode; 
    cardTask.remove();
    if(inputCheckBox.checked){
      document.getElementById("ct-Finish").insertAdjacentElement("beforeend", cardTask);
    } else {
      document.getElementById("ct-ToDo").insertAdjacentElement("beforeend", cardTask);
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