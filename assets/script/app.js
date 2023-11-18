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
    let arr = str.split('-');
    let year = parseFloat(arr[2]);
    let month = parseFloat(arr[1]);
    let day = parseFloat(arr[0]);
    let arr2 = [year, month, day];
    return arr2;
}

function setUserDate(arr) {
    let input = getInput(arr);
    let date = new Date(input[0], input[1] - 1, input[2]).toDateString();
    return date;
}

function setUserAge() {
    let arr = getInput(userInput.value);
    let userDate = new Date(arr[0], arr[1] - 1, arr[2]);

    // console.log(userDate, today);
    // console.log(today - userDate);
    // console.log((today - userDate) / YEAR_IN_MILLISECONDS);
    return (today - userDate) / YEAR_IN_MILLISECONDS;
}

function setUserDays() {
    let arr = getInput(userInput.value);
    let userDate = new Date(arr[0], arr[1] - 1, arr[2]);
    return (today - userDate) / DAY_IN_MILLISECONDS;
}

function setDaysToBirthday() {
    let arr = getInput(userInput.value);
    let nextBirthday = new Date(today.getFullYear(), arr[1] - 1, arr[2]);
    return (nextBirthday - today) / DAY_IN_MILLISECONDS + 1;
}

onEvent('click', button, () => {
    if (isValid(userInput.value)) {
        userDate.innerText = `${setUserDate(userInput.value)}`;
        userAge.innerText = `You are ${Math.floor(setUserAge())} years old`;
        userDays.innerText = `You are ${Math.floor(setUserDays())} days old`;
        daysToBirthday.innerText = `${Math.floor(setDaysToBirthday())} days until your birthday`;
    } else {
        userDate.innerText = `Please, enter a valid date`;
        userAge.innerText = `Example: 23-12-2001`;
    }
});