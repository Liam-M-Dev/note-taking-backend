const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
    response.json({
        message: "The list of notes"
    });
});

router.post("/", (request, response) => {
    response.json({
        note: {
            id: 1,
            title: "Welcome to the note taking app",
            description: "Make your notes here",
            isCompleted: false,
            dueDate: new Date().setDate(new Date().getDate() + 1),
            createdAtDate: Date.now()
        }
    })
});

module.exports = router;