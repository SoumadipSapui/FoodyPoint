var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const http = require('http');
const path = require("path");
const users = require('./data').userDB;


const app = express();
const server = http.createServer(app);

app.use(bodyParser.json())
app.use(express.static('Express'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/public',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

// Order database

app.post("/order",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var food = req.body.food;
    var quantity = req.body.quantity;
    var address = req.body.address
    
    
    var data = {
        "name": name,
        "email" : email,
        "phone": phone,
        "food" : food,
        "quantity" : quantity,
        "address" : address
    }

    db.collection('order').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Order placed successfully.")
    });

    return res.redirect('order_success.html')

})

// Feedback database


app.post("/feedback",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var feedback = req.body.feedback;
    
    

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "feedback" : feedback
        
    }

    db.collection('feedback').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Feedback submitted successfully.")
    });

    return res.redirect('index.html')

})

// Login

/*
app.post("/login",async(req,res) =>{
    
    try{
        var uname = req.body.uname;
        var password = req.body.password;

        var username = await signup.findOne({uname});
        if(username.password === password){
            res.status(201).render("index")
        }else{
            res.send("Invalid login details");
        }
    }catch(error){
        res.status(400).send("Invalid username")
    }
        

    
}) 

app.post('/login', async (req, res) => {
    try{
        let foundUser = users.find((data) => req.body.uname === data.uname);
        if (foundUser) {
    
            let submittedPass = req.body.password; 
            let storedPass = foundUser.password; 
    
            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                let usrname = foundUser.uname;
                res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br><div align='center'><a href='./login.html'>logout</a></div>`);
            } else {
                res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
            }
        }
        else {
    
            let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
            await bcrypt.compare(req.body.password, fakePass);
    
            res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
        }
    } catch{
        res.send("Internal server error");
    }
});  */

// Signup

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var username = req.body.username;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "username":username,
        "password" : password
    }

    db.collection('register').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Data inserted successfully")
    });

    return res.redirect('index.html')

}) 


/*
// Register

app.post('/signup', async (req, res) => {
    try{
        let foundUser = users.find((data) => req.body.email === data.email);
        if (!foundUser) {
    
            let hashPassword = await bcrypt.hash(req.body.password, 10);
    
            let newUser = {
                id: Date.now(),
                name: req.body.name,
                phno: req.body.phno,
                email: req.body.email,
                username: req.body.uname,
                password: hashPassword,
            };
            users.push(newUser);
            console.log('User list', users);
    
            res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
        } else {
            res.send("<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='./registration.html'>Register again</a></div>");
        }
    } catch{
        res.send("Internal server error");
    }
});

app.post('/login', async (req, res) => {
    try{
        let foundUser = users.find((data) => req.body.uname === data.uname);
        if (foundUser) {
    
            let submittedPass = req.body.password; 
            let storedPass = foundUser.password; 
    
            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                let usrname = foundUser.uname;
                res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br><div align='center'><a href='./login.html'>logout</a></div>`);
            } else {
                res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
            }
        }
        else {
    
            let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
            await bcrypt.compare(req.body.password, fakePass);
    
            res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
        }
    } catch{
        res.send("Internal server error");
    }
});

*/




app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);


console.log("Listening on PORT 3000");

