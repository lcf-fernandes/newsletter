//jshint esversion:6

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

client.setConfig({
  apiKey: "e0c451859e88fee47f4fa3463eaee792-us20",
  server: "us20",
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  console.log(firstName, lastName, email);

  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email
  }

  const run = async () => {
    const response = await client.lists.addListMember("a29c33a01f", {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    });
    console.log(response);

    res.sendFile(__dirname + "/success.html");
    // } catch (err) {
    //   console.log(err.status);
    //   res.sendFile(__dirname + "/failure.html");
    // }

  };

  run();
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

  app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000.");
  });


// Mail Chimp API Key
// e0c451859e88fee47f4fa3463eaee792-us20
// List ID
// a29c33a01f
