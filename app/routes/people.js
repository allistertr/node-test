module.exports = function (app) {
  var api = app.api.people;

  app.route('/people')
    .get(api.getPeopleWithAddress);

  app.route('/people/:amountPerStep/:numberOfAttempts')
    .get(api.getPeopleWithAddress);
};