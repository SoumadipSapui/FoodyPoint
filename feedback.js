var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

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


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('feedback.html');
}).listen(8000);


console.log("Listening on PORT 8000");