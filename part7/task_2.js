function createStudentCard(obj){
    let div = document.createElement('div');
    let h2 = document.createElement('h2');
    let span = document.createElement('span');
    h2.textContent = obj["name"];
    span.textContent = 'Возраст: ' + String(obj["age"]) + ' лет';
    div.append(h2)
    div.append(span)
    document.body.append(div)
}
objec = {
    name: 'Игорь',
    age: 17
}
createStudentCard(objec);