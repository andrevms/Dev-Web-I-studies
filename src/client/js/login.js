import { iconClickListener, contextMenuListener} from './newEntry.js'

const login = async(email, password) => {
    try {
        const res = await fetch(`/login?email=${email}&password=${password}`);
        const data = await res.json()
        .then (data => {
            loadCards(data);
        })
        if(data == false){
            alert("Wrong Username or password");
            return;

        }
        document.getElementById("card").style.display = "none";
        alert("Login successful");
    } catch (error){
        console.error(error);
    }
};

function loadCards(data){
    for (const it of data){
        createCard(it);
    }   
}

function createCard(data){
  //Card container
  const containerCard = document.createElement('div');
  containerCard.setAttribute("class","container-card card-Task");
  
  const taskCard = document.createElement('div');
  taskCard.setAttribute("class","content-layout-card");

  const ctIcon = document.createElement('div');
  const icon = document.createElement('i');

  if(data.isFinish){
    ctIcon.classList.add("finish");
    icon.setAttribute("class","far fa-check-circle fa-lg");
  }else {
    icon.setAttribute("class","far fa-circle fa-lg");
  }
  
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
  if(data.isFinish){
    finishTag.insertAdjacentElement("afterend", containerCard);
  }else{
    finishTag.insertAdjacentElement("beforebegin", containerCard);
  }

  //add Event Listener  
  iconClickListener(ctIcon);
  contextMenuListener(containerCard);
}

function openLogin() {
    document.getElementById("card").style.display = "block";
    document.getElementById("menu").style.width = null;
}
  
function closeLogin() {
    document.getElementById("card").style.display = "none";
}

//Event Listener
document.addEventListener('DOMContentLoaded', async() => {
    try {
        const res = await fetch(`/loadData`);
        //console.log(res);      
    }
      catch (error){
        console.error("Error at loadData");
    }
    /*
        Submit Login event Listener
    */
    document.getElementById("loginForm").addEventListener("submit", async(e) => {
        //prevent page reaload
        e.preventDefault();
        const email = document.getElementById("user-email").value;
        const password = document.getElementById("user-password").value;
        login(email, password);
        document.getElementById("user-email").value = "";
        document.getElementById("user-password").value = "";
    });
});

window.addEventListener('beforeunload', function (e) {
    // Cancel the event
    e.preventDefault(); 
    fetch('/saveJson');
});

export {
    login, openLogin, closeLogin, loadCards, createCard
}

  