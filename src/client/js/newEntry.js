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
            //TODO change t for new entry data
        postNewEntry('/newEntry', {t:'testando'})
        .then(data => {
            console.log(data + "estamos aqui");
        })
        
        //turn back to default value at new Task entries
        document.getElementById("newtaskName").value = "";
        newEntry('foi');
    });
});

export { newEntry, postNewEntry}