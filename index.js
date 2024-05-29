const express = require('express');
const path = require('path');
var cors = require('cors')
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
const port = process.env.PORT || 8080;
const genAI = new GoogleGenerativeAI("api key here");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(bodyParser.json())

async function run(implement) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  
    const prompt = "please make this text more calming and only return the calmed text like (go away -> please give me some room and make the tone corporate): "+implement
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text
  }
  

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/main.html'));
});

app.post('/upload', async function(req, res) {
    try {
        const lmao = await run(req.body.message);
        console.log(lmao)
        let boy = {"message": lmao}
        res.send(boy);
    } 
    catch (e) {
        res.send({"message": "something went wrong maybe dont use bad words just take them out"})
    }
});


app.listen(port);
console.log('Server started at http://localhost:' + port);
