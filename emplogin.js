const form = document.querySelector("#user");

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

form.addEventListener("submit", event => {
  event.preventDefault();
  let empID = event.target.elements.empID.value;
  let pass = event.target.elements.pass.value;

  const raw = JSON.stringify({empID, pass})
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
 
  fetch("http://localhost:8000/emplogin", requestOptions)
    .then(response => response.json())
    .then(result => {
      const p = document.getElementById('hello');
        console.log(result);
    p.textContent = `success`;
     
   
    })
    .catch(error => console.log('error', error));
 
  });
