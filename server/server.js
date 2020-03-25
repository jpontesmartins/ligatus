const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const cors = require("cors");

const serviceGraph = require("./domain/services");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/graph', function (req, res) {
    const graph = serviceGraph.getGraph();
    res.send(graph);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

