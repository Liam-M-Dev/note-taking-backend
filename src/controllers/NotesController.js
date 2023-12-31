const Note = require("../models/NoteModel");
const User = require("../models/UserModel");


const getNotes = async (request, response) => {
    let listOfNotes 
    if (Object.keys(request.query).length > 0) {
        if (request.query.isCompleted === "true"){
            listOfNotes = await Note.find({isCompleted: true})
        } else if (request.query.isCompleted === "false") {
            listOfNotes = await Note.find({isCompleted: false})
        } else {
            listOfNotes = await Note.find()
        }
        response.send(listOfNotes)
            
    } else {
        listOfNotes = await Note.find();
    
        response.send(listOfNotes);
    }
    
};

const getMyNotes = async (request, response) => {
    let user = await User.findOne({username: request.body.username}).populate("notes");
    response.send(user.notes);
}

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
    let user = await User.findOne({username: request.body.username})

    let newNote = new Note({
        title: request.body.title,
        description: request.body.description,
        isCompleted: false,
        dueDate: new Date().setDate(new Date().getDate() + 1),
        createdAt: Date.now()
    });
    await newNote.save();
    user.notes.push(newNote._id)
    await user.save()
    response.status(201);
    response.json({
        note: newNote,
        user: user
    });
};

const updateNote = async (request, response) => {
    let updatedNote = await Note.findByIdAndUpdate(request.params.id, request.body, {new: true})
                                    .catch(error => {
                                        console.log("Some error while accessing data:\n" + error)
                                        response.status(404).json({
                                            error: "Id not found in database"
                                        })
                                    });
    response.send(updatedNote);
};


const deleteAllNotes = async (request, response) => {
    await Note.deleteMany({});

    response.json({
        message: "all notes cleared from database"
    })
}

const deleteNoteById = async (request, response) => {
    let user = await User.findOne({username: request.body.username})

    let deletedNote = await Note.findByIdAndDelete(request.params.id)
                .catch(error => {
                    console.log("Some error while accessing data:\n" + error)
                    response.status(404).json({
                        error: "Id not found in database"
                    })
                });
    if (deletedNote){
        user.notes.shift(note._id);
        response.json({
            message: "Note deleted"
        })
    };
}
    

module.exports = {
    getNotes, getMyNotes, createNotes, deleteAllNotes, getNoteById,
    deleteNoteById, updateNote
};