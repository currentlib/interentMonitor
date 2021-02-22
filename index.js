let express = require('express');
let app = express();
const bodyParser = require('body-parser');

var Datastore = require('nedb')
  , db = new Datastore({ filename: 'db.json' });
db.loadDatabase(function (err) {
    if (err) console.log(err);
});

app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(3000);

function inputParser(input) {
    let timestamp = new Date();
    input.rx = parseFloat(input.rx);
    input.tx = parseFloat(input.tx);
    input.date = `${("0" + timestamp.getDate()).slice(-2)}/${("0" + (timestamp.getMonth() + 1)).slice(-2)}/${timestamp.getFullYear()}`;
    input.timestamp = timestamp.getTime();
    insertDB(input);
}

function insertDB(doc){
    db.insert(doc, (err, newDoc) => {
        if (err) console.log(err);
    })
}

function findDB(res, query){
    if ((query["name"] == undefined) || (query["date"] == undefined)) {
        res.sendStatus(400)
    } else {
        db.count(query, (err, count) => {
            if (count > 0) {
                db.find(query).sort({timestamp: 1}).exec((err, docs) => {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    } else {
                        let obj = {
                            machine: query["name"],
                            unit: "kb/s",
                            result: []
                        }
                        docs.forEach((element, i, arr) => {
                            obj.result.push({
                                date: element.date,
                                tx: element.tx,
                                rx: element.rx,
                                timestamp: element.timestamp
                            });
                            if (i == arr.length - 1) {
                                res.send(obj);
                            }
                        });
                    }
                })    
            } else {
                res.sendStatus(400);
            }
        });
        
    };
}
