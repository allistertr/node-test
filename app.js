let app = require('./config/express');
let port = process.env.PORT || 3000;

app.set('people-url','https://kbase-core-test.herokuapp.com');

app.get('/', function (req, res) {
  console.log("Rota raiz acessada");
  res.send('<h1>Primeira Página</h1>');
});

app.listen(port, function () {
  console.log('Servidor Iniciado na porta: ' + port);
});