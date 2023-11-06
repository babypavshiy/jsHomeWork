function createStudentsList(){
    let obj=[
        {name: 'Валя', age: 11},
        {name: 'Таня',age: 24},
        {name: 'Рома',age: 21},
        {name: 'Надя', age: 34},
        {name: 'Антон', age: 7}
       ];
    let ul = document.createElement('ul');
    for (let i = 0; i < obj.length; i ++){
        let li = document.createElement("li");
        let h2 = document.createElement('h2');
        let span = document.createElement('span');
        h2.textContent = obj[i]["name"];
        span.textContent = 'Возраст: ' + String(obj[i]["age"]) + ' лет';
        li.append(h2);
        li.append(span);
        ul.append(li);
    }
    document.body.append(ul);
}

let count = 0;
let getList = document.querySelector(".btn");

getList.addEventListener("click", createStudentsList);