let express = require('express');
let app = express();
const bodyParser = require('body-parser');

var Datastore = require('nedb')
  , db = new Datastore({ filename: 'db.json' });
db.loadDatabase(function (err) {
    if (err) console.log(err);
});

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.post('/', (req, res) => {
    res.sendStatus(200);
    inputParser(req.body);
})

app.listen(3000);


function inputParser(input) {
    let timestamp = new Date();
    input.rx = parseFloat(input.rx);
    input.tx = parseFloat(input.tx);
    input.date = timestamp.toLocaleDateString("en-GB");
    input.timestamp = timestamp.getTime();
    console.log(input);
    insertDB(input);
}

function insertDB(doc){
    db.insert(doc, (err, newDoc) => {
        if (err) console.log(err);
        console.log(newDoc);
    })
}