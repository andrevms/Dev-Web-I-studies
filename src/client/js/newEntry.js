// Function to create UI card new Entry
const newEntry = (texto) => {
    
    alert("try");
    console.log(texto);
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
        //prevent page reaload
        e.preventDefault();
            
        //post newEntry on server
        postNewEntry('/newEntry', { task: document.getElementById("newtaskName").value,
                                    day: document.getElementById("newtaskfinishDate").value
                                  })
        .then(data => {
            console.log(data);
        })
        
        //turn back to default value at new Task entries
        document.getElementById("newtaskName").value = "";
        document.getElementById("newtaskfinishDate").value = "";
    });
});

export { newEntry, postNewEntry}