const express = require('express');
const pug = require ('pug');
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
}))
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get("/pugtest", (req, res) => {
    axios.get('/events')
    .then(responce => {
        let theEvent = 
        res.render("pug", {name: "greg :/", stuff: responce.data});
    })

})

app.use(function (req, res, next){
    if(req.path === "/loginStyle.css" || req.path === "/favicon.ico" || req.path === "/script.js"|| req.path === "/views/pug.pug"){
        next();
        return;
    }
    if(req.path !== "/login.html" && req.session.username === undefined){
        res.redirect("/login.html");
        return;
    }
    next();
})

app.post('/signups', (req, res) => {
    axios.post('/signups', {studentId: req.session.studentId, eventId: req.body.eventId})
    .then(response => {
        console.log(response);
        res.json({status: "ok ig :/"});
    })
    .catch(error => {
        console.log("oops");
        console.log(error);
        res.status(400).json("urgle urgle :( \n" + error);
    })
})

app.post('/signUp/:id', (req, res) => {
    axios.patch('/signups/:id', req.body)
    .then(response => {
        console.log(response);
        res.json({status: "ok ig :/"});
    })
    .catch(error => {
        console.log("oops");
        console.log(error);
        res.status(400).json("urgle urgle :( \n" + error);
    })
})

app.get('/myEvents', (req, res) => {
    axios.get('/students/:id/events')
    .then
})

// make this for events and signups too
app.post('/login.html', (req, res) =>{
    axios.get('/students')
    .then(response => {
        console.log("hi studies");
        let s = response.data.find(student => makeUsername(student) === req.body.username)
        if(s){
            console.log("found studie!! :)");
            console.log(s);
            req.session.username = makeUsername(s);
            req.session.studentId = s.id;
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

app.get('/events', (req, res) => {
    axios.get('/events')
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        console.log("oops");
        console.log(error);
    })
})


function makeUsername(student){
    return student.firstname + student.lastname;
}

app.use('/', express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
    console.log(`Sign Out Server23 at http://localhost:${port}`)
})

