var express = require("express");
var app = express();
var cors = require("cors");
var fs = require("fs");

app.use(express.json());
app.use(cors({ 
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.static('public'));

let dataFile = 'db.json';

function lerArquivo() {
  if (!fs.existsSync(dataFile)) {
    return [];
  }
  try {
    let rawData = fs.readFileSync(dataFile);
    if (rawData.length === 0) {
      return [];
    }
    return JSON.parse(rawData);
  } catch (err) {
    console.error("Erro ao ler o arquivo:", err);
    return [];
  }
}

function salvarArquivo(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/listaCadastro", function(req, res) {
  const dados = lerArquivo()
  res.status(200).json(dados)
})

app.post("/cadastro", function(req, res) {
  console.log(req.body)
  const {Nome, Email, TelefoneCelular} = req.body;
  if(!Nome || !Email|| !TelefoneCelular) {
    res.status(400).json({ erro: "Preencha todos os campos" })
    return
  }

  let dados = lerArquivo()
  id = 1

  if (dados.length) {
    id = dados[dados.length - 1].id + 1
  }

  const novoCadastro = {
    id: id,
    Nome: Nome,
    Email: Email,
    TelefoneCelular: TelefoneCelular
  }

  dados.push(novoCadastro)
  salvarArquivo(dados)

  res.status(200).json({ sucesso: "Você foi cadastrado com sucesso" })
  return
})

app.listen(8000, function () {
  console.log("Rodando na porta 8000");
});