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

app.get('/api/get/stats', (req, res) => {
    findDB(res, req.query);
});

app.delete('/api/delete/db', (req, res) => {
    db.remove({}, {multi: true}, (err, numRemoved) => {
        console.log(numRemoved);
    })
    res.sendStatus(200);
})

app.post('/api/post/monitor', (req, res) => {
    inputParser(req.body);
    res.sendStatus(200);
})

app.get('/api/get/stats_file', (req, res) => {
    findDBFile(res, req.query);
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

function findDB(res, query){
    if (query["name"] != undefined) {
        db.find(query, (err, docs) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send({ result: docs});
            }
        })
    } else {
        db.find(query, (err, docs) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send({ result: docs});
            }
        })
    };
}
