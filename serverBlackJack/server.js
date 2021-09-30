const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const path = require('path');
const { receiveMessageOnPort } = require('worker_threads');
//const { send } = require('process');
app.use('/', express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   res.write('hello');
//   res.end();
// });

// app.post('/hit', (req, res) => {
//     console.log(req.body);
//     res.json({command: "Hit"});
// });

// app.post('/stand', (req, res) => {
//     console.log(req.body);
//     res.json({command: "Stand"});
// })

// app.post('/reset', (req, res) => {
//     console.log(req.body);
//     res.json({command:"Reset"});
// })

app.post('/command', (req, res) => {
    if(req.body.command === "hit"){
        //hit logic
        res.send("I should have hit");
    }
    else if(req.body.command === "stand"){
        //stand logic
        res.send("I should have standed");
    }
    else if(req.body.command === "reset"){
        //reset logic
        res.send("I should have resetttteedddd");
    }
    console.log(req.body);
    // res.json({command:"Reset"});
})



app.listen(port, () => {
    console.log(`BlackJack Server at http://localhost:${port}`)
});
