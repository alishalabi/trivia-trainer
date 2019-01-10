const express = require("express")
const exphbs = require("express-handlebars")
const http = require("http")

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'))

app.get("/", (req, res) => {
  // console.log(req.query.term)
  // let queryString = "maine";
  // let term = encodeURIComponent(queryString)
  // let url = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + term +"&limit=1&format=json"
  //
  // http.get(url, (response) => {
  //   response.setEncoding("utf8")
  //   // Question: how do I store response as body
  //   let body = response;
  //   let parsed = JSON.parse(body)
  //   res.render("home", {fyi: parsed.data})
  //   })
  res.render("home")
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
