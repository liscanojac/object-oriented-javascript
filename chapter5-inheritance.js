"use strict";

// when looping in an Object with a for in Douglas Crockford [developer of JS and JSON inventor]  recommends looping it like so:

const emptyObject = {};

for (let property in emptyObject) {
  console.log(property)
}

for (let prototypeProperty in emptyObject.prototype) {
  console.log(prototypeProperty)
}

for (let property in emptyObject) { // because remember the in gets the prototype props
  if (emptyObject.hasOwnProperty(property)) {
    console.log(property);
  }
}

// Basic inheritance examples from head first JS 

// function constructor 

function Dog(name, breed, weight) {
  this.name = name;
  this.breed = breed;
  this.weight = weight;
}

Dog.prototype.species = "Canine";

Dog.prototype.bark = function() {
  if (this.weight > 25) {
    console.log(`${this.name} says Woof!`)
  } else {
    console.log(`${this.name} says Yip!`)
  }
}

Dog.prototype.run = function() {
  console.log('Run!');
}

Dog.prototype.wag = function() {
  console.log('Wag!');
}

const fido = new Dog("Fido", "Mixed", 38)

class DogByClass {
  constructor(name, breed, weight) {
    this.name = name;
    this.breed = breed;
    this.weight = weight;
  }
  notPrototypeProp = 'this is not a prototype prop'
  // this is how you define prototype properties inside the class constructor although you would be abusing of the static class although is created in every access of the property
  // static {
  //   this.prototype.species = 'Canine'
  // }
  bark() {
    if (this.weight > 25) {
      console.log(`${this.name} says Woof!`);
    } else {
      console.log(`${this.name} says Yip!`);
    }
  };
  run() {
    console.log('Run!');
  };
  wag() {
    console.log('Wag!');
  }
}

// although is better practice to define the prototype props this way
DogByClass.prototype.species = 'Canine'

const fluffy = new DogByClass("fluffy", "Poodle", 30);

function hasPrototypeProperty(obj, prop) {

  const isPrototypeProperty = prop in obj && !obj.hasOwnProperty(prop)

  if (isPrototypeProperty) {
    console.log(`${prop} is a prototype property`)
  } else {
    console.log(`${prop} is not a prototype property`)
  }
  return prop in obj && !obj.hasOwnProperty(prop);
}

hasPrototypeProperty(fluffy, 'bark')
hasPrototypeProperty(fluffy, 'species')
hasPrototypeProperty(fluffy, 'notPrototypeProp')

console.log(fido.species)
console.log(fluffy.species)
console.log(fluffy.notPrototypeProp)

fido.bark()
fluffy.bark()

// Chaining prototypes

function ShowDog(name, breed, weight, handler) {
  Dog.call(this, name, breed, weight)
  this.handler = handler
}

// and to chain the prototype is like 
ShowDog.prototype = new Dog()
ShowDog.prototype.league = "Webville";
ShowDog.prototype.stack = function() {
  console.log("Stack");
};

const scotty = new ShowDog("Scotty", "Scottish Terrier", 15, "Cookie");

scotty.bark()
// as you can see it inherited all the prototype functions and props from Dog
console.log(scotty.species)
//  also has its own prototype methods
scotty.stack()

if (scotty instanceof ShowDog) {
  console.log("Scotty is a ShowDog");
}
// here you can see that the constructor is still Dog and not ShowDog
console.log("Scotty constructor is " + scotty.constructor);

// here we are setting the constructor properly
ShowDog.prototype.constructor = ShowDog
console.log("Scotty constructor is " + scotty.constructor);

class ShowDogByClass extends DogByClass {
  constructor(name, breed, weight, handler) {
    super(name, breed, weight)
    this.handler = handler;
  }
  stack() {
    console.log("Stack")
  }
}

const paul = new ShowDogByClass("Paul", "Golden Retriever", 16, "Mandy");

if (paul instanceof ShowDogByClass) {
  console.log('Paul is a ShowDogByClass')
}

console.log("Paul constructor is " + paul.constructor);

paul.bark()
paul.stack()

console.log(paul.species)

// now back to the book

// by constructor

function Rectangle(lenght, width) {
  this.lenght = lenght;
  this.width = width;
}

Rectangle.prototype.getArea = function() {
  return this.lenght * this.width;
}

Rectangle.prototype.toString = function() {
  return `[Rectangle ${this.lenght} x ${this.width}]`;
}

// now lets make a Square that inherits from Rectangle

function Square(size) {
  Rectangle.call(this, size, size);
}

// this is the same as above
// function Square(size) {
//   this.lenght = size;
//   this.width = size;
// }


Square.prototype = new Rectangle();
Square.prototype.constructor = Square;

Square.prototype.toString = function() {
  // the usual way to go
  // return `[Square ${this.lenght} x ${this.width}]`;

  // or you can take advantge of the Rectangle method and just replace Rectangle for Square
  var text = Rectangle.prototype.toString.call(this)
  return text.replace("Rectangle", "Square")
}

const rectangle1 = new Rectangle(5, 10);
const square1 = new Square(6);

console.log(rectangle1.getArea());
console.log(square1.getArea());
console.log(rectangle1.toString());
console.log(square1.toString());

console.log(rectangle1 instanceof Rectangle); //true
console.log(rectangle1 instanceof Object); // true

console.log(square1 instanceof Square); //true
console.log(square1 instanceof Rectangle); //true
console.log(square1 instanceof Object); //true

// now the same by class

class RectangleClass {
  constructor(lenght, width) {
    this.lenght = lenght;
    this.width = width
  }
  getArea() {
    return this.lenght * this.width;
  };
  toString() {
    return `[Rectangle ${this.lenght} x ${this.width}]`;
  }
}

class SquareClass extends RectangleClass {
  constructor(size) {
    super(size, size);
  }
  toString() {
    // the usual way
    // return `[Square ${this.lenght} x ${this.width}]`;

    // or if you want to take advantage of the prototype Rectangle method;
    
    const text = Rectangle.prototype.toString.call(this)
    return text.replace("Rectangle", "Square")
  };
}

const rectangle2 = new RectangleClass(5, 10);
const square2 = new SquareClass(6);

console.log(rectangle2.getArea());
console.log(square2.getArea());
console.log(rectangle2.toString());
console.log(square2.toString());

console.log(rectangle2 instanceof RectangleClass); //true
console.log(rectangle2 instanceof Object); // true

console.log(square2 instanceof SquareClass); //true
console.log(square2 instanceof RectangleClass); //true
console.log(square2 instanceof Object); //true