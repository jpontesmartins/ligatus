const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/graph', function(req, res) {

    
    res.send({ graph: "grafoo" });   
});

app.listen(port, () => console.log(`Listening on port ${port}`));

