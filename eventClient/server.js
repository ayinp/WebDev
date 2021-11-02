const express = require('express');
// const { nanoid } = require('nanoid');
const app = express();
const port = 7000;
const path = require('path');
const { send, allowedNodeEnvironmentFlags } = require('process');
var session = require('express-session');
const axios = require('axios')
axios.defaults.baseURL = 'http://localhost:3000';
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(session({
    secret: 'no <3',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));

app.use(function (req, res, next){
    console.log(req.path)
    if(req.path !== "/login.html" && req.session.username === undefined){
        res.redirect("/login.html");
        return;
    }
    next();
})

function makeUsername(student){
    return student.firstName + student.lastName;
}

app.post('/login.html', (req, res) =>{
    axios.get('/students')
    .then(response => {
        console.log(":(");
        let s = response.data.find(student => makeUsername(student) === req.body.username)
        if(s){
            console.log("found user");
            req.session.username = makeUsername(s);
            req.session.id = s.id;
            res.redirect("/");
        }
        else{
            console.log("no studie :(");
            res.redirect("/login.html");
        }
    })
    .catch(error => {
        console.log("oops");
        console.log(error);
        res.redirect("/login.html");
    })
})

app.use('/', express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
    console.log(`Sign Out Server23 at http://localhost:${port}`)
})
