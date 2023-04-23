//--------- Import required modules-----//
const fs = require('fs')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

//---------- Overall setup--------------//

//Starts the express app and turns on the public folder
const app = express()
const publicDirectoryPath = path.join(__dirname, "/public")
app.use(express.static(publicDirectoryPath))


//Using urlencoded-middleware, To get access to request.body in post-forms
app.use(express.urlencoded({ extended: true }));


//Adds Handlebars to enable Server Side Rendering
const viewPath = path.join(__dirname, "/views/pages")
const partialsPath = path.join(__dirname, "/views/partials")
app.set("view engine", hbs)
app.set('views',viewPath)
hbs.registerPartials(partialsPath)


//--------- Exports---------------//

exports.app = app


//-------- Example code-----------//

/**
 * How to use
 * Copy needed code into your own setup project
 * example *Import* goes to *Import required modules* at top
 * This code can also be found in the pdf: Utvikling_English_Edition
 */


//----- Database-------------------//

//npm install better-sqlite3

// Import:
const sqlite3 = require('better-sqlite3')

//Connect to databse, change mydb.sdb to database file name
const db = sqlite3('mydb.sdb', {verbose:console.log})

// Export:
exports.db = db

//Workbench to Sqlite
//Example can be found in dbCreate.js


//----- Bcrypt------------------//

// npm install bcrypt

// Import:
const bcrypt = require('bcrypt')

// Export:
exports.bcrypt = bcrypt

// Hash password:
const hash = bcrypt.hashSync(`some password`, 10); // Use in app.js

//Check hashed password:
const check = bcrypt.compareSync(`some password`, hash); // Use in app.js // Returns true or false

//Example: 
if(check){
 //Do something here if password is correct
}


//----- Express-Sessions-------------//

// npm install express-session

//Import:
const session = require('express-session')


// Set up for sessions
app.use(session( {
    secret: "Long_texst_that_should_be_secret",
    resave: false,
    saveUninitialized : false
}))

// Export:
exports.session = session


//-------- Multer------------------//
// File upload

// npm install multer

// Import:
const multer = require('multer')

//File upload setup:
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads') // create new folder in Public named Uploads!!
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

// Export:
exports.upload = upload


//---------- HBS HELPERS----------------//

//-------AccessLevel-------------------//

//This also counts as conditional rendering

//a custom helper that takes multiple arguments and compares them
hbs.registerHelper('ifAnyEqual', function() {
  // Convert the arguments object to an array and extract the options object
  const args = Array.from(arguments);
  const options = args.pop();

  // Compare each argument to the next argument
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === args[i + 1]) {
      // Render the contents of the {{#if}} block if any two arguments are equal
      return options.fn(this);
    }
  }
  // Render the contents of the {{else}} block if no arguments are equal
  return options.inverse(this);
});
