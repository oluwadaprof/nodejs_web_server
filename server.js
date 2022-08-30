const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

app.get("^/$|/index(.html)?", function (req, res) {
  // res.sendFile('./views/index.html' , {root: __dirname});
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", function (req, res) {
  // res.sendFile('./views/new-page.html' , {root: __dirname});
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/old-page(.html)?", function (req, res) {
  res.redirect(301, "new-page.html");
});

//Route Handlers
app.get(
  "/hello(.html)?",
  function (req, res, next) {
    console.log("attempted to load html file");
    next();
  },
  function (req, res) {
    res.send("hello world");
  }
);

//chaining route handlers
const one = (res, req , next) => {
  console.log('one')
  next()
}

const two = (res, req , next) => {
  console.log('two')
  next()
}

const three = (res, req ) => {
  console.log(three)
  res.send('Finished')
}

app.get('/chain(.html)?', [one, two, three])

app.get("/*", function (req, res) {
  res.status(404).sendFile(path.join(__dirname), "views", "404.html");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
