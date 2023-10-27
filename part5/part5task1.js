function getAge(birthYear) {
    let currentDate = new Date()
    let currentYear = currentDate.getFullYear()
    return currentYear - birthYear
}
console.log(getAge(2004))