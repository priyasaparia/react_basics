function person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = this.firstName + " " + this.lastName;
  this.sayHello = function () {
    console.log(`Hello , My self ${this.firstName}`);
  };
}

person.prototype.fullGreating = function () {
  console.log(`Hello , My full name is  ${this.fullName}`);
};

const person1 = new person("Nishant", "Patil");
person1.sayHello();
person1.fullGreating();
