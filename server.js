const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = 3001;

const notes = require('./db/db.json')

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

app.get('/', (req,res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/api/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
    console.info(`${req.method} request received to get notes`);

});

app.post('/api/notes', (req,res) => {
    console.info(`${req.method} request received to add note`)
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);