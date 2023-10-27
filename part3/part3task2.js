let userName = "egoR";
let userSurname = "kHreNov";
let realUsername = userName.substring(0,1).toUpperCase() + userName.substring(1).toLowerCase()
let realSurname = userSurname.substring(0,1).toUpperCase() + userSurname.substring(1).toLowerCase()
if (userName === realUsername){
    console.log("Имя осталось без изменений")
}
else{
    console.log("Имя было преобразовано: " + realUsername)
}
if (userSurname === realSurname){
    console.log("Фамилия осталась без изменений")
}
else{
    console.log("Фамилия была преобразована: " + realSurname)
}