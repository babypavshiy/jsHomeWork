function getOlderUser(user1,user2){
    if (user1.age > user2.age) return user1.name;
    return user2.name;
}

function getOlderUserArray(arr){
    let maxx = 0;
    let name = "";
    for (let i = 0; i < arr.length; i++){
        if (arr[i].age > maxx){
            maxx = arr[i].age;
            name = arr[i].name;
        }
    }
    return name
}

let user1={
    name: 'Игорь',
    age: 17
   }
   let user2={
    name: 'Оля',
    age: 21
   }
let allUsers=[
    {name: 'Валя', age: 11},
    { name: 'Таня',age: 24},
    {name: 'Рома',age: 21},
    {name: 'Надя', age: 34},
    {name: 'Антон', age: 7}
]
let result = getOlderUser(user1, user2);
let result2 = getOlderUserArray(allUsers);
console.log(result);
console.log(result2);