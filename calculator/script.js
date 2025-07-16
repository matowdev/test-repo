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

        // Запрещаем добавлять несколько десятичных точек в текущий сегмент числа.
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
            if (!isFinite(result)) {
                throw new Error('Invalid calculation result');
            }
            resultInput.value = result;
        } catch (error) {
            resultInput.value = 'Error';
        }
    }

    function evaluateExpression(expression) {
        // Это простой и безопасный вычислитель выражений.
        // Он обрабатывает основные арифметические операции с правильным приоритетом.
        // Он не использует eval() или new Function().
        const rawTokens = expression.match(/(\d+\.?\d*|[\+\-\*\/])/g);
        if (!rawTokens) return 0;

        // Обрабатываем токены для правильной обработки унарного минуса для отрицательных чисел.
        const tokens = [];
        for (let i = 0; i < rawTokens.length; i++) {
            if (rawTokens[i] === '-' && (i === 0 || /[\+\-\*\/]/.test(rawTokens[i - 1]))) {
                tokens.push(rawTokens[i] + rawTokens[i + 1]);
                i++; // Пропускаем следующий токен, так как он теперь является частью отрицательного числа.
            } else {
                tokens.push(rawTokens[i]);
            }
        }

        // Сначала обрабатываем умножение и деление
        let i = 0;
        while (i < tokens.length) {
            if (tokens[i] === '*' || tokens[i] === '/') {
                const left = parseFloat(tokens[i - 1]);
                const right = parseFloat(tokens[i + 1]);
                const result = tokens[i] === '*' ? left * right : left / right;
                tokens.splice(i - 1, 3, result);
                i = 0; // Перезапускаем сканирование
            } else {
                i++;
            }
        }

        // Обрабатываем сложение и вычитание
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
