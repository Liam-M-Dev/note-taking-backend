const express = require("express");
const router = express.Router();
const {getNotes, createNotes, deleteAllNotes, getNoteById} = require("../controllers/NotesController")

// Route to get all the notes in the note collection
router.get("/", getNotes);

// Route to get a note by an id;
router.get("/:id", getNoteById);

// Route to allow user to post a note to notes collection
router.post("/", createNotes);

// Route to allow user to remove all notes from the collection
router.delete("/clear", deleteAllNotes);

module.exports = router;