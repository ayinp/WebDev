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

// STUDENTS
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
})


// STUDENTS ID
app.get('/students/:id', (req, res)=>{
    for(student of students){
        if(req.params.id === student.id){
            res.status(200).json(student);
            return;
        }
    }
    res.status(404).json("oops");
})

//will this work?
app.delete('students/:id', (req, res)=>{
    for(student of students){
        if(req.params.id === student.id){
            res.status(200).json(student);
            return;
        }
    }
    res.status(404).json("oops");
})
// add patch


// EVENTS
app.get('/events', (req, res)=>{
    res.json(events);
})

app.post('/events', (req, res)=>{
    let newEvent = {
        id: nanoid(),
        dateAndTime: req.body.dateAndTime,
        name: req.body.name
    };

    events.push(newEvent);

    res.status(201).json(newEvent)
})


// EVENTS ID
app.get('/events/:id', (req, res)=>{
    //find the student with the id req.params.id in the list of students, and return that student
    for(newEvent of events){
        if(req.params.id === newEvent.id){
            res.status(200).json(newEvent);
            return;
        }
    }
    res.status(404).json("oops");
})

//will this work?
app.delete('events/:id', (req, res)=>{
    for(newEvent of events){
        if(req.params.id === newEvent.id){
            res.status(200).json(newEvent);
            return;
        }
    }
    res.status(404).json("oops");
})
// add patch


// SIGNUPS
app.get('/signups', (req, res)=>{
    res.json(signups);
})

app.post('/signups', (req, res)=>{
    let signup = {
        id: nanoid(),
        studentId: req.body.studentId,
        eventId: req.body.eventId,
        type: req.body.type //signout or signin
    };

    events.push(newEvent);

    res.status(201).json(newEvent)
    //take data from body of post and add new event object to eveents
    //res.json("status");
})


// SIGNUPS ID
app.get('/signups/:id', (req, res)=>{
    //find the student with the id req.params.id in the list of students, and return that student
    for(signup of signups){
        if(req.params.id === signup.id){
            res.status(200).json(signup);
            return;
        }
    }
    res.status(404).json("oops");
})

//will this work?
app.delete('signups/:id', (req, res)=>{
    for(signup of signups){
        if(req.params.id === signup.id){
            res.status(200).json(signup);
            return;
        }
    }
    res.status(404).json("oops");
})
// add patch


// EVENTS A STUDENT IS SIGNED UP FOR
app.get('/students/:id/events', (req, res)=>{
    for(student of students){
        if(req.params.id === student.id){
            //look @ signups and determine what event ids (idk how to do that)
            return;
        }
    }
    res.status(404).json("oops");
})


// STUDENTS SIGNED UP FOR EVENTS
app.get('/students/:id/events', (req, res)=>{
    for(newEvent of events){
        if(req.params.id === newEvent.id){
            //look @ signups and determine what student ids (idk how to do that)
            return;
        }
    }
    res.status(404).json("oops");
})


//   /students  (get, post)                     done
//   /events (get, post)                        done
//   /signups (get, post)                       done
//   /students/{id}   (get, patch, delete)      get done, dont know what patch does, delete maybe done
//   /events/{id}   (get, patch, delete)        get done, dont know what patch does, delete maybe done
//   /signups/{id}   (get, patch, delete)       get done, dont know what patch does, delete maybe done
//   /students/{id}/events   (get)              sort of done
//   /events/{id}/students   (get)              sort of done



// // Use the session middleware
// app.use(session({ 
//     secret: 'jkaswerwe,mnxzvdf3lkjsaldhf', 
//     cookie: { maxAge: 60000 },
//     resave: false,
//     saveUninitialized: false}))  
  
  app.listen(port, () => {
      console.log(`Sign Out Server at http://localhost:${port}`)
  })
  