const express = require('express');
//var session = require('express-session')
const app = express();
const port = 3000;

// const storage = require('node-persist');
// const { nanoid } = require('nanoid')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// const path = require('path');
// // const { send } = require('process');
// app.use('/', express.static(path.join(__dirname, 'public')));




// Use the session middleware
app.use(session({ 
  secret: 'jkaswerwe,mnxzvdf3lkjsaldhf', 
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false}))  

app.listen(port, () => {
    console.log(`Sign Out Server at http://localhost:${port}`)
})

app.get('/events', (req, res)=>{
    res.json(stuff);
})

app.post('/events', (req, res)=>{
    //take data from body of post and add new event object to eveents
    //res.json("status");
})

let users = [];
let events = [];
let signups = [];

/*
create new event (post to /events) endpoints (url)
create new user (post to /user)
signout - (will create a new signout) ( post to /signup)
signin - (will create a new signin) (patch to signups/id)
sign up - post..
get a list of events (all events or signed up events) (get /events)
log in/out user ()
get list of users for an event (get /signups or get /events/id/users)
 
*/