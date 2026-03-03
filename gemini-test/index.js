// ** функции вычислений
function sum(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return 'Error: /0';
  return a / b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

// ** интерактив
document.addEventListener('DOMContentLoaded', () => {
  const calcBtn = document.getElementById('calc-btn');
  const resultDiv = document.getElementById('result');
  const themeToggle = document.getElementById('theme-toggle');

  // калькулятор
  calcBtn.addEventListener('click', () => {
    const n1 = parseFloat(document.getElementById('num1').value) || 0;
    const n2 = parseFloat(document.getElementById('num2').value) || 0;
    const op = document.getElementById('operator').value;

    let res;
    switch (op) {
      case 'sum':
        res = sum(n1, n2);
        break;
      case 'multiply':
        res = multiply(n1, n2);
        break;
      case 'divide':
        res = divide(n1, n2);
        break;
      case 'power':
        res = power(n1, n2);
        break;
    }

    resultDiv.innerText = `Результат: ${res}`;
    resultDiv.style.color = '#b21f1f';
    setTimeout(() => (resultDiv.style.color = ''), 500);
  });

  // темная тема
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
});
