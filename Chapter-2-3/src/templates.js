// Section 3.4: Using a Template Engine

const express = require("express");
const app = express();
const axios = require('axios');

const PORT = 3000;

app.set("view engine", "jade");
app.set('view engine', 'ejs');
app.set('view engine', 'hbs');

// Função para gerar um ID aleatório de imagem (entre 1 e 70 do i.pravatar)
const gerarImagem = () => `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`;

// Função para buscar usuários da API
const fetchUsuarios = async (quantidade) => {
    try {
        const response = await axios.get(`https://randomuser.me/api/?results=${quantidade}&nat=br`); // Busca usuários brasileiros
        return response.data.results.map(user => ({
            nome: `${user.name.first} ${user.name.last}`,
            email: user.email,
            imagem: user.picture.medium
        }));
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return [];
    }
};


app.set("views", "src/views");


// Simulando dados de usuários com imagens aleatórias
const usuarios = [
    { nome: 'João Silva', email: 'joao@email.com' },
    { nome: 'Maria Oliveira', email: 'maria@email.com' },
    { nome: 'Carlos Santos', email: 'carlos@email.com' },
    { nome: 'Ana Souza', email: 'ana@email.com' }
];



//Create a Root Route
app.get("/", function (req, res) {
  res.render("index"); //renders the index.jade file into html and returns as a response. The
  // render function optionally takes the data to pass to the view.
});

app.get("/home", function(req,res) {
    res.render("home", {titulo: "Minha Pagina com EJS"})
})

// Rota para exibir usuários
app.get('/usuarios', async (req, res) => {
    const usuarios = await fetchUsuarios(4); // Obtém 4 usuários da API
    res.render('usuarios', { titulo: 'Lista de Usuários', usuarios });
});


//Starts the express server with a callback
app.listen(PORT, function (err) {
  if (!err) {
    console.log("Server is Running at PORT", PORT);
  } else {
    console.log(JSON.stringify(err));
  }
});
