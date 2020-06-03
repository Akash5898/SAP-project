const input = document.querySelector('#empID');
const button = document.querySelector('#search');

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");



button.addEventListener('click', function(event) {
	const id = input.value;
	const raw = JSON.stringify({empId: id});
	const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8000/leavedisplay", requestOptions)
  .then(response => response.json())
  .then(result => {
    const p = document.getElementById('hello');
    const e = document.getElementById('count');
    const f= document.getElementById('cl');
      const g = document.getElementById('sl');
      const h= document.getElementById('pl');
      
  	console.log(result);
    p.textContent = `Profile details`;
    
    e.textContent = ` Number of leave taken: ${result.count}`;
    f.textContent = `   CL: ${result.cl}` ;
    g.textContent = `    SL: ${result.sl}` ;
    h.textContent = `       PL :${result.pl}`;
    
  })
  .catch(error => console.log('error', error));

});
