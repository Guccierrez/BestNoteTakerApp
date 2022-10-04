const util = require('util');
const fs = require('fs');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);


const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );


const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      //parse take a JSON string and then transforms it into a JavaScript object
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

const readAndDelete = (file, id) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {

      const parsedData = JSON.parse(data)

     
      //if notes index doesnt match the id of the note we're trying to delete, push to notes to keep array
        const filteredData = parsedData.filter((note) => note.id !== id);
  
 
      writeToFile(file, filteredData);
    }
  });
};

//go back to lesson 11 activity 22 for reference

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };