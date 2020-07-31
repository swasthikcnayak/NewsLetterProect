//jshint esversion : 6
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
});

app.post("/", (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    var jsondata = JSON.stringify(data);
    var options = {
        url: "https://us10.api.mailchimp.com/3.0/lists/1ed3b7e03f",
        method: "POST",
        headers: {
            "Authorization": "formailchimp 1d7026792706860fb474aca671d5c944-us10"
        },
        body: jsondata
    };

    request(options, (err, response, body) => {
        if (err)
            res.sendFile(__dirname + '/public/failure.html');
        else
            if (response.statusCode == 200)
                res.sendFile(__dirname + '/public/success.html');
            else
                res.sendFile(__dirname + '/public/failure.html');

    });
});

app.post("/failure",(req,res)=>{
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started at port 3000');
});
