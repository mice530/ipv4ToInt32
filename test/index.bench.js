const ipv4toInt32 = require('../index');
const loop = 1000000;

let start = Date.now();
for(let i=0; i<loop; i++){
  ipv4toInt32('172.168.5.1');
}

let spent = Date.now() - start;

console.log(`${spent}ms( loop ${loop} times )`);