import express, { response } from "express";
import connection from "./database/database.js";
import { Game } from "./models/Game.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}))

// DB
connection.authenticate().then(() => {
    console.log("Conexão feita com banco de dados");
});

app.get("/games", (request, response) => {
    Game.findAll().then(game => {
        response.json(game)
    })
    response.status = 200;
})

app.post("/game", (request, response) => {
    let { title, year, price } = request.body;

    if(title != undefined && year != undefined && price != undefined){
        Game.create({
            title,
            year,
            price
        }).then( ()=> {
            response.json({
                msg: "Criado com sucesso"
            })
        })
        response.status = 200
    }
})

app.put("/game/:id", (request, response) => {
    let id = request.params.id;
    let {title, year, price} = request.body;

    if(isNaN(id)){
        response.json({
            msg: "Defina um ID correto!"
        })
        response.status = 400
    }

    Game.update({title: title, year:year, price:price}, {
        where: {id:id}
    }).then(() => {
        response.json({
            msg: "Game Modificado!"
        })
    })
    response.status = 200;
})

app.delete("/game/:id", (request, response) => {
    let id = request.params.id;

    if (id != undefined && !isNaN(id)) {
        Game.destroy({
            where: {id: id}
        }).then(() => {
            response.json({
                msg: "OK DELETE"});
        })
    }else{
        response.redirect("/games")
    }
})

app.listen(4000, () => {
    console.log("API Rest Iniciada na porta 4000")
})