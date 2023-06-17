const mongoose = require("mongoose");

// Model for Note for the notes to be stored in the notes collection
// Requires a title which is a string, 
// Requires a description which is a string
const Note = mongoose.model("Note", {
    title: {
        type: String,
        required: true
    },
    description: String,
    isCompleted: Boolean,
    dueDate: Date,
    createdAt: Date
});

module.exports = Note;