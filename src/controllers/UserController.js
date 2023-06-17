const User = require("../models/UserModel")

const signUp = async (request, response) => {
    let newUser = new User({
        username: request.body.username
    });

    let savedUser = await newUser.save().catch(error => {
        console.log("Error in saving user:\n" + error);
        response.status(401).json({
            message: "Username already exists"
        })
    });

    response.send(savedUser);
};

module.exports = {signUp};