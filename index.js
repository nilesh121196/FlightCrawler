require('dotenv').config()
var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
app.use(express.static("./public"));
const bodyParser = require('body-parser');

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));

app.set('port',(process.env.PORT || 5000));


						
app.post('/',function(req, resM){

	let getOrigin = req.body.getOrigin;
	let getDestiny = req.body.getDestiny;
	let Idoj = req.body.getDOJ;
	function formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();
	
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
	
		return [year, month, day].join('-');
	}
	let Fdoj = formatDate(Idoj);
	console.log(Fdoj);
	request.get('https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey='+process.env.API_KEY+'&currency=inr&origin='+getOrigin+'&destination='+getDestiny+'&departure_date='+Fdoj+'&number_of_results=*', { json: true }, (err, res, body) => {
		if (err) { return console.log(err); }
			
			 resM.json(body);

		});

		// request.get('http://iatacodes.org/api/v6/airports?api_key='+process.env.API_KEY1+'', { json: true }, (err, res, body) => {
		// 	if (err) { return console.log(err); }
		// 		console.log(body.response[0].code);
				
		// 	});


});
	
app.get('/', function(req, res){
	console.log("Hello the world of nodejs");
	res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.get('/iataAirlines',function(req, res){
	res.sendFile(path.join(__dirname + '/public/iataAirline.js'))
});

// app.get('/iataAirports',(req, res)=>{
// 	res.sendFile(path.join(__dirname + '/public/iataAirports.json'))
// })

app.listen(app.get('port'), function(){
	console.log('App is run on port', app.get('port'));
});