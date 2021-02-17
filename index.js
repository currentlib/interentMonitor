let express = require('express');
let app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.post('/', (req, res) => {
    console.log(req.body);

    res.sendStatus(200);
    inputParser(req.body);
})

app.listen(3000);


function inputParser(input) {
    switch (input.type) {
        case "linux":
            console.log("LINUX");
            parseLinux(input.payload)
            return 0;
        case "windows":
            console.log("WINDOWS");
            return 0;
    };
}

function parseLinux(toParse) {
    let parseArr = toParse.split(";")
    console.log(parseArr[2] + " | " + parseArr[3]);
}