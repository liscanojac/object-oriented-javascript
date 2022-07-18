"use strict";

// the module pattern 
// this is a way to create objects where some data is inaccesible having private and public methods and properties
// its based on having an IIFE (immediate invoked function expression)
// remenber even on the module pattern to follow the conventions that private props or methods to be named an underscore like this._name

const yourObject = (function() {
  // private data and variables
  return {
    // public methods and properties
  }
}());

// Example

const person = (function() {

  let _age = 25;

  return {
    name: "Michael",
    getAge: function() {
      return _age;
    },
    growOlder: function() {
      _age++;
    }
  }
}())

// this is the same stuff as above
const person2 = (function() {

  let _age = 33;

  function getAge() {
    return _age;
  };

  function growOlder() {
    _age++
  }

  return {
    name: "Kevin",
    getAge,
    growOlder
  }
}())

console.log(person.name);
console.log(person.getAge());

person._age = 100;
// as you can see here it's impossible to edit the age prop
console.log(person.getAge());

person.growOlder()
console.log(person.getAge());

person.job = "test"
// as you can see you can add props or edit the current ones but you cant touch _age prop
person.name = "Michael Scott"
console.log(person.job)
console.log(person.name)


// here you can see that we got the same result
console.log(person2.name);
console.log(person2.getAge());
person2.growOlder();
console.log(person2.getAge());


// private Members for constructors

// function constructor

function Person(name) {
  let _age = 27;
  this.name = name;

  // you have to work with own methods prototype ones wouldnt work for private props
  this.getAge = function() {
    return _age;
  }
  this.growOlder = function() {
    _age++;
  };
}


const person3 = new Person("Oscar");

console.log(person3.getAge()); //27
person3._age = 200;

console.log(person3.getAge()); // 27
// as you can see it doesnt change

person3.growOlder();
console.log(person3.getAge()); // 28

// class constructor

class PersonClass {
  constructor(name) {
    let _age = 29;
    this.name = name;
    // local methods can acces the private prop
    this.getAge = function() {
      return _age;
    };
    this.growOlder = function() {
      _age++;
    }
  }
  // it doesnt work with prototypes sweetie you have to make own methods
  // getAge() {
  //   return _age;
  // }
}

const person4 = new PersonClass("Creed");

console.log(person4.getAge()); // 29
person4._age = 250;

console.log(person4.getAge()); // 29

person4.growOlder();
console.log(person4.getAge()); // 30


// So, how to access private properties with prototype methods?

const Person2 = (function() {
  let _age = 34;

  function InnerPerson(name) {
    this.name = name;
  };
  InnerPerson.prototype.getAge = function() {
    return _age;
  };
  InnerPerson.prototype.growOlder = function() {
    _age++;
  };
  return InnerPerson;
}());

// here is getting all the prototype methods in InnerPerson
const person5 = new Person2("Dwight");

console.log(person5.getAge()); //34

person5.growOlder();
console.log(person5.getAge()); //35

// and all the new persons created from Person2 will get the same prop and prototype methods

const person6 = new Person2("Jim");
console.log(person6.getAge()); // 36 it gets the same shared age


const PersonClass2 = (function() {
  let _age = 31;

  class InnerPersonClass {
    constructor(name) {
      this.name = name;
    };
    getAge() {
      return _age;
    };
    growOlder() {
      _age++;
    }
  };

  return InnerPersonClass;
}())

const person7 = new PersonClass2("Pam");
const person8 = new PersonClass2("Karen");

console.log(person7.getAge());
person7.growOlder()
console.log(person7.getAge());

console.log(person8.getAge()); // 32 same shared age

function hasPrototypeProperty(obj, prop) {

  console.log(prop in obj && !obj.hasOwnProperty(prop));
}

// and as you can see the class contructor gets all thye methods as prototypes
hasPrototypeProperty(person7, 'getAge')
hasPrototypeProperty(person7, 'growOlder')
hasPrototypeProperty(person8, 'getAge')
hasPrototypeProperty(person8, 'growOlder')


// Scope-Safe constructors or how to avoid not missing the new keyword when using a constructor

// function constructor

function Book(name, author) {
  if (!(this instanceof Book)) {
    return new Book(name, author);
  }
  this.name = name;
  this.author = author;
}

const book1 = Book('100DaysOfSolitude', 'GabrielGarciaMarquez');

console.log(book1 instanceof Book); //true
console.log(typeof book1); //object
console.log(book1.name); // 100DaysOfSolitude

// with class constructor is not possible 
class BookClass {
  constructor(name, author) {
    if (!(this instanceof Book)) {
      return new Book(name, author);
    }
    this.name = name;
    this.author = author;
  }
}

// const book2 = BookClass('CasasMuertas', 'RomuloGallegos'); this throws an error

