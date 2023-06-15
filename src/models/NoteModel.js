const mongoose = require("mongoose");

const Note = mongoose.model("Note", {
    title: String,
    description: String,
    isCompleted: Boolean,
    dueDate: Date,
    createdAt: Date
});

module.exports = Note;