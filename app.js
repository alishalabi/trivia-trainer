// Connect to Mongo DB
require("./data/user-db")
require("dotenv").config()

// Requiring middleware
const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const http = require("http")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")

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


  // http.get(url, (resp) => {
  //   let data = '';
  //   console.log("Making the request " + resp)
  //   // A chunk of data has been recieved.
  //   resp.on('data', (chunk) => {
  //     console.log("CHUNK DATA " + chunk)
  //     data += chunk;
  //   });
  //
  //   // The whole response has been received. Print out the result.
  //   resp.on('end', () => {
  //     console.log("Reached the end")
  //     // console.log(JSON.parse(data).explanation);
  //   });
  //
  // }).on("error", (err) => {
  //   console.log("Error: " + err.message);
  // });


//   http.get(url, (response) => {
//     // response.setEncoding("utf8")
//     // console.log(response)
//     // Question: how do I store response as body
//     // let body = response;
//     // console.log(body)
//     // FIXME: this is where this is breaking
//     // Step 1: HTTP Call to get JSON
//     // Step 2: Parse JSON into HTML
//     // Step 3: Pass HTML into template
//     const parsed = JSON.parse(body);
//     // console.log(parsed)
//     // response.on('data', (d) => {
//     //   console.log('start')
//     //   body += d;
//     //   const parsed = JSON.parse(body);
//     //   // console.log(parsed)
//     // })
//     //
//     // response.on('end', () => {
//     //   // const parsed = JSON.parse(body);
//     //   console.log("ended")
//     // })
//     // let parsed = JSON.parse(body)
//     // res.render("home", {fyi: parsed.data})
//     })
//   res.render("home")
// })
res.render("home")
})


app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
