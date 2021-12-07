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
    axios.post('/signups', {studentId: req.session.studentId, eventId: req.body.eventId, signIn: null, signOut: null})
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

app.patch('/signIn', (req, res) => {
    let signUp = req.session.myEvents.find(event => event.id === req.body.eventId)
    axios.patch('/signups/' + signUp.signupId, {sign_in: "yes"})
    .then(responce => {
        res.status(200).json(responce.data)
    })
    .catch(error => {
        console.log("oops");
        console.log(error);
        res.status(400)
    })
})

app.patch('/signOut', (req, res) => {
    console.log("someones trying to patch me !!! D:")
    let signUp = req.session.myEvents.find(event => event.id === req.body.eventId)
    axios.patch('/signups/' + signUp.signupId, {sign_out: "yes"})
    .then(responce => {
        res.status(200).json(responce.data)
    })
    .catch(error => {
        console.log("oops");
        console.log(error);
        res.status(400)
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
        res.status(400).json(error);
    })
})

app.get('/myEvents', (req, res) => {
    axios.get('/students/' + req.session.studentId + '/events')
    .then(response => {
        console.log(response.data);
        req.session.myEvents = response.data;
        res.json(response.data).status(200);
    })
    .catch(error => {
        console.log("oops");
        console.log(error);
    })
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

