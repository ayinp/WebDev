const e = require('express');
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

const path = require('path');
const { send } = require('process');
app.use('/', express.static(path.join(__dirname, 'public')));

// STUDENTS
app.get('/students', (req, res) => {
    res.json(students);
})

app.post('/students', (req, res) => {
    let student = {
        id: nanoid(),
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };

    students.push(student);

    res.status(201).json(student)
})


// STUDENTS ID
app.get('/students/:id', (req, res) => {
    for (student of students) {
        if (req.params.id === student.id) {
            res.status(200).json(student);
            return;
        }
    }
    res.status(404).json("oops");
})

app.delete('/students/:id', (req, res) => {
    for (let i = 0; i < students.length; i++) {
        if (req.params.id === students[i].id) {
            students.splice(i, 1);
            res.status(200).json("removed");
            return;
        }
    }
    res.status(404).json("oops");
})

app.patch('/students/:id', (req, res) => {
    for (student of students) {
        if (req.params.id === student.id) {
            if (req.body.firstname) {
                student.firstname = req.body.firstname;
            }
            if (req.body.lastname) {
                student.lastname = req.body.lastname;
            }
            res.status(200).json(student);
            return;
        }
    }
    res.status(404).json("oops");
})


// EVENTS
app.get('/events', (req, res) => {
    res.json(events);
})

app.post('/events', (req, res) => {
    let newEvent = {
        id: nanoid(),
        date: req.body.date,
        time: req.body.time,
        duration: req.body.duration,
        name: req.body.name
    };

    events.push(newEvent);

    res.status(201).json(newEvent)
})


// EVENTS ID
app.get('/events/:id', (req, res) => {
    for (newEvent of events) {
        if (req.params.id === newEvent.id) {
            res.status(200).json(newEvent);
            return;
        }
    }
    res.status(404).json("oops");
})

app.delete('/events/:id', (req, res) => {
    console.log("hewwo?")
    for (let i = 0; i < events.length; i++) {
        if (req.params.id === events[i].id) {
            events.splice(i, 1);
            res.status(200).json("removed");
            return;
        }
    }
    res.status(404).json("oops");
})

app.patch('/events/:id', (req, res) => {
    for (newEvent of events) {
        if (req.params.id === newEvent.id) {
            if (req.body.date) {
                newEvent.date = req.body.date;
            }
            if (req.body.time) {
                newEvent.time = req.body.time;
            }
            if (req.body.duration) {
                newEvent.duration = req.body.duration;
            }
            if (req.body.name) {
                newEvent.name = req.body.name;
            }
            res.status(200).json(newEvent);
            return;
        }
    }
    res.status(404).json("oops");
})



// SIGNUPS
app.get('/signups', (req, res) => {
    res.json(signups);
})

app.post('/signups', (req, res) => {
    let signup = {
        id: nanoid(),
        studentId: req.body.studentId,
        eventId: req.body.eventId,
        signIn: req.body.signIn,
        signOut: req.body.signOut,
    };

    signups.push(signup);

    res.status(201).json(signups)
})


// SIGNUPS ID
app.get('/signups/:id', (req, res) => {
    for (signup of signups) {
        if (req.params.id === signup.id) {
            res.status(200).json(signup);
            return;
        }
    }
    res.status(404).json("oops");
})

app.delete('/signups/:id', (req, res) => {
    for (let i = 0; i < signups.length; i++) {
        if (req.params.id === signups[i].id) {
            signups.splice(i, 1);
            res.status(200).json("removed");
            return;
        }
    }
    res.status(404).json("oops");
})

app.patch('/signups/:id', (req, res) => {
    for (signup of signups) {
        if (req.params.id === signup.id) {
            if (req.body.signIn) {
                signIn = req.body.signIn;
            }
            if (req.body.signOut) {
                signOut = req.body.signOut;
            }
            res.status(200).json(signup);
            return;
        }
    }
    res.status(404).json("oops");
})

function getEventById(id, type){
    for (newEvent of type) {
        if (id === newEvent.id) {
            return newEvent;
        }
    }
    return undefined;
}

// EVENTS A STUDENT IS SIGNED UP FOR
app.get('/students/:id/events', (req, res) => {
    let studentEvents = [];
    for (signup of signups) {
        if (req.params.id === signup.studentId) {
            console.log('gay');
            studentEvents.push(getEventById(signup.eventId, events));
        }
    }
    res.status(200).json(studentEvents);
})


// STUDENTS SIGNED UP FOR EVENTS
app.get('/events/:id/students', (req, res) => {
    let eventStudents = [];
    for (signup of signups) {
        if (req.params.id === signup.eventId) {
            eventStudents.push(getEventById(signup.studentId, students));
        }
    }
    res.status(200).json(eventStudents);
})


//   /students  (get, post)                     done
//   /events (get, post)                        done
//   /signups (get, post)                       done
//   /students/{id}   (get, patch, delete)      done
//   /events/{id}   (get, patch, delete)        done
//   /signups/{id}   (get, patch, delete)       done
//   /students/{id}/events   (get)              sort of done
//   /events/{id}/students   (get)              sort of done



// // Use the session middleware
// app.use(session({ 
//     secret: 'jkaswerwe,mnxzvdf3lkjsaldhf', 
//     cookie: { maxAge: 60000 },
//     resave: false,
//     saveUninitialized: false}))  

app.listen(port, () => {
    console.log(`Sign Out Server23 at http://localhost:${port}`)
})
