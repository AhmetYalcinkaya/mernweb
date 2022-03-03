const dotenv = require("dotenv");
const express = require("express");
const bcryptjs = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 3001;

//mongose connection
dotenv.config({ path: "../config.env" });
require("./db/conn");

//require model
const Users = require("./models/userSchema");
const Message = require("./models/msgSchema");
const authenticate = require("./middleware/authentication");

const app = express();

app.get("/", (req, res) => {
  res.send("Helloooo");
});

//these methon is used to get data and cooki from frontend
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//registeration

app.post("/register", async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const createUser = new Users({
      username: username,
      email: email,
      password: password,
    });

    const created = await createUser.save();
    console.log(created);
    res.status(200).send("Registered");
  } catch (error) {
    res.status(400).send(error);
  }
});

//Lıgin
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    //Find user if exist

    const user = await Users.findOne({ email: email });
    if (user) {
      //verify password
      const isMatch = await bcryptjs.compare(password, user.password);

      if (isMatch) {
        //generate token which is define in userScema
        const token = await user.generateToken();
        res.cookie("jwt", token, {
          //expires token in 24 hours
          expires: new Date(Date.now() + 86400000),
          httpOnly: true,
        });
        res.status(200).send("Login");
      } else {
        res.status(400).send("Invalid email");
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//message

app.post("/message", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    const sendMessage = new Message({
      name: name,
      email: email,
      message: message,
    });

    const created = await sendMessage.save();
    console.log(created);
    res.status(200).send("Sent");
  } catch (error) {
    res.status(400).send(error);
  }
});

//logout
app.get("/logout", (req, res) => {
  res.clearCookie("jwt", { path: "/" });
  res.status(200).send("User Logged Out");
});

//Authentication
app.get("auth", authenticate, (req, res) => {});

//Run Server
app.listen(port, () => {
  console.log("Server up");
});
