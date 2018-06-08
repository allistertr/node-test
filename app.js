const app = require('./config/express');
const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.send(`
    <h1>Servidor no ar</h1>
    <h2>Utilize a rota "/people" ou "/people/:amountPerStep/:numberOfAttempts" para testar o servidor</h2>
  `);
});

let server = app.listen(port, function () {
  console.log('Servidor Iniciado na porta: ' + port);
});
server.timeout = 0;