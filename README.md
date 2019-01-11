Live Project: https://trivia-trainer-as.herokuapp.com/

Note-worthy algorithm:
<h3>Nested API calls</h3>
<p>In this project we use an axios call to generate Wikipedia entries, as
well as an API call through the JService-Node npm package. Because the axios query term
will not be generated until trivia question is generated, it is necessary to nest the axios 
call inside the API call. It is also important to know that these two calls return data in different
formats (array for axios, json for api), their syntaxes will therefore be slightly different.</p>

Javascript:
```
// Requiring middleware
const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const axios = require("axios")
const js = require('jservice-node');

// Instantiate express
const app = express()

// Integrating middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// HTTP Protocol: Get Homepage
app.get("/", (req, res) => {
  // Grab one random question from jservice-node
  js.random(1, function(error, response, json){
    if(!error && response.statusCode == 200){
        console.log(json[0].question);
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
```
Handlebars (HTML Template)
```
<!-- Trivia Section -->
<div class="trivia-section">
  <div class="trivia-category">
    <h3>Category: </h3>
    <p>{{category}}</p>
  </div>
  <h3>Prompt:</h3>
  <div class="trivia-card">
    <div class="trivia-question">
      <p>{{question}}</p>
    </div>
    <div id="answer" class="trivia-answer">
      <p>{{answer}}</p>
    </div>
  </div>
</div>

<!-- "Did You Know?" Section -->
<div id="fyi" class="fyi-section">
  <h3>Did You Know?</h3>
  <div class="fyi-card">
    <p>{{fyiDecript}}</p>
    <p>
      Would you like to know more? - <a target="_blank" href={{fyiLink}}>{{fyiLink}}</a>
    </p>
  </div>
</div>
```



# trivia-binge
Endless trivia game using Jeopardy's API. Website built in HTML/CSS/JS and Node/Express

***
Note on files for reviewer:
The original barebones of the website will originally be written in HTML/CSS/JS, and will use the files:
- basic.html
- basic-css.html
- basic-scripts.js (coming soon)
Depending on how many features are added, these files will them be migrated over to a Node.js project to crud resources (ex: User profiles)


This website will use Jeopardy's API to stream a (seemingly) limitless supply of trivia questions. 

Users will be able to view questions by either searching for a category, or from a random category. 

In a future version, Wikipedia's API will be integrated to provide informational widgets about each answer. Ex: If the answer to a question is "William Shakespear," a widget about William Shakespear will be presented.

v0: HTML/CSS barebones of homepage
v1: Integrate Jeopardy API to generate dictionary of questions/answers
v2: Clean-looking UI built off of custom CSS
v3: Integrate Wikipedia API to generate information widgets
