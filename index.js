// Importando express
const express = require("express");
const app = express();
// Importando express session
const session = require("express-session");
// Importando express flash
const flash = require("express-flash");
// Importando body-parser
const bodyParser = require("body-parser");

// Setando view engine
app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Configuração express session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// Configuração express flash
app.use(flash());

// Rota principal
app.get("/", (req, res) => {
    res.render("index");
});

// Rota de captura dados do form com validação de campos
app.post("/form", (req, res) => {
    var { email, nome, pontos } = req.body;

    var emailError;
    var nomeError;
    var pontosError;

    if (email == undefined || email == "") {
        emailError = "O e-mail não pode ser vazio!";
    }

    if (pontos == undefined || pontos < 20) {
        pontosError = "Você não pode ter menos de 20 pontos!";
    }

    if (nome == undefined || nome == "") {
        nomeError = "Nome não pode ser vazio!";
    }

    if (emailError != undefined || nomeError != undefined || pontosError != undefined) {
        res.redirect("/");
    } else {
        res.send("Form ok!");
    }

});

// Rodando servidor na porta 3000
app.listen(3000, (req, res) => {
    console.log("Servidor rodando!");
});