const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https=require("https")
const supervillains= require("supervillains");
const { stringify } = require("querystring");


var badGuy= supervillains.random();
console.log(badGuy);

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/weather",function(req,res){
    const weather = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=b9ffa2c44cd75a142a0b83f78e56c69b&lang=Japanese";
    const options = 
        {
            "coord": {
                "lon": -0.1257,
                "lat": 51.5085
            },
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02n"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 280.79,
                "feels_like": 280.3,
                "temp_min": 279.57,
                "temp_max": 282.47,
                "pressure": 1013,
                "humidity": 89
            },
            "visibility": 10000,
            "wind": {
                "speed": 1.34,
                "deg": 279,
                "gust": 4.47
            },
            "clouds": {
                "all": 20
            },
            "dt": 1638250800,
            "sys": {
                "type": 2,
                "id": 2019646,
                "country": "GB",
                "sunrise": 1638258166,
                "sunset": 1638287762
            },
            "timezone": 0,
            "id": 2643743,
            "name": "London",
            "cod": 200
        }
    
    https.get(weather,function(response){
        console.log(response);
        
        
    });
})

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.get("/home", function(req,res){
    res.sendFile(__dirname + "/home.html");
    console.log(res);
});

app.get("/re3", function(req,res){
    res.sendFile(__dirname + "/re3.html");
});

app.get("/re3", function(req,res){
    res.sendFile(__dirname + "/re3info.html");
});

app.get("/news", function(req,res){
    res.sendFile(__dirname + "/news.html");
});

app.get("/valorant", function(req,res){
    res.sendFile(__dirname + "/valorant.html");
});

app.get("/about", function(req,res){
    res.sendFile(__dirname + "/about.html");
});

app.get("/ageverification", function(req,res){
    res.sendFile(__dirname + "/ageverification.html");
});

app.get("/sorry", function(req,res){
    res.send("<h1> sorry you cannot view this page </h1>");
});

app.get("/subscribe", function(req,res){
    res.sendFile(__dirname + "/subscribe.html");
});

app.post("/", function(req,res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailAddress = req.body.emailAddress;

    const data ={
        members: [
            {
                email_address: emailAddress,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

const jsonData = JSON.stringify(data);
const url = "https://us5.api.mailchimp.com/3.0/lists/37d965a951"; 
const options = {
    method: "POST",
    auth: "manas1:9cc1acf28338db28beef82f4aa4a43b5-us5"
}
const request = https.request(url, options, function(response){

    if(response.statusCode== 200){
        res.send("Successfully Signed Up");
    } else{
        res.send("Subscription Failed");
    }

    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
})

request.write(jsonData);
request.end();    
    

});

app.post("/subscribe", function(req,res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailAddress = req.body.emailAddress;
    const receipt = req.body.receipt;

    const data ={
        members: [
            {
                email_address: emailAddress,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName,
                    RECEIPT: receipt
                }
            }
        ]
    };

const jsonData = JSON.stringify(data);
const url = "https://us5.api.mailchimp.com/3.0/lists/37d965a951"; 
const options = {
    method: "POST",
    auth: "manas1:9cc1acf28338db28beef82f4aa4a43b5-us5"
}
const request = https.request(url, options, function(response){

    if(response.statusCode== 200){
        res.send("Successfully Subscribed");
    } else{
        res.send("Subscription Failed");
    }

    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
})

request.write(jsonData);
request.end();    
    

});

app.listen(3000, function(){
    console.log("Server initiated");
});

//9cc1acf28338db28beef82f4aa4a43b5-us5
//37d965a951
//https://${dc}.api.mailchimp.com/3.0/lists/{list_id}/members?skip_merge_validation=<SOME_BOOLEAN_VALUE>