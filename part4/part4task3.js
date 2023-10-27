let n = 4;
let index = -1;
let array = [2,5,1,3,4];
for (let i = 0; i < array.length;i++){
    if (array[i] === n){
        index = i;
        console.log("индекс элемента = " + index);
        break;
    }
} 
if (index === -1){
    console.log("элемент не найден");
}