let Person = require('../models/Person');
module.exports = function (app) {
  let api = {};

  function _personTest(res) {
    person = new Person({id:'João', name:'João Carlos', address: 'Rua Dr. Flores, 47 CEP 92188-108'});
    res.json(person);
  }

  api.getPeople = function (req, res) {
    _personTest(res);
  };

  return api;
};