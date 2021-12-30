import React from 'react';
import Keypad from '../keypad';
import Screen from '../screen';
import s from './calculator.module.css';
import { useState } from 'react'



export default function Calculator() {
    const [calculatorData, setCalculatorData] = useState([0])
    return (
        <div className={s.calculator}>
            <Screen text={calculatorData}  />
            <Keypad updateScreen={setCalculatorData} />
        </div>
    );
}
