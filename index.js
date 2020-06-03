const express = require('express');
const bodyParser = require('body-parser');
var http = require('follow-redirects').http;
const cors = require('cors');
var fs = require('fs');
const parser = require('xml-js');

app = express();

app.use(bodyParser.json());
app.use(cors());

var empoptions = {
	'method': 'POST',
	'port': 50000,
	'host': 'dxktpipo.kaarcloud.com',
	'path': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_Employee_SBIS&receiverParty=&receiverService=&interface=SI_EmployeeLogin_Req&interfaceNamespace=http://employee.com/login',
	'headers': {
		'Content-Type': 'application/xml',
		'Authorization': 'Basic UE9VU0VSOkthYXJAUE8yMDIw',
	},
	'maxRedirects': 20
};

app.post('/profile', (req, res) => {
	const empID = req.body.empId;
	const postData =  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:log="http://employee.com/login">
	<soapenv:Header/>
	<soapenv:Body>
	   <log:MT_EmloyeeLogin_Req>
		  <EmployeeId>${empID}</EmployeeId>
	   </log:MT_EmloyeeLogin_Req>
	</soapenv:Body>
 </soapenv:Envelope>`;
	const req1 = http.request(empoptions, function (res1) {
		const chunks = [];

		res1.on("data", function (chunk) {
			chunks.push(chunk);
		});

		res1.on("end", function (chunk) {
			const body = Buffer.concat(chunks);
			const xml = body.toString();
			const data = parser.xml2json(xml, {compact: true, spaces: 4});
			const resp = JSON.parse(data)['SOAP:Envelope']['SOAP:Body']['ns0:MT_EmloyeeLogin_Resp'];
			res.send({
				EmpName: resp['Name']['_text'],
				EmpAge: resp['Age']['_text'],
				EmpAddr: resp['Address']['_text'],
				EmpDesi:resp['Designation']['_text'],
				EmpContact:resp['Contact']['_text']

			});
		});

		res1.on("error", function (error) {
			console.error(error);
		});
	});

	req1.write(postData);

	req1.end();
});



var emppayoptions = {
	'method': 'POST',
	'port': 50000,
	'host': 'dxktpipo.kaarcloud.com',
	'path': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_Employee_SBIS&receiverParty=&receiverService=&interface=SI_EmployeePayslip_Req&interfaceNamespace=http://employee.com/payslip',
	'headers': {
		'Content-Type': 'application/xml',
		'Authorization': 'Basic UE9VU0VSOkthYXJAUE8yMDIw',
	},
	'maxRedirects': 20
};

app.post('/payslip', (req, res) => {
	const empID = req.body.empId;
	const postData =  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pay="http://employee.com/payslip">
	<soapenv:Header/>
	<soapenv:Body>
	   <pay:MT_EmployeePayslip_Req>
		  <EmployeeId>${empID}</EmployeeId>
	   </pay:MT_EmployeePayslip_Req>
	</soapenv:Body>
 </soapenv:Envelope>`;
	const req1 = http.request(emppayoptions, function (res1) {
		const chunks = [];

		res1.on("data", function (chunk) {
			chunks.push(chunk);
		});

		res1.on("end", function (chunk) {
			const body = Buffer.concat(chunks);
			const xml = body.toString();
			const data = parser.xml2json(xml, {compact: true, spaces: 4});
			const resp = JSON.parse(data)['SOAP:Envelope']['SOAP:Body']['ns0:MT_EmployeePayslip_Resp'];
			res.send({
				EmpName: resp['EmployeeName']['_text'],
				EmpBp: resp['BasicPay']['_text'],
				EmpDa: resp['DA']['_text'],
				EmpHra:resp['HRA']['_text'],
				EmpContact:resp['Contact']['_text'],
				EmpPf:resp['PF']['_text'],
				EmpTa:resp['TA']['_text'],
				EmpMa:resp['MA']['_text'],
				EmpNp:resp['Net_Pay']['_text']

			});
		});

		res1.on("error", function (error) {
			console.error(error);
		});
	});

	req1.write(postData);

	req1.end();
});





var leavedisplayoptions = {
	'method': 'POST',
	'port': 50000,
	'host': 'dxktpipo.kaarcloud.com',
	'path': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_Employee_SBIS&receiverParty=&receiverService=&interface=SI_leavedisp_Req&interfaceNamespace=http://employee.com/leavedisplay1',
	'headers': {
		'Content-Type': 'application/xml',
		'Authorization': 'Basic UE9VU0VSOkthYXJAUE8yMDIw',
	},
	'maxRedirects': 20
};

app.post('/leavedisplay', (req, res) => {
	const empID = req.body.empId;
	const postData =  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:leav="http://employee.com/leavedisplay1">
	<soapenv:Header/>
	<soapenv:Body>
	   <leav:MT_leavedisp_Req>
		  <EmployeeId>${empID}</EmployeeId>
	   </leav:MT_leavedisp_Req>
	</soapenv:Body>
 </soapenv:Envelope>`;
	const req1 = http.request(leavedisplayoptions, function (res1) {
		const chunks = [];

		res1.on("data", function (chunk) {
			chunks.push(chunk);
		});

		res1.on("end", function (chunk) {
			const body = Buffer.concat(chunks);
			const xml = body.toString();
			const data = parser.xml2json(xml, {compact: true, spaces: 4});
			const resp = JSON.parse(data)['SOAP:Envelope']['SOAP:Body']['ns0:MT_leavedisp_Resp'];
			res.send({
				count: resp['Count']['_text'],
				cl: resp['CL']['_text'],
				sl: resp['SL']['_text'],
				pl:resp['PL']['_text'],
			

			});
		});

		res1.on("error", function (error) {
			console.error(error);
		});
	});

	req1.write(postData);

	req1.end();
});



var emploginoptions = {
	'method': 'POST',
	'port': 50000,
	'host': 'dxktpipo.kaarcloud.com',
	'path': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_Employee_SBIS&receiverParty=&receiverService=&interface=SI_dkemployeelogin_req&interfaceNamespace=http://dk.com/employeelogin/',
	'headers': {
		'Content-Type': 'application/xml',
		'Authorization': 'Basic UE9VU0VSOkthYXJAUE8yMDIw',
	},
	'maxRedirects': 20
};

app.post('/emplogin', (req, res) => {
	const empID = req.body.empID;
	const pass = req.body.pass;
	
	const postData =  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:emp="http://dk.com/employeelogin/">
	<soapenv:Header/>
	<soapenv:Body>
	   <emp:MT_dkemployeelogin_req>
		  <EMPID>${empID}</EMPID>
		  <PWD>${pass}</PWD>
	   </emp:MT_dkemployeelogin_req>
	</soapenv:Body>
 </soapenv:Envelope>`;
	const req1 = http.request(emploginoptions, function (res1) {
		const chunks = [];

		res1.on("data", function (chunk) {
			chunks.push(chunk);
		});

		res1.on("end", function (chunk) {
			const body = Buffer.concat(chunks);
			const xml = body.toString();
			const data = parser.xml2json(xml, {compact: true, spaces: 4});
			const resp = JSON.parse(data)['SOAP:Envelope']['SOAP:Body']['ns0:MT_dkemployeelogin_res'];
			res.send({
			

			});
		});

		res1.on("error", function (error) {
			console.error(error);
		});
	});

	req1.write(postData);

	req1.end();
});




var empleaveoptions = {
	'method': 'POST',
	'port': 50000,
	'host': 'dxktpipo.kaarcloud.com',
	'path': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_Employee_SBIS&receiverParty=&receiverService=&interface=SI_EMPLOYEELEAVE_REQ&interfaceNamespace=http://employee.com/leaverequest',
	'headers': {
		'Content-Type': 'application/xml',
		'Authorization': 'Basic UE9VU0VSOkthYXJAUE8yMDIw',
	},
	'maxRedirects': 20
};

app.post('/empleaverequest', (req, res) => {
	const empID = req.body.id;
	const name = req.body.name;
	const nod = req.body.nod;
	const start = req.body.from;
	const end = req.body.to;
	const reason = req.body.purpose;
	const hrname = req.body.hrname;
	const type = req.body.type;
	const postData =  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:leav="http://employee.com/leaverequest">
	<soapenv:Header/>
	<soapenv:Body>
	   <leav:MT_EMPLOYEELEAVE_REQ>
		  <EMP_ID>${empID}</EMP_ID>
		  <NAME>${name}</NAME>
		  <PURPOSE>${reason}</PURPOSE>
		  <NO_OF_DAYS>${nod}</NO_OF_DAYS>
		  <FROM>${start}</FROM>
		  <TO>${end}</TO>
		  <HR_NAME>${hrname}</HR_NAME>
		  <LEAVE_TYPE>${type}</LEAVE_TYPE>
	   </leav:MT_EMPLOYEELEAVE_REQ>
	</soapenv:Body>
 </soapenv:Envelope>`;
	const req1 = http.request(empleaveoptions, function (res1) {
		const chunks = [];

		res1.on("data", function (chunk) {
			chunks.push(chunk);
		});

		res1.on("end", function (chunk) {
			const body = Buffer.concat(chunks);
			const xml = body.toString();
			const data = parser.xml2json(xml, {compact: true, spaces: 4});
			const resp = JSON.parse(data)['SOAP:Envelope']['SOAP:Body']['ns0:MT_EMPLOYEELEAVE_RES'];
			res.send({
			

			});
		});

		res1.on("error", function (error) {
			console.error(error);
		});
	});

	req1.write(postData);

	req1.end();
});









var options = {
	'method': 'POST',
	'port': 50000,
	'host': 'dxktpipo.kaarcloud.com',
	'path': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_VendorLogin1&receiverParty=&receiverService=&interface=SI_VendorLogin_Req&interfaceNamespace=http://vendorportal.com/demoLogin',
	'headers': {
		'Content-Type': 'application/xml',
		'Authorization': 'Basic UE9VU0VSOkthYXJAUE8yMDIw',
	},
	'maxRedirects': 20
};

app.post('/login', (req, res) => {
	const vendorID = req.body.vendId;
	const postData =  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dem="http://vendorportal.com/demoLogin">
	<soapenv:Header/>
	<soapenv:Body>
	   <dem:MT_VendorLogin_Req>
		  <VendorId>${vendorID}</VendorId>
	   </dem:MT_VendorLogin_Req>
	</soapenv:Body>
 </soapenv:Envelope>`;
	const req1 = http.request(options, function (res1) {
		const chunks = [];

		res1.on("data", function (chunk) {
			chunks.push(chunk);
		});

		res1.on("end", function (chunk) {
			const body = Buffer.concat(chunks);
			const xml = body.toString();
			const data = parser.xml2json(xml, {compact: true, spaces: 4});
			const resp = JSON.parse(data)['SOAP:Envelope']['SOAP:Body']['ns0:MT_VendorLogin_Resp'];
			res.send({
				vendorName: resp['VendorName']['_text'],
				vendorDesc: resp['VendorDesc']['_text'],
				vendorAddr: resp['VendorAddr']['_text']
				
			});
		});

		res1.on("error", function (error) {
			console.error(error);
		});
	});

	req1.write(postData);

	req1.end();
});

var samOptions = {
	'method': 'POST',
	'port': 50000,
	'host': 'dxktpipo.kaarcloud.com',
	'path': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_Sam&receiverParty=&receiverService=&interface=SI_LoginAll_Req&interfaceNamespace=http%3A%2F%2Floginall.com%2Fdemo',
	'headers': {
		'Content-Type': 'application/xml',
		'Authorization': 'Basic UE9VU0VSOkthYXJAUE8yMDIw',
	},
	'maxRedirects': 20
};

app.post('/samlogin', (req, res) => {
	const vendorID = req.body.vendId;
	const postData =  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:demo="http://loginall.com/demo">
	<soapenv:Header/>
	<soapenv:Body>
	<demo:MT_LoginAll_Req>
	<Designation>1</Designation>
	<Password>1</Password>
	<UserId>1</UserId>
	</demo:MT_LoginAll_Req>
	</soapenv:Body>
	</soapenv:Envelope>`;
	const req1 = http.request(options, function (res1) {
		const chunks = [];

		res1.on("data", function (chunk) {
			chunks.push(chunk);
		});

		res1.on("end", function (chunk) {
			const body = Buffer.concat(chunks);
			const xml = body.toString();
			const data = parser.xml2json(xml, {compact: true, spaces: 4});
			const resp = JSON.parse(data)['SOAP:Envelope']['SOAP:Body'];
			res.send({
				resp: resp
			});
		});

		res1.on("error", function (error) {
			console.error(error);
		});
	});

	req1.write(postData);

	req1.end();
});

app.listen(8000, () => {
	console.log('Reading on port ', 8000);
})





