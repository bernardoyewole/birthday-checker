'use strict';

// Utility functions
function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

// Main
const userInput = select('.user-input');
const button = select('button');
const userDate = select('.user-date');
const userAge = select('.user-age');
const userDays = select('.user-days');
const daysToBirthday = select('.days-to-birthday');

const YEAR_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 365;
const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
let today = new Date();
today.setHours(0, 0, 0, 0);

onEvent('load', window, () => {
    // userInput.value = '';
    userDate.innerText = '';
    userAge.innerText = '';
    userDays.innerText = '';
    daysToBirthday.innerText = '';
});

function isValid(arg) {
    let dateFormat = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/;
    if (arg !== "" && dateFormat.test(arg) === true) {
        return true;
    }
    return false;
}

function getInput(str) {
    let strArr = str.split('-');
    let numArr = strArr.map(num => parseFloat(num));
    return numArr;
}

function setUserDate(arr) {
    let input = getInput(arr);
    let date = new Date(input[2], input[1] - 1, input[0]).toDateString();
    return date;
}

function setUserAge() {
    let arr = getInput(userInput.value);
    let userDate = new Date(arr[2], arr[1] - 1, arr[0]);
    return (today - userDate) / YEAR_IN_MILLISECONDS;
}

function setUserDays() {
    let arr = getInput(userInput.value);
    let userDate = new Date(arr[2], arr[1] - 1, arr[0]);
    return (today - userDate) / DAY_IN_MILLISECONDS;
}

function setDaysToBirthday() {
    let arr = getInput(userInput.value);
    let nextBirthday = new Date(today.getFullYear(), arr[1] - 1, arr[0]);
    
    if (today.getDate() > nextBirthday.getDate()) {
        let next = 365 - (today.getDate() - nextBirthday.getDate());
        daysToBirthday.innerText = `${Math.floor(next)} day(s) until your birthday`;
    } else if (today.getDate() < nextBirthday.getDate()) {
        let days = (nextBirthday - today) / DAY_IN_MILLISECONDS;
        daysToBirthday.innerText = `${Math.floor(days)} day(s) until your birthday`;
    } else {
        daysToBirthday.innerText = `Happy Birthday!!`;
    }
}

function output() {
    userDate.innerText = `${setUserDate(userInput.value)}`;
    userAge.innerText = `You are ${Math.floor(setUserAge())} years old`;
    userDays.innerText = `You are ${Math.floor(setUserDays())} days old`;
    setDaysToBirthday();
}

onEvent('click', button, () => {
    if (isValid(userInput.value)) {
        output();
    } else {
        userDate.innerText = `Please, enter a valid date`;
        userAge.innerText = `Example: 23-12-2001`;
    }
});