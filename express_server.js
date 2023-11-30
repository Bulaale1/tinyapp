/* eslint-disable linebreak-style */
const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
app.set("view engine", "ejs");
const generateRandomString = function(number) {
  let aplphanumber = 'abcdefghijklmnopkrstuvdxwz1234567890';
  let result = '';
  for (let index = 0; index < number; index++) {
    result += aplphanumber.charAt(Math.floor(Math.random() * aplphanumber.length));
  }
  return result;
};

let uniqueID = generateRandomString(6);

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};
console.log('urlDatabase',urlDatabase);
app.use(express.urlencoded({ extended: true }));

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
//Myurls
app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  // console.log('something to test',templateVars);
  res.render("urls_index", templateVars);
});
//get function for updating the lings.
app.get("/urls/:id", (req, res) => {
  const id = req.params.id;
  const templateVars = { id:id,
    longURL:urlDatabase[id]/* What goes here? */ };
  res.render("urls_show", templateVars);
});
// this is the begining of update function;
// app.get('/urls/:id', (req, res) => {
//   const id = req.params.id;
//   const templateVars = {
//     id:id,
//     link:urlDatabase[id]
//   };
//   res.render("urls_show",templateVars);
// });
app.post("/urls/:id",(req, res) => {
  const idToUpdate = req.params.id;
  urlDatabase[idToUpdate] = req.body.newURL;
  res.redirect('/urls');
});
//he end of update function
// app.post('/submit', (req, res) => {
//   console.log(req.body);
//   const formsubmit = req.body.longURL;
//   urlDatabase[uniqueID] = formsubmit;
// });
app.post("/urls", (req, res) => {
  console.log('the submited link');
  const id = generateRandomString(6);
  urlDatabase[id] = req.body.longURL;
  console.log(urlDatabase);
  
  res.redirect("/urls");
});
//Delete function
app.post("/urls/:id/delete",(req,res)=>{
  console.log('just testing my delete function');
  const idToDelete = req.params.id;
  delete urlDatabase[idToDelete];
  res.redirect("/urls");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
