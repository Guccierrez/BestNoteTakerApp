const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;
const db = require("./db/db.json");
const { v4: uuidv4 } = require('uuid');;
const { readFromFile, readAndAppend, readAndDelete } = require('./routes/readWriteFiles');

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

app.get("/api/notes", (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})



app.post("/api/notes", function (req, res) {
  console.log(req.body);
  //deconstruction allows us to work with variable in the array
  const { title, text } = req.body;
  
  if (req.body) {
    const newNote = {
      title, 
      text,
      id: uuidv4()
    };
    readAndAppend(newNote, './db/db.json');
    //res is backend to frontend 
    res.json(`Yezzur`);
  } else {
    res.error('warning critical error! Note not added');
  }
});


//delete request needs ID in order to only delete that specific post

app.delete("/api/notes/:id", function (req, res) {
    readAndDelete('./db/db.json', req.params.id);
    res.json(`yezzur successful deletion`);
});

app.listen(PORT, () => console.log("listening on port http://localhost:" + PORT))