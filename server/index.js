const Express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel =  require('./models/Users');

mongoose.connect("mongodb+srv://admin:fA3zmaeCoNxg3BsI@cluster0.m54yfvr.mongodb.net/valorantdb?retryWrites=true&w=majority&appName=Cluster0");

const app = Express();
app.use(Express.json());
app.use(cors());

// GET request to show all users
app.get("/getUsers", (req, res) => {
    UserModel.find({})
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            console.error("Error retrieving users:", error);
            res.status(500).json({ error: "An error occurred while retrieving users." });
        });
});

// POST request to create a user
app.post("/createUser", async (req, res) =>{
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user);
});

app.listen(5069, () => {
    console.log("Server Connection Successful!");
});
