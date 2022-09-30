const express = require("express")
const path = require("path");
const PORT = process.env.PORT || 3001;
const db = require("./db/db.json");
const app = express();
const fs = require ("fs");
const util = require("util");



// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));


app.get("/notes", (req, res) =>{


    res.sendFile(path.join(__dirname, "/public/notes.html"));


})

app.get("/api/notes", (req, res) =>{

    res.json(db);
})


// app.post('/api/notes', (req, res) => {
//         // Log that a POST request was received
//         console.info(`${req.method} request recieved to add note`);
      
//         // Prepare a response object to send back to the client
//         let response;
      
//         // Check if there is anything in the response body
//         if (req.body && req.body.product) {
//           response = {
//             status: 'success',
//             data: req.body,
//           };
//           res.status(201).json(response);
//         } else {
//           res.status(400).json('Request body must at least contain a product name');
//         }
      
//         // Log the response body to the console
//         console.log(req.body);
//       });
      
//       ////////////////////////////////

//       app.post('/api/notes', (req, res) => {
//         // Log that a POST request was received
      
//         // Prepare a response object to send back to the client
//         let note = req.body;



//////////////////////////////////////////////////////
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

app.post("/api/notes", function(req, res) {
    const note = req.body;
    readFileAsync("./db/db.json", "utf8").then(function(data) {
      const notes = [].concat(JSON.parse(data));
      note.id = notes.length + 1
      notes.push(note);
      return notes
    }).then(function(notes) {
      writeFileAsync("./db/db.json", JSON.stringify(notes))
      res.json(note);
      console.log("LETS GOOOOOOOOOOOO")
    })
});



app.listen(PORT, ()=> console.log("listening on port http://localhost:"+PORT))






// // GIVEN a note-taking application
// // WHEN I open the Note Taker
// // THEN I am presented with a landing page with a link to a notes page
// // WHEN I click on the link to the notes page
// // THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
// // WHEN I enter a new note title and the note’s text
// // THEN a Save icon appears in the navigation at the top of the page
// // WHEN I click on the Save icon
// // THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
// // WHEN I click on an existing note in the list in the left-hand column
// // THEN that note appears in the right-hand column
// // WHEN I click on the Write icon in the navigation at the top of the page
// // THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column