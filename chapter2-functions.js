// this is how hoisting works in function declarations event though the function is defined afterwards 
var result = add(5, 5);
console.log('result:', result)

function add(num1, num2) {
return num1 + num2;
}

// because function is a function expression it doesnt have hoisting so this expression will return an error
// let resultSecond = addSecond(2, 3)
// console.log('resultSecond:', resultSecond)

var addSecond = function(a, b) {
  return a + b
}


// Using the ARGUMENTS KEYWORD inside a funtion

function numberOfArguments() {
  return arguments.length
}

console.log(numberOfArguments('Hi', 1))
// as you can see this function returns the number of arguments passes due to the ARGUMENTS KEYWORD  

// Applying the ARGUMENTS KEYWORD to a sum function

function sum() {
  
  let result = 0

  for (let i = 0; i < arguments.length; i++) {
    result += arguments[i] 
  }

  return result
}
// And here you can see the result of all those values summed
console.log(sum(5, 3, 2))

// FUNCTION OVERLOADING
// is like having a default output even if there aren't any arguments in the function

function sayMessage(message = "Default Message") {
  
  console.log(message)
}

sayMessage("Hello!")
sayMessage()

// OBJECT METHODS
// when you create object methods you have to avoid arrow functions to use the THIS KEYWORD, otherwise you have to bind the method

const person = {
  name: "Nicholas",
  sayName: function() { console.log(this.name)}
}

person.sayName() //Nicholas

const person2 = {
  name: "Tatiana",
  sayName: () => console.log(this.name)
}

person2.sayName.call(person2) //undefined
console.log('test')
// when using the this KEYWORD you have to use function expression because arrow functions override the this KEYWORD and lose context of the object 

// You can also use the same method for many objects like:

function sayRoyalNames() {
  console.log(this.name)
}

const tzar = {
  name: "Nicholas",
  sayName: sayRoyalNames
}
const tzarDaughter = {
  name: "Olga",
  sayName: sayRoyalNames
}
const secondTzarDaughter = {
  name: "Tatiana",
  sayName: sayRoyalNames
}
const thirdTzarDaughter = {
  name: "Maria",
  sayName: sayRoyalNames
}

tzar.sayName()
tzarDaughter.sayName()
secondTzarDaughter.sayName()
thirdTzarDaughter.sayName()
// as you can see you are using the same function in all the objects as methods


// THE CALL METHOD

function sayBeatlesNames(label) {
  console.log(`${label}: ${this.name}`)
}

const JohnLennon = {
  name: "JohnLennon"
}

const PaulMcCartney = {
  name: "Paul McCartney"
}

let name = "George Harrison"
// var name = "George Harrison"
// const name = "George Harrison" 
// in global variables to reference the this you can use let or var but no const
// const will return undefined in the call with (this, "global")
// varv works just as fine as let

sayBeatlesNames.call(this, "global")
sayBeatlesNames.call(JohnLennon, "JohnLennon")
sayBeatlesNames.call(PaulMcCartney, "PaulMcCartney")

// THE APPLY METHOD

function sayRollingStonesNames(label) {
  console.log(`${label}: ${this.name}`)
}
// as you can see this function is exactly the same as sayBeatlesNames

const MickJagger = {
  name: "Mick Jagger"
}

const KeithRichards = {
  name: "Keith Richards"
}

sayRollingStonesNames.apply(this, ["global"])
// here it says a beatle beause in the global environment the name variable is a beatle name

sayRollingStonesNames.apply(MickJagger, ["Mick Jagger"])
sayRollingStonesNames.apply(KeithRichards, ["Keith Richards"])
// here it works properly because the apply is done to RollingStone members 
// as you can see the apply differs from the call because the arguments are passed in an array

// THE BIND METHOD

function sayMetallicaNames(label) {
  console.log(`${label}: ${this.name}`)
}

const JamesHetfield = {
  name: "James Hetfield"
}

const LarsUlrich = {
  name: "Lars Ulrich"
}

// you have to create a function for JamesHetfield
const sayNameForJamesHetfield = sayMetallicaNames.bind(JamesHetfield)

// and then you pass the label
sayNameForJamesHetfield("JamesHetfield")

// if you call it without the label it will sow undefined in the log message
sayNameForJamesHetfield()

// or you have to again create the function but you can pass the label in the bind method 

const sayNameForLarsUlrich = sayMetallicaNames.bind(LarsUlrich, "LarsUlrich")
// and then you can just call it
sayNameForLarsUlrich()