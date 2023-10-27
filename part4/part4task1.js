let count = 42;
let n = -3;
let m = -10;
let array = []
for (let i = 0;i<count;i++){
    array.push(Math.round(Math.random() * (m-n)) + n)
}
console.log(array)