const express = require('express');
const fs = require("fs");
const router = express.Router();
const util = require('util');
const { v4: uuidv4 } = require("uuid");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
function readNotes() {
  return readFile("db/db.json", "utf-8");
}

router.get("/notes", (req, res) => {
  readNotes().then(data => {
    let notes = [];
    notes = notes.concat(JSON.parse(data));
    return notes
  }).then(notes => res.json(notes)).catch(err => res.json(err));
})

router.post("/notes", (req, res) => {
  var newNote = { title: req.body.title, text: req.body.text, id: uuidv4() };
  readNotes().then(data => {
    let notes = [];
    notes = notes.concat(JSON.parse(data))
    notes.push(newNote)
    return notes
  }).then(notes => {
    return writeFile("db/db.json", JSON.stringify(notes));
  }).then(response => res.send({ msg: "Success" }));
})

router.delete('/notes/:id', (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    const allNotes = JSON.parse(data);
    const deleteNote = req.params.id;

    const result = allNotes.filter(note => note.id != deleteNote);

    fs.writeFile("./db/db.json", JSON.stringify(result), (err) => {
      if (err) res.json({ err: "error deleting" });
      res.json(result);
    });
  });
});

module.exports = router;