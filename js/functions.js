function checkLength(str, maxLenght){
  return str.length <= maxLenght;
}
checkLength('проверяемая строка',20);
checkLength('проверяемая строка',18);
checkLength('проверяемая строка',10);

function checkPalindrome(str){
  const palindrome = str.toLowerCase().replaceAll(' ','');
  let flag = true;
  for (let i = 0; i < Math.floor(palindrome.length / 2);i++){
    flag = palindrome[i] === palindrome[palindrome.length - 1 - i];
    if (!flag){
      return false;
    }
  }
  return flag;
}
checkPalindrome('топот');
checkPalindrome('ДовОд');
checkPalindrome('топ о   т');
checkPalindrome('Кекс');
checkPalindrome('Лёша на полке клопа нашёл ');
checkPalindrome('отто');

function cureNumber(parameter){
  const str = parameter.toString();
  let numBuilder = '';
  for (let i = 0;i < str.length; i++){
    const number = parseInt(str[i],10);
    numBuilder += !Number.isNaN(number) ? str[i] : '';
  }
  if (numBuilder === ''){
    return NaN;
  }
  return parseInt(numBuilder,10);
}
cureNumber('2023 год');
cureNumber('ECMAScript 2022');
cureNumber('1 кефир, 0.5 батона');
cureNumber('агент 007');
cureNumber('а я томат');
cureNumber(2023);
cureNumber(-1);
cureNumber(1.5);

