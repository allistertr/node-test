class Person {
  constructor(person = {}) {
    this.id = person.id || ''
    this.name = person.name || '';
    this.address = person.address || '';
  }

  setAddress(address = '') {
    this.address = address;
  }

  toJSON() {
    return { ...this };
  }
}

module.exports = Person;