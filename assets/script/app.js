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
const DAYS_IN_A_YEAR = 365;

let today = new Date();
today.setHours(0, 0, 0, 0);

function clear() {
    userInput.value = '';
    userDate.innerText = '';
    userAge.innerText = '';
    userDays.innerText = '';
    daysToBirthday.innerText = '';
}

onEvent('load', window, () => {
    clear();
});

function isValid(arg) {
    let dateFormat = /^(0?[1-9]|[1-2][0-9]|3[0-1])-(0?[1-9]|1[0-2])-\d{4}$/;
    let arr = getInput(arg);
    let date = new Date (arr[2], arr[1] - 1, arr[0]);

    if (arg !== "" && dateFormat.test(arg) === true) {
        if ((date <= today) == true) {
            return true;
        }
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
    let diff = Date.now() - userDate.getTime();
    let newDate = new Date(diff);
    let year = newDate.getUTCFullYear();

    return Math.floor(year - 1970);

    // userDate.setHours(0, 0, 0, 0);
    // return (today - userDate) / YEAR_IN_MILLISECONDS;
}

function setUserDays() {
    let arr = getInput(userInput.value);
    let userDate = new Date(arr[2], arr[1] - 1, arr[0]);
    return (today - userDate) / DAY_IN_MILLISECONDS;
}

function setDaysToBirthday() {
    let arr = getInput(userInput.value);
    let month = arr[1] - 1;
    let day = arr[0];
    let nextBirthday = new Date(today.getFullYear(), month, day);
    let diff = (nextBirthday - today) / DAY_IN_MILLISECONDS;
    let days;

    if (diff === 0 ) {
        daysToBirthday.innerText = `Happy Birthday!!`;
    } else if (diff < 0) {
        days = DAYS_IN_A_YEAR + (diff);
        daysToBirthday.innerText = `${Math.floor(days)} day(s) until your birthday`;
    } else {
        daysToBirthday.innerText = `${Math.floor(diff)} day(s) until your birthday`
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
        userDays.innerText = ``;
        daysToBirthday.innerText = ``;
    }
});