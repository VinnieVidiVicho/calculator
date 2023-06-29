document.addEventListener('DOMContentLoaded', function() {
  const display = document.querySelector('.display');
  const keys = document.querySelectorAll('.key');

  keys.forEach(key => {
    key.addEventListener('click', handleClick);
  });

  function handleClick(e) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    let displayedNum = display.textContent;
    const previousKeyType = display.dataset.previousKeyType;

    if (action === 'number') {
      if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
        displayedNum = keyContent;
      } else {
        displayedNum += keyContent;
      }
      display.dataset.previousKeyType = 'number';
    }

    if (action === 'decimal') {
      if (!displayedNum.includes('.')) {
        displayedNum += '.';
      }
      display.dataset.previousKeyType = 'decimal';
    }

    if (action === 'operator') {
      const operator = key.dataset.operator;
      const firstNumber = parseFloat(display.dataset.firstNumber);
      const secondNumber = parseFloat(displayedNum);

      if (firstNumber && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
        const result = calculate(firstNumber, operator, secondNumber);
        displayedNum = result.toString();
        display.dataset.firstNumber = result;
      } else {
        display.dataset.firstNumber = displayedNum;
      }

      display.dataset.operator = operator;
      display.dataset.previousKeyType = 'operator';
    }

    if (action === 'clear') {
      delete display.dataset.firstNumber;
      delete display.dataset.operator;
      display.dataset.previousKeyType = 'clear';
      displayedNum = '0';
    }

    if (action === 'calculate') {
      const firstNumber = parseFloat(display.dataset.firstNumber);
      const operator = display.dataset.operator;
      const secondNumber = parseFloat(displayedNum);

      if (firstNumber && operator) {
        const result = calculate(firstNumber, operator, secondNumber);
        displayedNum = result.toString();
        delete display.dataset.firstNumber;
        delete display.dataset.operator;
        display.dataset.previousKeyType = 'calculate';
      }
    }

    display.textContent = displayedNum;
  }

  function calculate(num1, operator, num2) {
    switch (operator) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num1 / num2;
      default:
        return 'Error';
    }
  }
});
