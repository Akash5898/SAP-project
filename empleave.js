const input = document.querySelector('#empID');
const input1 = document.querySelector('#name');
const input2 = document.querySelector('#nod');
const input3 = document.querySelector('#others2');
const input4 = document.querySelector('#start');
const input5 = document.querySelector('#end');
const input6 = document.querySelector('#reason');
const input7 = document.querySelector('#hrname');
const button = document.querySelector('#submit');

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");



button.addEventListener('click', function(event) {
    const id = input.value;
    const name = input.value;
    const nod = input.value;
    const reason = input.value;
    const start = input.value;
    const end = input.value;
    const hrname = input.value;
    const type = input.value;
	const raw = JSON.stringify({empId: id},{name: name},{nod: nod},{reason: reason},{start: start},{end: end},{hrname: hrname},{others2: type});
	const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8000/empleaverequest", requestOptions)
  .then(response => response.json())
  .then(result => {
    const p = document.getElementById('hello');
  	console.log(result);
    p.textContent = `Updated`;
    
 
  })
  .catch(error => console.log('error', error));

});