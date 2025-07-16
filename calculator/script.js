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
            // Using the Function constructor is safer than eval() as it doesn't have access to the local scope.
            // For a production-ready calculator, a proper expression parser is recommended.
            const result = new Function('return ' + expression)();
            resultInput.value = result;
        } catch (error) {
            resultInput.value = 'Error';
        }
    }

    // Функция для удаления последнего символа
    function deleteChar() {
        const currentValue = resultInput.value;
        resultInput.value = currentValue.slice(0, -1);
    }
});
