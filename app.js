// Connect to Mongo DB
require("./data/user-db")
require("dotenv").config()

// Requiring middleware
const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const http = require("http")
const axios = require("axios")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const js = require('jservice-node');

// Instantiate express
const app = express()

// Integrating middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(cookieParser())
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/trivia-binge')

// Connecting controller
const auth = require("./controllers/auth.js")(app)

// Render Homepage: Random Question
app.get("/", (req, res) => {

  // Grab one random question from jservice-node
  js.random(1, function(error, response, json){
    if(!error && response.statusCode == 200){
        // console.log(json[0].question);
        const question = json[0].question;
        const answer = json[0].answer;
        const category = json[0].category.title;
        let queryString = answer;
        let term = encodeURIComponent(queryString)
        let url = "http://en.wikipedia.org/w/api.php?action=opensearch&search="+term+"&limit=1&format=json"

        // Populate Wiki entry using axios
        axios.get(url)
        .then(response => {
          res.render("home", {
            fyiDecript: response.data[2],
            fyiLink: response.data[3],
            question: question,
            answer: answer,
            category: category
          })
        })
        .catch(error => {
          console.log(error);
        });
    } else {
        console.log(`Error: ${response.statusCode}`);
    }
  });
})

// Render Homepage: Single Question by ID
app.get("/a/:category/:value", (req, res) => {
  const options = {
    value: req.params.value,
    category: req.params.category,
  }
  js.clues(options, function(error, response, json){
    if(!error && response.statusCode == 200){
        // console.log(json);
        const question = json[0].question;
        const answer = json[0].answer;
        const category = json[0].category.title;
        let queryString = answer;
        let term = encodeURIComponent(queryString)
        let url = "http://en.wikipedia.org/w/api.php?action=opensearch&search="+term+"&limit=1&format=json"

        // Populate Wiki entry using axios
        axios.get(url)
        .then(response => {
          res.render("home", {
            fyiDecript: response.data[2],
            fyiLink: response.data[3],
            question: question,
            answer: answer,
            category: category
          })
        })
        .catch(error => {
          console.log(error);
        });
    } else {
        console.log(`Error: ${response.statusCode}`);
    }
  });
})

app.get("/sample", (req, res) => {
  js.random(12, function(error, response, json){
    if(!error && response.statusCode == 200){
      const samples = json
        res.render("sample", {samples: samples})
    } else {
        console.log(`Error: ${response.statusCode}`);
    }
  });
})

// // Testing category generation
// const gameCategories = []
// app.get("/game/start", (req, res) => {
//     var catOptions = {
//       count: 5,
//       offset: 25
//   };
//
//   //
//   js.categories(catOptions, function(error, response, json){
//       if(!error && response.statusCode == 200){
//           res.render("start", {categories: json});
//       } else {
//           console.log(`Error: ${response.statusCode}`);
//       }
//   });
// })


app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Listening at port 3000!")
})
