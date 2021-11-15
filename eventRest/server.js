const e = require('express');
const express = require('express');
const { nanoid } = require('nanoid');
const { devNull } = require('os');
const sqlite3 = require('sqlite3').verbose();
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

let db = new sqlite3.Database('data.db');


// STUDENTS
app.get('/students', (req, res) => {
    getFromDb('students', res);
})

app.post('/students', (req, res) => {
    postToDb('students', [nanoid(), req.body.firstname, req.body.lastname], res)
})


// STUDENTS ID
app.get('/students/:id', (req, res) => {
    getFromDbWhere('students', req.params.id, res);
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
    patchDb(req, res);
    // for (student of students) {
    //     if (req.params.id === student.id) {
    //         if (req.body.firstname) {
    //             student.firstname = req.body.firstname;
    //         }
    //         if (req.body.lastname) {
    //             student.lastname = req.body.lastname;
    //         }
    //         res.status(200).json(student);
    //         return;
    //     }
    // }
    // res.status(404).json("oops");
})


// EVENTS
app.get('/events', (req, res) => {
    getFromDb('events', res);
})

app.post('/events', (req, res) => {
    postToDb('events', [nanoid(), req.body.name, req.body.date, req.body.time, req.body.duration], res);
})


// EVENTS ID
app.get('/events/:id', (req, res) => {
    getFromDbWhere('events', req.params.id, res);
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
    getFromDb('signups', res);
})

app.post('/signups', (req, res) => {
    postToDb('signups', [nanoid(), req.body.studentId, req.body.eventId], res)
})


// SIGNUPS ID
app.get('/signups/:id', (req, res) => {
    getFromDbWhere('signups', req.params.id, res);
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

function getEventById(id, type) {
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

function getFromDbWhere(table, where, res) {
    let selection = 'select * from ' + table + ' where id=?;';
    db.all(selection, [where], function (err, rows) {
        if (err) {
            console.log(err.message);
            res.status(400).json("oops");
        }
        else{
            res.status(200).json(rows);
        }
    })
}

function getFromDb(table, res) {
    let selection = 'select * from ' + table + ';';
    db.all(selection, [], function (err, rows) {
        if (err) {
            console.log(err.message);
            res.status(400).json("oops");
        }
        else{
            res.status(200).json(rows);
        }
    })
}

function postToDb(table, values, res){
    let x = Array(values.length).fill("?").join(',');
    let insertion = 'INSERT INTO ' + table +  ' VALUES (' + x + ');';  
    console.log(insertion);
    console.log(values);
    db.run(insertion, values, function (err, rows) {
        if(err) {
            console.log(err.message);
            res.status(400).json('oops');
        }
        else{
            res.status(200).json(rows);
        }
    })
}

function patchDb(table, values, req, res){
    //object.entries(x) gives array of names and values - first is name second is value)
    let namesAndValues = Object.entries(req.body);
    console.log(namesAndValues);
    let assignments = namesAndValues.map((form) => {
        return form[0] + " = ?";
    })
    console.log(assignments.join(", "));
    
}

// // Use the session middleware
// app.use(session({ 
//     secret: 'jkaswerwe,mnxzvdf3lkjsaldhf', 
//     cookie: { maxAge: 60000 },
//     resave: false,
//     saveUninitialized: false}))  


app.listen(port, () => {
    console.log(`Sign Out Server23 at http://localhost:${port}`)
})
