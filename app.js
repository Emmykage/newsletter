const express = require("express");
const app = express();
const http = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
	
	
	
});


app.post("/", function(req, res){
	
	const query = req.body.location;
	const appid = "7ae35b7ca3fcbc213090a9c834b199a2";
	const units = "metric";
	const url= "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units="+ units;
	http.get(url, function(response){
	console.log(response.statusCode);
	
		
	response.on("data", function(data){
		const weatherData = JSON.parse(data);
		console.log(weatherData);
		const humidity = weatherData.main.humidity;
		const temp = weatherData.main.temp;
		console.log(weatherData.main.humidity);
		const weatherDescription = weatherData.weather[0].description;
		const icon = weatherData.weather[0].icon
		const imageUrl = "http://openweathermaps.org/img/wn/" + icon+"@2x.png";
		
		res.write("<p>the weather is " + weatherDescription + "</p>");
		res.write("<h1>The temperature of " + query + " is " + temp + "  degree celcius.</h1>");
		res.write("<img src=" + imageUrl + ">");
		res.send();
	})
})
	
	
})



app.listen(3000, function(){
	console.log("Server is running on port 3000");
});