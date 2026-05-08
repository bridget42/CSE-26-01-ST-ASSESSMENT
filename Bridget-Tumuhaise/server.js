// dependancies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const expressSession = require("express-session");

//import registration model
const Product = require('./models/Product');
require("dotenv").config();

//Import routes
const indexRoutes = require("./routes/indexRoutes");

//instantiations
const app = express();
const PORT = 5002;

// configurations
//mongodb settings
mongoose.connect(process.env.DATABASE);
mongoose.connection
  .once("open", () => {
    console.log("Mongoose connnection open");
  })
  .on("error", (err) => {
    console.error(`connection error: ${err.message}`);
  });

//Set view engine to pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views")); //specifies the views directory

//middleware
//To parse URL encoded data
app.use(express.urlencoded({ extended: false })); //This helps to parse data from forms.
app.use(express.static(path.join(__dirname, "public")));
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(
  expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

//routes
app.use("/", indexRoutes)

app.use((req, res) => {
  res.status(404).send("Oops! Route not found.");
});

//6.Bootstrapping server
app.listen(PORT, () => console.log(`listening on port ${PORT}`)); // new
