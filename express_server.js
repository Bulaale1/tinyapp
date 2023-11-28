/* eslint-disable linebreak-style */
const generateRandomString = function(number) {
  let aplphanumber = 'abcdefghijklmnopkrstuvdxwz1234567890';
  let result = '';
  for (let index = 0; index < number; index++) {
    result += aplphanumber.charAt(Math.floor(Math.random() * aplphanumber.length));
  }
  return result;
};

let uniqueID = generateRandomString(6);
const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
app.set("view engine", "ejs");

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};
console.log('urlDatabase',urlDatabase);
app.use(express.urlencoded({ extended: true }));
app.post('/submit', (req, res) => {
  //to double check if it perfectly working;
  const formsubmit = req.body.longURL;
  urlDatabase[uniqueID] = formsubmit;
});
app.post("/urls", (req, res) => {
  console.log(req.body); // Log the POST request body to the console
  res.send("Ok"); // Respond with 'Ok' (we will replace this)
});
app.get("/u/:id", (req, res) => {
  // const longURL = "/u/:id";
  const longURL = "/u/:id";
  res.redirect(longURL);
});

app.get("/", (req, res) => {
  res.send("Hello!");
});
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});
app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});
app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/:id", (req, res) => {
  const templateVars = { id: req.params.id, longURL:urlDatabase.id /* What goes here? */ };
  res.render("urls_show", templateVars);
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});