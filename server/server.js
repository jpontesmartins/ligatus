const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const cors = require("cors");

const gateway = require("./gateways");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//rotas/controllers
app.get('/graph', async (req, res) => {
    const inputDoUsuario = `${__dirname}/domain/tests/demo2.txt`;
    console.log(inputDoUsuario);

    const graph = await gateway.getGraph(inputDoUsuario);
    console.log(graph);
    
    res.send(graph);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

