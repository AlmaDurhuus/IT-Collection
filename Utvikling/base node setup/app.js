//------ Import from setup ---------//
const setup = require('./setup.js')
const app = setup.app



//----------- Routes----------------//

app.get('', (request,response) => {

    // Renders index.hbs and sends to client 
    response.render("index.hbs", {
    // Title in head:
    title: "Home"
    })
})




//-------- Start aplication -----------//

app.listen(3000, function() { 
    console.log("Server is up! Check http://localhost:3000")
})