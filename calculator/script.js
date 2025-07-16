document.addEventListener('DOMContentLoaded', function () {
    const resultInput = document.getElementById('result');
    const buttons = document.querySelector('.buttons');

    buttons.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            const buttonValue = event.target.textContent;

            if (buttonValue === 'C') {
                clearScreen();
            } else if (buttonValue === '<') {
                deleteChar();
            } else if (buttonValue === '=') {
                calculate();
            } else {
                display(buttonValue);
            }
        }
    });

    // Функция для отображения значения на экране
    function display(value) {
        const currentValue = resultInput.value;

        // Prevent adding multiple decimal points to the current number segment.
        if (value === '.') {
            const numberSegments = currentValue.split(/[+\-*\/]/);
            const lastSegment = numberSegments[numberSegments.length - 1];
            if (lastSegment.includes('.')) {
                return;
            }
        }

        resultInput.value += value;
    }

    // Функция для очистки экрана
    function clearScreen() {
        resultInput.value = '';
    }

    // Функция для вычисления результата
    function calculate() {
        const expression = resultInput.value;
        try {
            const result = evaluateExpression(expression);
            resultInput.value = result;
        } catch (error) {
            resultInput.value = 'Error';
        }
    }

    function evaluateExpression(expression) {
        // This is a simple and safe expression evaluator.
        // It handles basic arithmetic operations with correct precedence.
        // It does not use eval() or new Function().
        let tokens = expression.match(/(\d+\.?\d*|[\+\-\*\/])/g);
        if (!tokens) return 0;

        // Handle multiplication and division first
        let i = 0;
        while (i < tokens.length) {
            if (tokens[i] === '*' || tokens[i] === '/') {
                const left = parseFloat(tokens[i - 1]);
                const right = parseFloat(tokens[i + 1]);
                const result = tokens[i] === '*' ? left * right : left / right;
                tokens.splice(i - 1, 3, result);
                i = 0; // Restart scan
            } else {
                i++;
            }
        }

        // Handle addition and subtraction
        let result = parseFloat(tokens[0]);
        for (let i = 1; i < tokens.length; i += 2) {
            const operator = tokens[i];
            const operand = parseFloat(tokens[i + 1]);
            if (operator === '+') {
                result += operand;
            } else if (operator === '-') {
                result -= operand;
            }
        }

        return result;
    }

    // Функция для удаления последнего символа
    function deleteChar() {
        const currentValue = resultInput.value;
        resultInput.value = currentValue.slice(0, -1);
    }
});
