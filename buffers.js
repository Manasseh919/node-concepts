//objects that helps handle binary data

//file system operations,cryptography, image processing

const buffOne = Buffer.alloc(10) // allocate a buffer of 10 bytes
console.log(buffOne)

const buffFromString = Buffer.from('Hello')
// console.log(buffFromString)

const buffFromArrayOfint = Buffer.from([1,2,3,4,5,6])
// console.log(buffFromArrayOfint)

buffOne.write('Node Js')
console.log('After writing node js to bufferOne',buffOne.toString())

console.log(buffFromString[0])



