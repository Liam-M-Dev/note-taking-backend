const Note = require("../models/NoteModel");


const getNotes = async (request, response) => {
    let listOfNotes = await Note.find();
    
    response.json({
        notes: listOfNotes
    });
};

// Function to get a single note using params which is the ID of the note
// Handles error by responding with message if note not found in db
const getNoteById = async (request, response) => {
    let note = await Note.findById(request.params.id)
                        .catch(error => {
                            console.log("Some error while accessing data:\n" + error)
                            response.status(404).json({
                                error: "Id not found in database"
                            })
                        });
    response.send(note);
}


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

const updateNote = async (request, response) => {
    let updatedNote = await Note.findByIdAndUpdate(request.params.id, request.body, {new: true})
    response.send(updatedNote);
};


const deleteAllNotes = async (request, response) => {
    await Note.deleteMany({});

    response.json({
        message: "all notes cleared from database"
    })
}

const deleteNoteById = async (request, response) => {
    let deletedNote = await Note.findByIdAndDelete(request.params.id)
                .catch(error => {
                    console.log("Some error while accessing data:\n" + error)
                    response.status(404).json({
                        error: "Id not found in database"
                    })
                });
    if (deletedNote){
        response.json({
            message: "Note deleted"
        })
    };
}
    

module.exports = {
    getNotes, createNotes, deleteAllNotes, getNoteById,
    deleteNoteById, updateNote
};