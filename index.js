const express = require("express");
const app = express();
const connection =require("./database/database");
const Pergunta = require("./database/Pergunta");

//Verificando conexão com BD

connection
    .authenticate()
    .then(()=>{
        console.log("Conexão realizada com sucesso!");
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })

//Dependências
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Rotas
app.get("/",(req,res)=>{ 
    Pergunta.findAll({raw: true}).then(perguntas => {
        res.render("index",{
            perguntas:perguntas
        });
    });    
});

app.get("/perguntar",(req,res)=>{    
    res.render("perguntar");
});

app.post("/salvarpergunta",(req,res)=>{ 
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;   
    Pergunta.create({
        titulo:titulo,
        descricao:descricao
    }).then(()=>{
        res.redirect("/");
    });
});

//Executando serve
app.listen(8080,()=>{
    console.log("App rodando!");
});