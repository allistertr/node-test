module.exports = function (app) {
  var api = app.api.people;

  app.route('/people')
    .get(api.getPeopleWithAddress);
};