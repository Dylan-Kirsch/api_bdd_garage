const {query} = require("express");
const express = require("express");
const app = express();

const mysql = require('mysql');
const connect = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "garage",
});

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.listen(8080);
app.use(express.json());

connect.connect(function(err)
{
    if(err) throw err;
    console.log("Super cela fonctionne TROP BIEN");
    connect.query("SELECT * FROM voiture;" , function(err, result)
    {
        if(err) throw err;
        console.log(result);
    })
});

app.get("/voiture", function(request, response)
{
    connect.query("SELECT * FROM voiture;" , function(err, result)
    {
        if(err) throw err;
        console.log(result);
        response.status(200).json(result);
    })

});

app.get("/voiture/:id", function(request, response)
{
    connect.query("SELECT * FROM voiture WHERE id ="+request.params.id+";" , function(err, result)
    {
        if(err) throw err;
        console.log(result);
        response.status(200).json(result);
    })
});

app.post('/voiture', (request, response) => {
    const querys = "INSERT INTO voiture (marques, models, kilomètres) values ('"+request.body.marques+"','"+request.body.models+"','"+request.body.kilomètres+"');";
    // const querys = "INSERT INTO voiture (marques, models, kilomètres) values ('"+"Audi"+"','"+"e-tron GT quattro"+"','"+50+"');";    
    console.log(querys);
    connect.query(querys, function(err, result)
    {
        if(err) throw err;
        console.log(result);
        response.status(200).json(result);
    })
});

app.delete('/voiture/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const querys = "DELETE FROM voiture WHERE id ="+id+ ";";

    connect.query(querys, function(err, result)
    {
        if(err) throw err;
        console.log(result);
        response.status(200).json(result);
    })
});

// UPDATE

app.put('/voiture/:id', (request, response) => {
    const querys = " Update voiture SET `marques`='porche',`models`='cayenne',`kilomètres`='100' WHERE id ="+request.params.id+ ";";

    connect.query(querys, function(err, result)
    {
        if(err) throw err;
        console.log(result);
        response.status(200).json(result);
    })
})



app.get("/", function(request, response)
{
    response.render("test");
});