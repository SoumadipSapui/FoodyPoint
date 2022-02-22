var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');
const { LEGAL_TCP_SOCKET_OPTIONS } = require("mongodb");
mongoose.connect('mongodb://localhost:27017/public');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
console.log("connection succeeded");
})
var app=express()
app.use(bodyParser.json());
app.use(express.static('Express'));
app.use(bodyParser.urlencoded({
extended: true
}));

app.post("/login", async(req,res) =>{
    try{
        const uname = req.body.uname;
        const password = req.body.password;
        const username = await login.findOne({uname});
        if(username.password === password){
            res.status(201).render("index");
        }else{
            res.send("Password are not matching");
        }
    }
    catch(error){
        res.status(400).send("invalid Usename")
    }
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('feedback.html');
}).listen(8000);


console.log("Listening on PORT 8000");

