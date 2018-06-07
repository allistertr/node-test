class Person {
  constructor(person = {}) {
    this.id = person.id || ''
    this.name = person.name || '';
    this.address = person.address || '';
  }

  fillAddress(addressObject = {}) {
    this.address = addressObject.address || '';
    return this;
  }

  toJSON() {
    return { ...this };
  }
}

module.exports = Person;