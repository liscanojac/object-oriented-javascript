"use strict";

// CONSTRUCTORS

// by convention all constructor names are capitalized 

function Person(name) {
  this.name = name;
  this.sayName = function() {
    console.log(this.name);
  }
};

// how to achieve the same with a class constructor?

class ClassPerson {
  constructor(name) {
    this.name = name;
    this.sayName = function() {
      console.log(this.name)
    }
  }
}

const person1 = new Person('John')
const person2 = new Person('Greg')

const classPerson1 = new ClassPerson('Jack')
const classPerson2 = new ClassPerson('Joe')

person1.sayName()
person2.sayName()
classPerson1.sayName()
classPerson2.sayName()

// you can still add properties like:
// person1.age = 34
// console.log(person1.age)

function AdvancedPerson(name) {

  Object.defineProperty(this, "name", {
    get: function() {
      return name;
    },
    set: function(newName) {
      name = newName;
    },
    enumerable: true,
    configurable: true
  });

  this.sayName = function() {
    console.log(this.name)
  };
}

const person5 = new AdvancedPerson('Michael');

person5.sayName()
// person5.name = 'Molly' the name is editable
// console.log(person5.name) and the name is accesible

// PROTOTYPES

// how to identify if a property is a prototype property

function hasPrototypeProperty(obj, prop) {

  return prop in obj && !obj.hasOwnProperty(prop);
}

// Using prototypes with constructors

class ClassPerson2 {
  constructor(name) {
    this.name = name;
  }
  // all methods on a class constructors are prototype methods
  sayName() {
    console.log(this.name);
  }
}
// here you can see the differences between the two approaches constrcutor function and class
function Person2(name) {
  this.name = name;
}

Person2.prototype.sayName = function() {
  console.log(this.name);
}

const person6 = new ClassPerson2('Jade');

console.log(hasPrototypeProperty(person6, 'sayName')) // true

const person7 = new Person2('Johanna');

console.log(hasPrototypeProperty(person7, 'sayName')) // true

// you can also set others types of data in the prototypes not only methods
// functional approach
function Person3(name) {
  this.name = name;
}

Person3.prototype.sayName = function() {
  console.log(this.name);
}

Person3.prototype.favorites = []

// WARNING you can use class constructor and not prototype the method
class ClassPerson3 {
  constructor(name) {
    this.name = name;
  };
  // if you set your methods like function expressions they wont be part of the prototype, same happens with arrow functions like below 
  sayName = function() {
    console.log(this.name)
  }
  // sayName = () => {
  //   console.log(this.name)
  // }
};

const person8 = new ClassPerson3('Erick');

person8.sayName()

console.log(hasPrototypeProperty(person8, 'sayName')) // false

// you can also set others types of data in the prototypes not only methods
// class approach
class ClassPerson4 {
  constructor(name) {
    this.name = name;
  }
  // all methods on a class constructors are prototype methods
  sayName() {
    console.log(this.name);
  }
}

ClassPerson4.prototype.favorites = []

const person9 = new Person3('Charles');
// here you can see that Person3 constructor has sayName method and favorites properties as prototype props
console.log(hasPrototypeProperty(person9, 'sayName') && hasPrototypeProperty(person9, 'favorites'))

// although if you redeclare the prototype prop it doesnt stay as a prototype, it doesnt matter what type the prop you use, once its redeclared its no longer a prototype of this object
person9.favorites = [23]
// person9.favorites = 23
// person9.favorites = '23'
// person9.favorites = false
// person9.favorites = {}
// as you can see, with all the variable types it gets the prop no longer a prototype

console.log(hasPrototypeProperty(person9, 'favorites'))


// but applying array properties to the favorites prototype keeps it as a prototype

const person10 = new Person3('Orlando')

console.log(hasPrototypeProperty(person10, 'sayName') && hasPrototypeProperty(person10, 'favorites'))

// mutating the array keeps the property as a prototype
person10.favorites.push(10)

console.log(hasPrototypeProperty(person10, 'favorites'))

// the constructor approac oh ClassPerson4
function Person4(name) {
  this.name = name;
}

Person4.prototype.sayName = function() {
  console.log(this.name);
}

Person4.prototype.favorites = []

// so if we construct two diffrerent persons

const person11 = new Person4('Chip');
const person12 = new Person4('Dale');

person11.favorites.push('pizza');
person12.favorites.push('calzone');

console.log(person11.favorites); // ['pizza', 'calzone']
console.log(person12.favorites); // ['pizza', 'calzone']

// so as you can see both person mutate the same favorites array (because its a prototype array) that's why you have to be very careful to set prototype properties 

// Adding multiple properties with the object literal

function Person5(name) {
  this.name = name;
};

// Person5.prototype = {
//   sayName: function() {
//     console.log(this.name);
//   },
//   toString: function() {
//     return `[Person5 ${this.name}]`;
//   }
// };
// same thing happens if you do it this way
Person5.prototype = {
  sayName() {
    console.log(this.name);
  },
  toString() {
    return `[Person5 ${this.name}]`;
  }
};

const person13 = new Person5('Jack')

person13.sayName()
console.log(person13.toString())

// so far everyhting's great although here is the deal:

console.log(person13 instanceof Person5) // true
console.log(person13.constructor === Person5) // false
console.log(person13.constructor === Object) // true

// So what's the problem with the constructor equal to Object? well that any new generic Object you would construct, you would not be able to tell its constructor correctly 

let genericPerson1 = new Object();

genericPerson1.name = 'generic-name';

console.log(genericPerson1 instanceof Object); // true 
console.log(genericPerson1.constructor === Object); // true 

// here you can see that in the constructor its gives you Object like in Person5

// HOW TO REMEDY THIS?

function Person6(name) {
  this.name = name;
};

// Person6.prototype = {
//   constructor: Person6,
//   sayName: function() {
//     console.log(this.name);
//   },
//   toString: function() {
//     return `[Person6 ${this.name}]`;
//   }
// };
// same thing happens if you do it this way, both approaches are valid
Person6.prototype = {
  constructor: Person6,
  sayName() {
    console.log(this.name);
  },
  toString() {
    return `[Person6 ${this.name}]`;
  }
};

const person14 = new Person6('David')

person14.sayName()
console.log(person14.toString())

console.log(person14 instanceof Person6) // true
console.log(person14.constructor === Person6) // true
console.log(person14.constructor === Object) // false

// here you can see that the constructor property is pointing correctly
// its a good practice when you make function constructors to include the constructor in the prototype or just use class constructors like this

class ClassPerson5 {
  constructor(name) {
    this.name = name
  };
  sayName() {
    console.log(this.name)
  };
  toString() {
    return `[Person6 ${this.name}]`;
  }
}

const classMadePerson1 = new ClassPerson5('Roger');

classMadePerson1.sayName()
console.log(classMadePerson1.toString())

console.log(classMadePerson1 instanceof ClassPerson5) // true
console.log(classMadePerson1.constructor === ClassPerson5) // true
console.log(classMadePerson1.constructor === Object) // false

// here you can see with a class constructor we achieve the same results with way less code and having the methods already part of the class prototype

// and class constructors even if you dont add any prototype methods at the beggining, they keep the references properly

class ClassPerson6 {
  constructor(name) {
    this.name = name
  }
}

const classMadePerson2 = new ClassPerson6('Marco')

console.log("sayHi" in ClassPerson6) //false

// althought we can add say hi

// ADDING A NEW PROTOTYPE METHOD

ClassPerson6.prototype.sayHi = function() {
  console.log("Hi");
}

classMadePerson2.sayHi()

// and because is a class constructor it keeps its references properly
console.log(classMadePerson2 instanceof ClassPerson6) // true
console.log(classMadePerson2.constructor === ClassPerson6) // true
console.log(classMadePerson2.constructor === Object) // false

// FROZEN OBEJCTS CAN STILL GET MORE PROTOTYPES PROPS AND METHODS

const classMadePerson3 = new ClassPerson6('Polo')

// this classMadePerson3 has the say Hi method as you can see

classMadePerson3.sayHi() // Hi

// now I freeze the object
Object.freeze(classMadePerson3);

// I can still add prototype methods
ClassPerson6.prototype.sayBye = function() {
  console.log("Bye");
};

classMadePerson3.sayBye() // Bye
// as you can see althought the classMadePerson3 Object is frozen, I can still add prototype methods without any issue
