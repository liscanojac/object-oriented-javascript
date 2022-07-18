"use strict";
// THE IN OPERATOR 

const person = {
  name: "Greg",
  age: 12,
  debt: 0
}

// detecting properties

// unreliable way
if (person.age) {
  console.log('this is unreliable because if the age is 0 or any falsy value it wouldnt enter the if')
}

// the IN OPERATOR just evaluates the property existence no matter if its equal to a falsy value

if ("debt" in person) {
  console.log('even executes with falsy values')
}

if(person.debt) {
  console.log('this if condition is not met')
}

// the IN OPERATOR vs hasOwnProperty
// the in operator check for own and prototype properties
// hasOwnProperty only check for own object properties

console.log("toString" in person) //true --it even gets prototype methods
console.log(person.hasOwnProperty("toString")) //false --only evaluates own properties

// FOR IN LOOP

const obj = {
  name: "Object",
  id: "test-id",
  quantity: 2
}

for (let property in obj) {
  console.log(`propName: ${property}`) //how to access the propNames in for in loops
  console.log(`propValue: ${obj[property]}`) //how to access the propValues in for in loops
}

// GET AND SET OBJECT PROPERTIES

const person1 = {
  _name: "Nick", //the leading underscore is a convention to indicate that the property is private, though in reality it is still public

  get name() {
    console.log("Reading name");
    return this._name;
  },

  set name(value) {
    console.log("Setting name to: ", value);
    this._name = value
  }
}

// ENUMERABLE AND CONFIGURABLE OBJECT PROPERTIES

const person2 = {
  name: "Greg",
  age: 34,
  id: 1234
}

Object.defineProperty(person2, "name", {
  enumerable: false
}) //this means the if you loop through this object in a for in loop the property wont show up
// person2.name = 'John' you can still redefine the prop
console.log('Person2 Name: ', person2.name) // you can still access it but not loop through it

console.log('Looping through person2')
for (let property in person2) {
  console.log(`propName: ${property}`)
  console.log(`propValue: ${person2[property]}`)
} // as you can see name prop doesnt show up

Object.defineProperty(person2, "id", {
  configurable: false
})
// delete person2.id // this delete doesnt work in strict mode
// person2.id = 'id changed' 
// although you can still edit the prop
console.log(person2.id)

// and once you have set the configurable property you cant set it back like this
// Object.defineProperty(person2, "id", {
//   configurable: true
// }) error cannot redifine property id

// FREEZING OBJECTS
// an object is frozen when you cant add or remove properties you cant change property types and you cant write to any data properties

const frozenObject = {
  name: "Elsa"
}

Object.freeze(frozenObject)

// frozenObject.name = "Anna"
// you cant rewrite properties

// frozenObject.movie = 'Frozen'
// you cant add properties

// delete frozenObject.name
// you cant delete propeties

// so in summary when youfreeze an object you only get an spashot with read-only properties