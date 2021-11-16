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

app.get('/students/:id', (req, res) => {
    getFromDbWhere('students', req.params.id, res);
})

app.delete('/students/:id', (req, res) => {
    deleteFromDb('students', req.params.id, res)
})

app.patch('/students/:id', (req, res) => {
    patchDb('students', req, res);
})


// EVENTS
app.get('/events', (req, res) => {
    getFromDb('events', res);
})

app.post('/events', (req, res) => {
    postToDb('events', [nanoid(), req.body.name, req.body.date, req.body.time, req.body.duration], res);
})

app.get('/events/:id', (req, res) => {
    getFromDbWhere('events', req.params.id, res);
})

app.delete('/events/:id', (req, res) => {
    deleteFromDb('events', req.params.id, res)
})

app.patch('/events/:id', (req, res) => {
    patchDb('events', req, res);
})


// SIGNUPS
app.get('/signups', (req, res) => {
    getFromDb('signups', res);
})

app.post('/signups', (req, res) => {
    postToDb('signups', [nanoid(), req.body.studentId, req.body.eventId], res)
})

app.get('/signups/:id', (req, res) => {
    getFromDbWhere('signups', req.params.id, res);
})

app.delete('/signups/:id', (req, res) => {
    deleteFromDb('signups', req.params.id, res)
})

app.patch('/signups/:id', (req, res) => {
    patchDb('signups', req, res);
})


// EVENTS A STUDENT IS SIGNED UP FOR
app.get('/students/:id/events', (req, res) => {
    getSpecificsFromDb('students', 'events', req.params.id, res)
})

// STUDENTS SIGNED UP FOR EVENTS
app.get('/events/:id/students', (req, res) => {
    getSpecificsFromDb('events', 'students', req.params.id, res)
})

function getEventById(id, type) {
    for (newEvent of type) {
        if (id === newEvent.id) {
            return newEvent;
        }
    }
    return undefined;
}

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
    db.run(insertion, values, function (err, row) {
        if(err) {
            console.log(err.message);
            res.status(400).json('oops');
        }
        else{
            res.status(200).json(row);
        }
    })
}

function patchDb(table, req, res){
    let namesAndValues = Object.entries(req.body);
    console.log(namesAndValues);
    let values = [];
    let assignments = namesAndValues.map(([names, value]) => {
        values.push(value);
        return names + " = ?";
    })
    console.log(assignments.join(", "));
    let patchion = "UPDATE " + table + " SET " + assignments.join(", ") + " WHERE id = " + req.params.id;
    console.log(patchion);
    db.run(patchion, values, function(err, row){
        if(err){
            console.log(err.message);
            res.status(400).json('oops');
        }
        else{
            res.status(200).json(row);
        }
    }) 
}

function deleteFromDb(table, where, res){
    let deletion = "DELETE FROM " + table + " WHERE id=?"
    db.run(deletion, [where], function(err, row){
        if(err){
            console.log(err.message);
            res.status(400).json('oops');
        }
        else{
            res.status(200).json(row);
        }
    })
}

function getSpecificsFromDb(tableDom, tableSub, where, res){ 
        let specification = "SELECT students.firstname, students.lastname, events.name FROM "  + tableDom + 
        " JOIN signups on " + tableDom + ".id = " + tableNameSingular(tableDom) + "_id JOIN " +
        tableSub + " on " + tableNameSingular(tableSub) + "_id " + " = " + tableSub + ".id WHERE " + tableDom + ".id=?" 
        console.log(specification);
        console.log(where);
        db.all(specification, where, function(err, rows){
            if(err){
                console.log(err.message);
                res.status(400).json('oops');
            }
            else{
                res.status(200).json(rows);
            }
        })
}

function tableNameSingular(tableName){
    return tableName.substring(0, tableName.length-1);

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
