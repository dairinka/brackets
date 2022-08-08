module.exports = function check(str, bracketsConfig) {
  let result = false;
  let strLength = str.length;
  let objBracketConfig = bracketsConfig.reduce((acc, arr) => ({...acc, [arr[0]]:arr[1]}),{});
  let strArr = str.split(/(.{1})/).filter(O=>O);

  if(str.length % 2 !== 0){return false};
  
  for(let prop in objBracketConfig){
    let re1 = new RegExp("[" + prop + "]", "g");
    let propMatch = str.match(re1) || [];
    let countProp = propMatch.length;

    let value = objBracketConfig[prop]; 
    let re2 =  new RegExp("[" + value + "]", "g");
    let valueMatch = (value == ']')?str.match(/\]/g): str.match(re2) || [];
    let countValue = valueMatch.length;

    if (countProp !== countValue){return false}

    while(countProp > 0){
      let index = strArr.indexOf(prop);
     
      if(index == strLength-1){return false}
      block_1:
      for(let i = 1; ((index + i) < strLength && index != -1); i +=2){
       
        if(strArr[index + i] == objBracketConfig[prop]){
          result = true;
          strArr[index] = strArr[index + i] = '';
          break block_1;
        } else {
          result = false;
       }
        
      }
      if(result == false){return false}
      countProp--;
    }
    
  }
  return result;
}
