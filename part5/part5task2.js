function filter(whiteList,blackList){
    let goodList = []
    for (let i of whiteList){
        if (!blackList.includes(i)){
            goodList.push(i)
        }
    }
    return goodList
}

let whiteList = ['my-email@gmail.ru', 'jsfunc@mail.ru', 'annavkmail@vk.ru', 'fullname@skill.ru', 'goodday@day.ru']

let blackList = ['jsfunc@mail.ru','goodday@day.ru']
let result = filter(whiteList, blackList);
console.log(result)