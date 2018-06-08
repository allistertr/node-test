const fetch = require('node-fetch');
const Person = require('../models/Person');

module.exports = function (app) {
  let api = {};
  let peopleUrl = app.get('peopleUrl');

  function _getPeople(giveBack) {
    return new Promise((resolve, reject) => {
      fetch(`${peopleUrl}/people`)
        .then(res => {
          res.json().then(json => {
            if (res.status == 200) {
              resolve(json);
            } else {
              reject(json);
            }
          }).catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  function _findAddressRecursive(person, numberOfAttempts = 10) {
    return new Promise((resolve, reject) => {
      if (numberOfAttempts) {
        numberOfAttempts--;
        fetch(`${peopleUrl}/people/${person.id}/address`)
          .then(res => {
            res.json().then(json => {
              if (res.status == 200 && json.hasOwnProperty('address')) {
                person.fillAddress(json);
                resolve(json);
              } else {
                _findAddressRecursive(person, numberOfAttempts)
                  .then(json => resolve(json))
                  .catch(err => reject(err));
              }
            }).catch(err => {
              _findAddressRecursive(person, numberOfAttempts)
                .then(json => resolve(json))
                .catch(err => reject(err));
            });
          })
          .catch(err => {
            _findAddressRecursive(person, numberOfAttempts)
              .then(json => resolve(json))
              .catch(err => reject(err));
          });
      } else {
        reject({ msg: 'O número máximo de tentativas individuais de busca, foi excedido.' });
      }
    });
  }

  function _fillGroupAddress(peopleStepArray, numberOfAttempts) {
    return Promise.all(peopleStepArray.map(person => _findAddressRecursive(person, numberOfAttempts)));
  }

  async function _fillAddressStepByStep(peopleArray, amountPerStep = 100, numberOfAttempts=10, giveBack) {
    try {
      let lot = 0;
      for (let i = 0; i < peopleArray.length; i += amountPerStep) {
        lot++;
        peopleStepArray = peopleArray.slice(i, i + amountPerStep);
        let success = await _fillGroupAddress(peopleStepArray, numberOfAttempts)
        console.log(`Concluído o conjunto: ${lot} (${i + amountPerStep} de ${peopleArray.length} endereços encontrados)`);
      }
      console.log('Retornando pessoas com endereços: ', peopleArray);
      giveBack(200, peopleArray);
    } catch (err) {
      console.log('Ocorreu uma falha ao buscar os endereços', err);
      giveBack(202, { msg: 'Ocorreu uma falha ao buscar os endereços', err: err });
    }
  }

  api.getPeopleWithAddress = function (req, res) {
    let amountPerStep = req.params.amountPerStep || 1000;
    let numberOfAttempts = req.params.numberOfAttempts || 20;
    amountPerStep = Number(amountPerStep);
    numberOfAttempts = Number(numberOfAttempts);
    let giveBack = (status, json) => {
      if (status && json) {
        res.status(status).json(json);
      } else if (status) {
        res.status(status);
      } else if (json) {
        res.json(json);
      }
    };
    console.log('Obtendo lista de pessoas');
    _getPeople(giveBack)
      .then(json => {
        console.log(`Buscando endereços (Quantidade de consultas por etapa: ${amountPerStep} - Quantidade máxima de tentativas individuais: ${numberOfAttempts})`);
        let peopleArray = json.map(person => new Person(person));
        _fillAddressStepByStep(peopleArray, amountPerStep, numberOfAttempts, giveBack);
      })
      .catch(err => {
        console.log('Ocorreu uma falha ao buscar a lista de Pessoas', err);
        giveBack(202, { msg: 'Ocorreu uma falha ao buscar a lista de Pessoas' });
      });;
  };

  return api;
};