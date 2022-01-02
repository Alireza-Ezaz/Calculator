import React from 'react';
import s from './keypad.module.css';
import Button from '../button';
import cx from 'classnames';

let result = 0;
let screenValue = 0;
let operator = '';
let clearScreen = false;
let operators = ['+', '-', 'x', 'C', '+/-', '%', '÷', '.', '='];

const calculate = (operator, a = 0, b = 0) => {
    if (operator === '%') {
        return a % b
    } else if (operator === '÷') {
        if(b === 0){
            alert('Divide by 0 is NOT allowed');
            result = 0;
            clearScreen = false
            screenValue = 0
            return 0;
        }
        return a / b
    } else if (operator === '+') {
        return parseFloat(a) + parseFloat(b)
    } else if (operator === '-') {
        return a - b
    } else if (operator === 'x') {
        return parseFloat(a) * parseFloat(b)
    }
}

export default function Keypad({updateScreen}) {
    const handleButtonClick = (button) => {

        if (operator != '' && !clearScreen) {
            result = screenValue
            screenValue = 0;
            clearScreen = true;
        }

        if (operators.includes(button)) {
            if (clearScreen && button !== '=' && button !== '.') {
                result = calculate(operator, result, screenValue)
                screenValue = result
                clearScreen = false
            }
            if (button === '+/-') {
                if (screenValue != 0) {
                    screenValue = screenValue * -1
                    if (operator === '') {
                        result = screenValue
                    }
                }
            } else if (button === 'C' || isNaN(screenValue)) {
                result = 0;
                clearScreen = false
                screenValue = 0
            } else if (button === '.') {
                screenValue = screenValue + button
            } else if (button === '=') {
                result = calculate(operator, result, screenValue)
                screenValue = result
                clearScreen = false
                operator = ''
            } else {
                operator = button
            }
        } else {
            if ((parseFloat(screenValue) === 0 || screenValue === '') && button == 0) {
                screenValue = 0
            } else if (screenValue === 0 && button !== 0) {
                screenValue = button
            } else if (screenValue !== 0 && button !== 0) {
                screenValue = screenValue + button
            }
        }

        updateScreen(screenValue);

    };

    const buttons = [
        {text: 'C', isDark: true},
        {text: '+/-', isDark: true},
        {text: '%', isDark: true},
        {text: '÷', isDark: true},
        {text: '7'},
        {text: '8'},
        {text: '9'},
        {text: 'x', isDark: true},
        {text: '4'},
        {text: '5'},
        {text: '6'},
        {text: '-', isDark: true},
        {text: '1'},
        {text: '2'},
        {text: '3'},
        {text: '+', isDark: true},
        {text: '0', isLarge: true},
        {text: '.'},
        {text: '=', isDark: true},
    ];

    return (
        <div className={s.keypad}>
            {buttons.map((button) => (
                <Button
                    key={button.text}
                    text={button.text}
                    onClick={handleButtonClick}
                    className={cx(
                        button.isLarge && s['button-2x'],
                        button.isDark && s.dark,
                    )}
                />
            ))}
        </div>
    );
}
