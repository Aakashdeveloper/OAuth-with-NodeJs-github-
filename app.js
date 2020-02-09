var express = require('express')
//import mongo from 'mongodb';
var bodyParser = require ('body-parser');
const app = express();
var superagent = require('superagent');
var request = require('request');

const port = 9800;
/*const MongoClient = mongo.MongoClient;
const mongourl = "mongodb://localhost:27017";
let db;
let col_name = "eduJan";*/

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'))
//View files
app.set('views', './src/views');
//View engine
app.set('view engine', 'ejs');


app.get('/login',(req,res) => {
   res.render('index')
})

app.get('/user',(req,res) => {
    const  {query} = req
    const {code} = query
    if(!code) {
         res.send({
            success:false,
            message: 'Error: no Code'
        })
    }
    console.log(">>>>codde",code)

    superagent
        .post('https://github.com/login/oauth/access_token')
        .send({
            client_id:'d1b9bd200fa9043449f4',
            client_secret:'8f277116a8b11c4044a2b6298cdd9169d94b907c',
            code:code}) // sends a JSON post body
        .set('Accept', 'application/json')
        .end((err, result) => {
            if(err) throw err
            //res.send(result.body)  
            var acctoken = result.body.access_token
            const options = {
                url: 'https://api.github.com/user',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'token '+ acctoken,
                    'User-Agent': 'my-reddit-client'
                }
            };
            var output;
            request(options, function(err, response, body) {
            output = body
            return  res.send(body)
            });
        })

 })
 

 app.get('/repo',(req,res) => {
     var acctoken = "04b1677f26e6946004619d3f3cf53dc0d9167caa"
     const options = {
        url: 'https://api.github.com/user',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'token '+ acctoken,
            'User-Agent': 'my-reddit-client'
        }
    };
    var output;
    request(options, function(err, response, body) {
      output = body
      return  res.send(body)
    });

   

 })



app.listen(port, function(err){
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})