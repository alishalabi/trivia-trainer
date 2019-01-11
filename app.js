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
const jserviceNode = require("jservice-node")
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

// Connecting controller
const auth = require("./controllers/auth.js")(app)

app.get("/", (req, res) => {
  // console.log("inside get home route")

  // console.log(req.query.term)
  let queryString = "maine";
  // FIXME: what does encodeURIComponent do?
  let term = encodeURIComponent(queryString)
  let url = "http://en.wikipedia.org/w/api.php?action=opensearch&search="+term+"&limit=1&format=json"


  // Axios Method

  axios.get(url)
  .then(response => {
    // console.log(response.data[2])
    // console.log(response.data.url);
    // console.log(response.data.explanation);
    res.render("home", {fyiDecript: response.data[2], fyiLink: response.data[3]})
  })
  .catch(error => {
    console.log(error);
  });

})

const gameCategories = []
app.get("/game/start", (req, res) => {
    var catOptions = {
      count: 5,
      offset: 25
  };

  //
  js.categories(catOptions, function(error, response, json){
      if(!error && response.statusCode == 200){
          res.render("start", {categories: json});
      } else {
          console.log(`Error: ${response.statusCode}`);
      }
  });
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
