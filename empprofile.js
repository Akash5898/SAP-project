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

fetch("http://localhost:8000/profile", requestOptions)
  .then(response => response.json())
  .then(result => {
    const p = document.getElementById('hello');
    const e= document.getElementById('name');
      const f = document.getElementById('age');
      const g= document.getElementById('contact');
      const h= document.getElementById('designation');
      const i= document.getElementById('address');
  	console.log(result);
    p.textContent = `Profile details`;
    
    e.textContent = ` Name: ${result.EmpName}`;
    i.textContent = `   Address: ${result.EmpAddr}` ;
    g.textContent = `     contact number: ${result.EmpContact}` ;
    f.textContent = `       Age :${result.EmpAge}`;
    h.textContent = `      Designation : ${result.EmpDesi}`;
  })
  .catch(error => console.log('error', error));

});
