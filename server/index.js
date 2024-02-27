const Express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel =  require('./models/Users');

mongoose.connect("mongodb+srv://admin:fA3zmaeCoNxg3BsI@cluster0.m54yfvr.mongodb.net/valorantdb?retryWrites=true&w=majority&appName=Cluster0");

const app = Express();
app.use(Express.json());
app.use(cors());

// Function to generate a random 7-digit number
function generateRandomUserId() {
    return Math.floor(1000000 + Math.random() * 9000000);
}

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
// app.post("/createUser", async (req, res) =>{
//     const user = req.body;
//     const newUser = new UserModel(user);
//     await newUser.save();

//     res.json(user);
// });

// POST request to create a user
app.post("/createUser", async (req, res) =>{
    const { name, username } = req.body;
    try {
        let newUserId;
        let existingUser;
        
        // Generate a random 7-digit userId and check if it already exists
        do {
            newUserId = generateRandomUserId();
            existingUser = await UserModel.findOne({ userId: newUserId });
        } while (existingUser);

        // Create a new user with the generated userId
        const newUser = new UserModel({ userId: newUserId, name, username });
        await newUser.save();

        res.json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "An error occurred while creating the user." });
    }
});

// POST request to delete a user
app.post("/deleteUser", async (req, res) => {
    const userId = req.body.userId;
    try {
        const deletedUser = await UserModel.findOneAndDelete({ userId: userId });
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found." });
        }
        res.json({ message: "User deleted successfully.", deletedUser });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "An error occurred while deleting the user." });
    }
});



app.listen(5069, () => {
    console.log("Server Connection Successful!");
});
