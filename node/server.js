const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello World!');
})

app.get('/bob', (req, res) => {
  console.log(req);
  res.send("<p>hello " + req.query.fName + " " + req.query.lName + " :)</p>");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})