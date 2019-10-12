module.exports = function multiply(first, second) {
  
  function replaceAt(expr, index, replacement) {
    return expr.substr(0, index) + replacement
      + expr.substr(index + replacement.length);
  }

  function sumStrings(first, second, i) {
    if (i == -1) {
      return "1" + first;
    }
    let sum = (+first[i] + (+second)).toString();
    if (sum >= 10) {
      first = replaceAt(first.toString(), i, sum[1]);

      return sumStrings(first, sum[0], i - 1);
    } else {
      return replaceAt(first.toString(), i, sum);
    }
  }

  function addZeros(num, quantity) {
    for (let i = 0; i < quantity; i++) {
      num += "0";
    }
    return num;
  }

  function multiplyStrings(first, second) {
    let memory = [];

    for (let i = first.length - 1; i >= 0; i--) {
      for (let j = second.length - 1; j >= 0; j--) {
        memory.push(addZeros(first[i] * second[j], first.length + second.length - i - j - 2).toString());
      }
    }
    function sumArrayStrings(memory) {
      let sum = memory[0]; 
      for (let i = 1; i < memory.length; i++) {
        let currentValue;
        if (sum.length > memory[i].length) {
          currentValue = memory[i];
        } else {
          currentValue = sum;
          sum = memory[i]
        }
        for (let j = currentValue.length - 1; j >= 0; j--) {
          let subIndex = j + (sum.length - currentValue.length);
          if (subIndex == -1) {
            sum = currentValue.charAt(j) + sum;
          } else {
            sum = sumStrings(sum, currentValue.charAt(j), subIndex);
          }
        }
      }
      return sum;
    }
    return sumArrayStrings(memory);
  }
  
  return multiplyStrings(first, second);
}
