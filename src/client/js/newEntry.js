// Function to create UI card new Entry
const newEntry = async (data) => {
  //Card container
  const containerCard = document.createElement('div');
  containerCard.setAttribute("class","container-card card-Task");
  
  const taskCard = document.createElement('div');
  taskCard.setAttribute("class","content-layout-card");


  const ctIcon = document.createElement('div');
  const icon = document.createElement('i');
  icon.setAttribute("class","far fa-circle fa-lg")
  ctIcon.appendChild(icon);
  
  //adding input checkbox to Card Container
  taskCard.appendChild(ctIcon);
  //adding task name
  taskCard.appendChild(document.createTextNode(`${data.task}`));

  containerCard.appendChild(taskCard);

  //insert at end of to do list
  const finishTag = document.getElementById('finish-tag');
  finishTag.insertAdjacentElement("beforebegin", containerCard);

  //add Event Listener  
  iconClickListener(ctIcon);
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
    const entry = document.getElementById("container-new-entry");

    //Event Listeners Here
 
    entry.addEventListener("submit", async(e) => {
      /*
        Event listener for submit new entry
      */
        //prevent page reaload
        e.preventDefault();
            
        //post newEntry on server
        postNewEntry('/newEntry', { task: document.getElementById("input-task-entry").value})
        .then(data => {
            console.log(data);
            newEntry(data);
        })
        
        //turn back to default value at new Task entries
        document.getElementById("input-task-entry").value = "";
    });
});

const deleteCard = async(e) => {
  console.log(e);
};

function iconClickListener(el) {
  el.addEventListener("click", (e) => {
    
    //If clicked checkBox --> Move to a ct
    const ctCard = el.parentNode.parentNode; 
    ctCard.remove();

    if(el.classList.contains("finish")){
      
      //remove attr class "finish" 
      el.removeAttribute("class");

      //change icon for circle
      el.firstChild.removeAttribute("class");
      el.firstChild.setAttribute("class","far fa-circle fa-lg");
      
      //move for beforebegin finishTag 
      document.getElementById('finish-tag').insertAdjacentElement("beforebegin", ctCard);
    } else {

      //add attr class "finish"
      el.classList.add("finish");

      //change icon for checked circle
      el.firstChild.removeAttribute("class");
      el.firstChild.setAttribute("class","far fa-check-circle fa-lg");
      
      //move to beforeend container-task
      document.getElementById('container-tasks').insertAdjacentElement("beforeend", ctCard);
    }
  });
}

export { newEntry, postNewEntry, deleteCard }