const express = require('express');
const { nanoid } = require('nanoid');
//var session = require('express-session')
const app = express();
const port = 3000;

let students = [];     // id, firstname, lastname
let events = [];    // id, name, date, time, duration
let signups = [];   // id, userId, eventId, signOut, signIn

// const storage = require('node-persist');
// const { nanoid } = require('nanoid')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// const path = require('path');
// // const { send } = require('process');
// app.use('/', express.static(path.join(__dirname, 'public')));


app.get('/students', (req, res)=>{
    res.json(students);
})

app.post('/students', (req, res)=>{
    let student = {
        id: nanoid(),
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };

    students.push(student);

    res.status(201).json(student)
    //take data from body of post and add new event object to eveents
    //res.json("status");
})

app.get('/students/:id', (req, res)=>{
    //find the student with the id req.params.id in the list of students, and return that student
    for(student of students){
        if(req.params.id === student.id){
            res.status(200).json(student);
            return;
        }
    }
    res.status(404).json("oops");
})

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
//   /students  (get, post)                     done
//   /events (get, post)
//   /signups (get, post)
//   /students/{id}   (get, patch, delete)
//   /events/{id}   (get, patch, delete)
//   /signups/{id}   (get, patch, delete)
//   /students/{id}/events   (get)
//   /events/{id}/students   (get)



// // Use the session middleware
// app.use(session({ 
//     secret: 'jkaswerwe,mnxzvdf3lkjsaldhf', 
//     cookie: { maxAge: 60000 },
//     resave: false,
//     saveUninitialized: false}))  
  
  app.listen(port, () => {
      console.log(`Sign Out Server at http://localhost:${port}`)
  })
  