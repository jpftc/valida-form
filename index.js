// Importando express
const express = require("express");
const app = express();
// Importando express session
const session = require("express-session");
// Importando express flash
const flash = require("express-flash");
// Importando body-parser
const bodyParser = require("body-parser");
// Importando cookie parser, manda informações para o front end
const cookieParser = require("cookie-parser");


// Setando view engine
app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Ativando cookie Parser passando qualquer coisa como "senha"
app.use(cookieParser("kdjasbdjkhabskjdb"))

// Configuração express session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

// Configuração express flash
app.use(flash());

// Rota principal
app.get("/", (req, res) => {
    // Acessando flash sessions da outra rota
    var emailError = req.flash("emailError");
    var nomeError = req.flash("nomeError");
    var pontosError = req.flash("pontosError");
    var email = req.flash("email");

    // Operação ternária, substitui if
    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
    nomeError = (nomeError == undefined || nomeError.length == 0) ? undefined : nomeError;
    pontosError = (pontosError == undefined || pontosError.length == 0) ? undefined : pontosError;
    email = (email == undefined || email.length == 0) ? "" : email;

    // Renderizando pagina passando as variaveis
    res.render("index", { emailError, nomeError, pontosError, email });
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
        // Flash sessions, passar informações de uma rota para outra,  as sessões duram apenas uma requisição
        req.flash("emailError", emailError);
        req.flash("nomeError", nomeError);
        req.flash("pontosError", pontosError);

        req.flash("email", email);

        res.redirect("/");
    } else {
        res.send("Form ok!");
    }

});

// Rodando servidor na porta 3000
app.listen(3000, (req, res) => {
    console.log("Servidor rodando!");
});