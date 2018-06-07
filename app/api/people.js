const fetch = require('node-fetch');
const Person = require('../models/Person');

module.exports = function (app) {
  let api = {};
  let peopleUrl = app.get('peopleUrl');

  function _personTest(callback) {
    person = new Person({ id: 'João', name: 'João Carlos', address: 'Rua Dr. Flores, 47 CEP 92188-108' });
    callback(200, person);
  }

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

  // function _fillAddressAndGiveBack(peopleArray, giveBack) {
  //   Promise.all(peopleArray.map(person => fetch(`${peopleUrl}/people/${person.id}/address`)))
  //     .then(results => {
  //       console.log('Obteve todos os endereços')
  //       giveBack(200, results)
  //     })
  //     .catch(err => {
  //       giveBack(202, { msg: 'Ocorreu uma falha ao buscar os endereços' })
  //     })
  // }

  function _findAddressRecursive(peopleArray, index = 0) {
    return new Promise((resolve, reject) => {
      let person = peopleArray[index];
      index++;
      if (person) {
        console.log('Buscando endereço pessoa n: ' + index);
        console.log(person);
        fetch(`${peopleUrl}/people/${person.id}/address`)
          .then(res => {
            res.json().then(json => {
              if (res.status == 200) {
                person.fillAddress(json);
                // setTimeout(() => {
                  _findAddressRecursive(peopleArray, index)
                    .then(result => resolve(result))
                    .catch(err => reject(err));
                // }, 5000);
              } else {
                reject(json);
              }
            }).catch(err => reject(err));
          })
          .catch(err => reject(err));
      } else {
        resolve('Finalized');
      }
    });
  }


  api.getPeopleWithAddress = function (req, res) {
    console.log(new Date().toISOString())
    let giveBack = (status, json) => {
      if (status && json) {
        res.status(status).json(json);
      } else if (status) {
        res.status(status);
      } else if (json) {
        res.json(json);
      }
    };
    _getPeople(giveBack)
      .then(json => {
        let peopleArray = json.map(person => new Person(person));
        console.log(peopleArray.length)
        console.log(new Date().toISOString())
        _findAddressRecursive(peopleArray)
          .then(result => {
            console.log('Resultados obtidos com sucesso', result);
            giveBack(200, peopleArray);
          })
          .catch(err => {
            console.log('Ocorreu uma falha ao buscar os endereços', err);
            giveBack(202, { msg: 'Ocorreu uma falha ao buscar os endereços' });
          })
      })
      .catch(err => {
        console.log('Ocorreu uma falha ao buscar a lista de Pessoas', err);
        giveBack(202, { msg: 'Ocorreu uma falha ao buscar a lista de Pessoas' });
      });;
  };

  return api;
};