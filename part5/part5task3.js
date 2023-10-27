function arrSort(arr){
    let temp = 0;
    for (let j = 0;j< arr.length-1; j++){
        for (let i = 0;i< arr.length-1; i++){
            if (arr[i] > arr[i+1]){
                temp = arr[i];
                arr[i]=arr[i+1];
                arr[i+1]=temp;
            }
        }
    }
    return arr;
}
res = arrSort([2,5,1,3,4]);
console.log(res);
console.log(arrSort([12,33,3,44,100]));
console.log(arrSort([0,1]));
