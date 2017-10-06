"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('.'));

app.get('/api/cadcliente', (req, res) => {
  res.status(200).send('Aplicação executando');
});

function getClient(){
  return new pg.Client({
    host: 'localhost',
    port: 5432,
    database: 'Cliente',
    user: 'postgres',
    password: 'lucas',
  });
}

app.post('/api/cadcliente', (req, res) => {
  let nome = req.body.nome;
  let cpf = req.body.cpf;
  let endereco = req.body.endereco;
  const client = getClient();
  client.connect();
  client.query("INSERT INTO client(nome, cpf, endereco) VALUES ($1, $2, $3)",
  [nome, cpf, endereco], (err, item) => {
    if(err){
      res.json(err);
      return next(err);
    }else{
      res.redirect("http://localhost:4200/");
    }
    client.end();
  });
});

app.listen(3000, function () {
  console.log('Servidor iniciado.');
});
