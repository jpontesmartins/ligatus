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
    const inputDoUsuario = `${__dirname}/domain/tests/demo2.txt`;

    const graph = await gateway.getGraph(inputDoUsuario);
    res.send(graph);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

