// Функция для отображения значения на экране
function display(value) {
    document.getElementById('result').value += value;
}

// Функция для очистки экрана
function clearScreen() {
    document.getElementById('result').value = '';
}

// Функция для вычисления результата
function calculate() {
    var p = document.getElementById('result').value;
    var q = eval(p);
    document.getElementById('result').value = q;
}

// Функция для удаления последнего символа
function deleteChar() {
    var p = document.getElementById('result').value;
    document.getElementById('result').value = p.slice(0, -1);
}
