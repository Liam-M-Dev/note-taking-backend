const express = require("express");
const router = express.Router();
const {getNotes, getMyNotes, createNotes, deleteAllNotes, 
    getNoteById, deleteNoteById, updateNote} = require("../controllers/NotesController")

// Route to get all the notes in the note collection
router.get("/", getNotes);

router.get("/my_notes", getMyNotes);

// Route to get a note by an id;
router.get("/note/:id", getNoteById);

router.put("/note/:id", updateNote);

// Route to find note by id and delete from database
router.delete("/note/:id", deleteNoteById);

// Route to allow user to post a note to notes collection
router.post("/", createNotes);

// Route to allow user to remove all notes from the collection
router.delete("/clear", deleteAllNotes);

module.exports = router;