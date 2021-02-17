let express = require('express');
let app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.post('/', (req, res) => {
    //console.log(req.body);

    res.sendStatus(200);
    inputParser(req.body);
})

app.listen(3000);


function inputParser(input) {
	console.log(input);
}

function parseLinux(toParse) {
    let parseArr = toParse.split(";")
    console.log(parseArr[2] + " | " + parseArr[3]);
}
