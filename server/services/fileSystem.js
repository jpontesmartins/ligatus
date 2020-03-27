//
// montar o grafo a partir da leitura de arquivos no FILE SYSTEM
// o json abaixo eh apenas para exemplificar; e ele está com uma dependência circular 


const graph = require("../domain/graph");


module.exports = {
    "nodes": [
        {
            "id": 1,
            "label": "index",
            "shape": "image",
            "image": "https://cdn.discordapp.com/attachments/253635650870444032/650688296183136270/unknown.png"
        },
        {
            "id": 2,
            "label": "react",
            "shape": "image",
            "image": "https://cdn.discordapp.com/attachments/253635650870444032/650688296183136270/unknown.png"
        },
        {
            "id": 3,
            "label": "./Footer",
            "shape": "image",
            "image": "https://cdn.discordapp.com/attachments/253635650870444032/650688296183136270/unknown.png"
        }
    ],
    "edges": [
        {
            "from": 1,
            "to": 2
        },
        {
            "from": 2,
            "to": 3
        },
        {
            "from": 3,
            "to": 2
        }
        
    ]
}