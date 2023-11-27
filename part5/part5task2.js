let whiteList = ['my-email@gmail.ru', 'jsfunc@mail.ru', 'annavkmail@vk.ru', 'fullname@skill.ru', 'goodday@day.ru'];
let blackList = ['jsfunc@mail.ru','goodday@day.ru'];
let result = whiteList.filter(el => !blackList.includes(el));
console.log(result);