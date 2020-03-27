const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const cors = require("cors");

const gateway = require("./gateways");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//rotas/controllers
app.get('/graph', async (req, res) => {

    //esse dado é pego pelo req.valor
    const inputDoUsuario = `${__dirname}/domain/graph/tests/demo2.txt`;
    console.log("[server.js] - /graph");
    console.log("[server.js] - " + inputDoUsuario);

    //gateway
    const graph = await gateway.getGraph(inputDoUsuario);
    res.send(graph);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

