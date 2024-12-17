const express = require("express"); //helps us build API
const app = express(); // Us using express
const mongoose = require("mongoose"); // helps us talk to MongoDB
const passport = require("passport"); // helps us with authentication - different types of strategies for log ins eg. FB, X, GMAIL etc.
const session = require("express-session"); // make sure users can stay logged in uses cookies that are stored locally
const MongoStore = require("connect-mongo")(session); // storing actual session in MongoDB - keeps you logged in even you leave application
const methodOverride = require("method-override"); // override methods that are coming in eg. gets/post ->  puts/deletes
const flash = require("express-flash"); //helps show all notifications eg. enter in wrong password
const logger = require("morgan"); // shows logs of methods used in terminal
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const recipeRoutes = require("./routes/recipe");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" }); // not baked in by default, we have to tell it to require it.

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for VIEW engine
app.set("view engine", "ejs"); // the HTML that is sent to the client

//Static Folder
app.use(express.static("public")); // our CSS , JS, IMGS for the face application.

//Body Parsing
app.use(express.urlencoded({ extended: true })); // pull stuff out of the forms/request that come in
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method")); // checks if querey param is _method, override it

// Setup Sessions - stored in MongoDB / when someone logs in they stay logged in , they can close the browser come back and be logged in
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware ,we are using passport for log in and stay logged in with sessions..
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/recipe", recipeRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
