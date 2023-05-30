//------ Import from setup ---------//
const setup = require('./setup.js')
const app = setup.app
const bcrypt = setup.bcrypt
const db = setup.db


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

//---------------------------------//
//           Examples!             //
//---------------------------------//

/**
 * The following examples can also be found in the pdf book: Utvliking English Edition
 */

//--------Forms ---------------------//

// Render the form page, This is not needed if file is .html
app.get('/form', (request,response) => {response.render("forms.hbs", {})})

// this handles the form once submitted
app.post('/formHandler', (request,response) => {
    // to get the form content you can use request.body
    const name = request.body.name
    
    //redirect back to any desired page
    response.redirect('/form')
})


//---- Login and express session----------------------//


// Render the login page, This is not needed if file is .html
app.get('/login', (request,response) => {response.render("login.hbs", {})})

// this handles the login-form once submitted   
app.post('/loginHandler', (request,response) => {
    // to get the form content you can use request.body
    const name = request.body.name
    const password = request.body.password
    const type = request.query.type
    request.session.loggedIn = false

    if(type === 'login'){
        //Selecting with name
        const sql = db.prepare("SELECT * FROM login WHERE name = ?")
        const result = sql.get(name)
        // if result is true set loggedin to true and if so check if password is true
        if(result && (bcrypt.compareSync(password, result.password))){
            request.session.loggedIn = true
            //Redirect to any desired page
            response.redirect('/') }
        } else{response.redirect('/login')}
    if(type === 'create'){  
        //Hasing the password
        const hash = bcrypt.hashSync(password, 10);

        //insert statement into the database file
        const sql = db.prepare("INSERT INTO login (name, password) VALUES (?,?)")
        const result = sql.run(name, hash)

        request.session.loggedIn = true
        //Redirect to any desired page
        response.redirect('/')
    }});


//-------- Display items----------------//

app.get('/display', (request,response) => {

    // Get the items from the database
    const sql = db.prepare("SELECT * FROM items")
    const result = sql.all()
    response.render("display.hbs", {
        items:result
    });
});

//----- Shoppingcart--------------------//

app.get('/shoppingcart', (request,response) => {

    // Get the items from the database
    const sql = db.prepare("SELECT * FROM items")
    const result = sql.all()

    //Using inner join to get the shoppingcart, this can get complicated
    const sql2 = db.prepare(`
        SELECT orders_has_items.*, orders.status, items.name, items."desc"
        FROM orders_has_items
        JOIN orders ON orders_has_items.order_id = orders.id
        JOIN items ON orders_has_items.item_id = items.id
        WHERE orders.status = 'shoppingcart';`)
    const result2 = sql2.all()

    response.render("shoppingcart.hbs", {
        items:result,
        shoppingcart: result2
    });
});

//This will be handeling adding, delete and delete all in shoppingcart
app.get('/cartHandler', (request,response) => {
    const id = request.query.id
    const type = request.query.type

    //Add to cart handler
    if(type === 'addToCart'){
        //check if there's already a order with shoppingcart status
        const sql = db.prepare('SELECT * FROM orders WHERE status = ?')
        var result = sql.get('shoppingcart')
        if(!result){//if there was no shoppingcart then make new
            const sql = db.prepare('INSERT INTO orders (status) VALUES (?)')//Default is shoppingcart
            result = sql.run('shoppingcart')
        }
        const sql2 = db.prepare('INSERT INTO orders_has_items (item_id, order_id) VALUES (?,?)')
        const result2 = sql2.run(id, result.id)
    }

    //Delete item from cart handler
    if(type === 'delFromCart'){
        const sql = db.prepare('DELETE FROM orders_has_items WHERE id = ?')
        const result = sql.run(id)
    }

    //Delete everything from cart
    if(type === 'delCart'){
        const sql = db.prepare('DELETE FROM orders_has_items WHERE order_id =?')
        const result = sql.run(Number(id))
        console.log(result)
    }
    response.redirect('/shoppingcart')
});


//------ Access level------------------//

//Also an example on conditional rendering
app.get('/accesslevel', (request,response) => {
    const sql = db.prepare('SELECT * FROM accessLevel WHERE id = ?')

    //Try changing between 1-3 and see what happens in http://localhost:3000/accesslevel
    const result = sql.get(3)

    response.render("accessLevel.hbs", {
        accessLevel : result.accessLevel,
    })
})


//----- Options/sort-------------------//

app.get('/option_sort', (request,response) => {
    //Using inner join to get the type name
    const sql = db.prepare(`
        SELECT *
        FROM sort_items
        JOIN sort_type ON sort_items.type_id = sort_type.id
    `)
    const result = sql.all()

    //Select all types
    const sql2 = db.prepare(`SELECT * FROM sort_type`)
    const result2 = sql2.all()

    response.render("option_sort.hbs", {
        items: result,
        type : result2
    })
})

//------- Amount------------------------//

app.get('/amount', (request,response) => {
    
    //Select amount in database
    const sql = db.prepare('SELECT * FROM amount WHERE id = 1')
    const result = sql.get()

    //Only show the number
    response.render("amount.hbs", {
        amount : result.number
    })
})

app.get('/setAmount', (request,response) => {
    const number = request.query.amount
    console.log(number)

    //Update amount in database
    const sql = db.prepare('UPDATE amount SET number= ? WHERE id= 1')
    const result = sql.run(number)

    const data = {amount: number}
    response.send(data)
})
