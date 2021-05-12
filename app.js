
const express = require("express");
const https = require("https");
const bodyParser = require ("body-parser");
const request = require("request");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")

})

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apikey = "f82b668a753185b598842919ee4231dd";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+"&units=" + unit+ "&appid="+ apikey;

  https.get(url , function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(temp , description)
      res.write("<p>The weather is currently "+ description + "</p>");
      res.write("<h1>Temreture in "+ query+" is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + imageURL + ">") ;

      res.send()
    })
  })
})



app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
