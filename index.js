const express = require("express");
const app = express();

//Dependências
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Rotas
app.get("/",(req,res)=>{    
    res.render("index");
});

app.get("/perguntar",(req,res)=>{    
    res.render("perguntar");
});

app.post("/salvarpergunta",(req,res)=>{ 
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;   
    res.send("Formulario recebido! " + titulo + " " + descricao);
    console.log('f');
});

//Executando serve
app.listen(8080,()=>{
    console.log("App rodando!");
});