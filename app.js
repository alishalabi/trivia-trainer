const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const http = require("http")

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.get("/", (req, res) => {
  // console.log("inside get home route")

  // console.log(req.query.term)
  let queryString = "maine";
  // FIXME: what does encodeURIComponent do?
  let term = encodeURIComponent(queryString)
  let url = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + term +"&limit=1&format=json"

  http.get(url, (response) => {
    response.setEncoding("utf8")
    // console.log(response)
    // Question: how do I store response as body
    let body = response;
    // console.log(body)
    // FIXME: this is where this is breaking
    // Step 1: HTTP Call to get JSON 
    // Step 2: Parse JSON into HTML
    // Step 3: Pass HTML into template
    const parsed = JSON.parse(body);
    // console.log(parsed)
    // response.on('data', (d) => {
    //   console.log('start')
    //   body += d;
    //   const parsed = JSON.parse(body);
    //   // console.log(parsed)
    // })
    //
    // response.on('end', () => {
    //   // const parsed = JSON.parse(body);
    //   console.log("ended")
    // })
    // let parsed = JSON.parse(body)
    // res.render("home", {fyi: parsed.data})
    })
  res.render("home")
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
