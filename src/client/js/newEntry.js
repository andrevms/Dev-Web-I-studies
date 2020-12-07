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
  const task = document.createElement('span');
  task.innerHTML = data.taskname;
  taskCard.appendChild(task);

  containerCard.appendChild(taskCard);

  //insert at end of to do list
  const finishTag = document.getElementById('finish-tag');
  finishTag.insertAdjacentElement("beforebegin", containerCard);

  //add Event Listener  
  iconClickListener(ctIcon);
  contextMenuListener(containerCard);
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
    const now = new Date;
    document.getElementById("dayDisplay").innerHTML = now.toDateString();

    //Event Listeners Here
 
  entry.addEventListener("submit", async(e) => {
    /*
      Event listener for submit new entry
    */
    //prevent page reaload
    e.preventDefault();
    
    //Check if if user loged in
    const logedResponse = await fetch(`/loged`);
    const isLoged = await logedResponse.json();
    if(isLoged){
      //Post new entry 
      postNewEntry('/newEntry', { "taskname": document.getElementById("input-task-entry").value,
                               "isFinish": false})
      .then(async data => {
        newEntry(data);
      })
    }else {
      alert("Please Login first");
    }
        
    //turn back to default value at new Task entries
    document.getElementById("input-task-entry").value = "";
  });
  
  window.addEventListener("click", (e) =>{
    document.getElementById("context-menu").classList.remove("active");
  });
});

const removeCard = async (url = '', data = {}) => {
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

const deleteCard = async(e) => {
  for (const container of e.path){
    if( container.classList.contains("container-card", "card-Task")  ) {
      const isFinish = !container.firstChild.firstChild.firstChild.classList.contains('fa-circle');
      const taskname = container.firstChild.lastChild.innerHTML;
      removeCard(`/deleteCard?taskname=${taskname}&isFinish=${isFinish}`);
      document.getElementById("container-tasks").removeChild(container);
      return;
    }
  }
};


function iconClickListener(el) {
  el.addEventListener("click", (e) => {
    //If clicked checkBox --> Move to a ct
    const ctCard = el.parentNode.parentNode; 
    ctCard.remove();
    //change at json file
    const taskname = el.parentNode.lastChild.innerHTML;
    const attIsFinish = fetch(`/attIsFinish?taskname=${taskname}`);

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


function contextMenuListener(containerCard) {
  containerCard.addEventListener("contextmenu", (e)=> {
    e.preventDefault();
    const contextElement = document.getElementById("context-menu");
    
    contextElement.style.top = e.pageY + "px";
    contextElement.style.left = e.pageX + "px";
    contextElement.classList.add("active");

    //att if click to remove card clicked
    //console.log(e);
    document.getElementById("deleteCard").onclick = () => { deleteCard(e); };
  });
}

export { newEntry, postNewEntry, deleteCard, iconClickListener, contextMenuListener}