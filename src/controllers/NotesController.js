const Note = require("../models/NoteModel");


const getNotes = async (request, response) => {
    let listOfNotes = await Note.find();
    
    response.json({
        notes: listOfNotes
    });
};

const createNotes = async (request, response) => {
    let newNote = new Note({
        title: request.body.title,
        description: request.body.description,
        isCompleted: false,
        dueDate: new Date().setDate(new Date().getDate() + 1),
        createdAt: Date.now()
    });
    await newNote.save();
    response.status(201);
    response.json({
        note: newNote
    });
};

const deleteAllNotes = async (request, response) => {
    await Note.deleteMany({});

    response.json({
        message: "all notes cleared from database"
    })
}

module.exports = {
    getNotes, createNotes, deleteAllNotes
};