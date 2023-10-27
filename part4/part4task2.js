let count = 5;
let array = []
for (let i = 0; i < count; i++){
    array.push(parseInt(i) + 1)
}
console.log(array)
for (let j = 0; j < count;j++){
    let i = Math.floor(Math.random() * count)
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
}
console.log(array)