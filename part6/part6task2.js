function filter(arr,param, filt){
    let res = [];
    for (let item of arr){
        if (item[param] === filt){
            res.push(item);
        }
    }
    return res;
}


let objects = [
    { name: 'Василий', surname: 'Васильев' },
    { name: 'Иван', surname: 'Иванов' },
    { name: 'Пётр', surname: 'Петров' }
   ]
let result = filter(objects, 'name', 'Иван');
console.log(result);