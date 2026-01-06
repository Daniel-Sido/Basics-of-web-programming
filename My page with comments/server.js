const path = require('path');
const fs = require('fs');
const io = require('socket.io')();
const express = require('express');
const app = express();
const jsonParser = express.json();
const urlencodedParser = express.urlencoded({extended: false});
app.use(express.static(path.join(__dirname,'/public')))
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/main.html`);
});
app.post('/submit-form', jsonParser, function (req, res) {
    let comment = req.body;
    commentsString = JSON.stringify(comment, null, 2);
    fs.writeFileSync(`${__dirname}/public/database.json`, commentsString);
});
app.post('/login', urlencodedParser, function (req, res) {
    let login = req.body.authorization;
    
    if (login=="admin12345") res.send("1");else res.send("0");
  
});
app.listen(8000,() => {
    console.log('Application listening on port 8000!'+__dirname);
});
