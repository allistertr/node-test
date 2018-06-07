const app = require('./config/express');
const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  console.log("Rota raiz acessada");
  res.send('<h1>Primeira Página</h1>');
});

app.listen(port, function () {
  console.log('Servidor Iniciado na porta: ' + port);
});