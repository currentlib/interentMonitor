let express = require('express');
let app = express();

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.send("Hello from GET");
});

app.post('/', (req, res) => {
    res.send("Hello from POST");
})

app.listen(3000);