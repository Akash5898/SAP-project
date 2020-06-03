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

fetch("http://localhost:8000/payslip", requestOptions)
  .then(response => response.json())
  .then(result => {
      const p = document.getElementById('hello');
      const a = document.getElementById('name');
      const b= document.getElementById('contact');
      const c= document.getElementById('basicpay');
      const d = document.getElementById('netpay');
      const e= document.getElementById('pf');
      const f = document.getElementById('ta');
      const g= document.getElementById('ma');
      const h= document.getElementById('da');
      const i= document.getElementById('hra');
  	console.log(result);
  	
    p.textContent = ` Payslip details are as follows `;
                      a.textContent= `Name:${result.EmpName}`;
                      b.textContent= `Contact number:${result.EmpContact}`;
                      c.textContent= `Basicpay:${result.EmpBp}`;
                      e.textContent= `PF:${result.EmpPf}`;
                      f.textContent= `TA:${result.EmpTa}`;
                      g.textContent= `MA:${result.EmpMa}`;
                      h.textContent= `DA:${result.EmpDa}`;
                      i.textContent= `HRA:${result.EmpHra}`;
                      d.textContent= `Netpay:${result.EmpNp}`;
  })
  .catch(error => console.log('error', error));

});