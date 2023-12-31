const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

async function dbConnect(){
	try {
		await mongoose.connect("mongodb://localhost:27017/note_taking_db")
		console.log("Database Connected")
	} catch (error) {
		console.log("There was an error connecting the database:\n" + JSON.stringify(error))
	}
};

dbConnect();

app.get("/", (request, response) => {
	response.json({
		message:"Welcome to the note taking backend"
	});
});

const notesRouter = require("./routes/Notes_routes");
app.use("/notes", notesRouter);

const userRouter = require("./routes/UserRoutes");
app.use("/user", userRouter);

module.exports = {
	app
}