const express = require("express");
const router = express.Router();
const {getNotes, createNotes, deleteAllNotes} = require("../controllers/NotesController")

router.get("/", getNotes);

router.post("/", createNotes);

router.delete("/clear", deleteAllNotes);

module.exports = router;