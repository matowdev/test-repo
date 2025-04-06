// ** функция сложения
function sum(a, b) {
  return a + b;
}

console.log(sum(1, 2)); // 3

// ** функция умножения
function multiply(a, b) {
  return a * b;
}

console.log(multiply(2, 3)); // 6

// ** функция деления
function divide(a, b) {
  if (b === 0) {
    return 'Division by zero is not allowed!';
  }
  return a / b;
}

console.log(divide(6, 2)); // 3
console.log(divide(5, 0)); // 'Division by zero is not allowed!'

// ** функция возведения в степень
function power(base, exponent) {
  return Math.pow(base, exponent);
}

console.log(power(2, 3)); // 8
console.log(power(3, 2)); // 9
