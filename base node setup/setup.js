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


//--------- Exports--------------//

exports.app = app