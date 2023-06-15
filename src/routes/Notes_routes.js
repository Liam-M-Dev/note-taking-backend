const express = require("express");
const router = express.Router();
const {getNotes, createNotes} = require("../controllers/NotesController")

router.get("/", getNotes);

router.post("/", createNotes);

module.exports = router;