const express = require("express");
const app = express();

//Dependências
app.set('view engine','ejs');
app.use(express.static('public'));

//Rotas
app.get("/",(req,res)=>{    
    res.render("index");
});

app.get("/perguntar",(req,res)=>{    
    res.render("perguntar");
});


//Executando serve
app.listen(8080,()=>{
    console.log("App rodando!");
});