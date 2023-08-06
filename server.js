const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = 3001;

const notes = require('./db/db.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received to get notes`);
  
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading the file:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      try {
        const notes = JSON.parse(data);
        res.status(200).json(notes);
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
      }
    });
  });

app.post('/api/notes', (req,res) => {
    console.info(`${req.method} request received to add note`)
    const newNote = req.body;
    
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return
        }
    
        try {            
            const jsonData = JSON.parse(data);

            jsonData.push(newNote);

            const updatedNotes = JSON.stringify(jsonData, null, 2);

            fs.writeFile('./db/db.json', updatedNotes, 'utf8', (err) => {
                if (err) {
                  console.error('Error writing to the file:', err);
                  return;
                }
                console.log('File updated successfully!');
              });

              res.status(200).sendFile(path.join(__dirname, '/public/notes.html'));
            } catch (error) {
              console.error('Error parsing JSON:', error);
            }
    })

});

app.delete('/api/notes/:id', (req, res) => {
})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);