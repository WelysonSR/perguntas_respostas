const express = require("express");
const app = express();
const connection =require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

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

//Rotas Gat
app.get("/",(req,res)=>{ 
    Pergunta.findAll({raw: true, order:[
        ['id','DESC']
    ]}).then(perguntas => {
        res.render("index",{
            perguntas:perguntas
        });
    });    
});

app.get("/perguntar",(req,res)=>{    
    res.render("perguntar");
});

app.get("/pergunta/:id",(req,res)=>{    
    let id = req.params.id;
    Pergunta.findOne({
        where: {id:id}
    }).then(pergunta =>{
        if(pergunta != undefined){

            Resposta.findAll({
                where: {perguntaId: pergunta.id}
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });

        }else{
            res.redirect("/");
        }
    });
});

//Rotas POST
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

app.post("/responder",(req,res)=>{ 
    let corpo = req.body.corpo;
    let perguntaId = req.body.perguntaId;   
    Resposta.create({
        corpo:corpo,
        perguntaId:perguntaId
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaId);
    });
});

//Executando serve
app.listen(8080,()=>{
    console.log("App rodando!");
});