"use strict";
const year = document.getElementById('year');
const thisYear = new Date().getFullYear();
console.log(typeof (thisYear));
year.setAttribute("datetime", thisYear);
year.textContent = thisYear;
const createErrorCopy = (errMsg) => {
    throw new Error(errMsg);
};
const logMsgCopy = (message) => {
    console.log(message);
};
//first variations
const year_var1 = document.getElementById('year');
const thisYear_var1 = new Date().getFullYear.toString();
if (year_var1) {
    year_var1.setAttribute("datetime", thisYear);
    year_var1.textContent = thisYear;
}
else {
    logMsgCopy(createErrorCopy(`HTML element not found, is type of ${typeof (year_var1)}`));
}
//second variation
const year_var2 = document.getElementById('year');
const thisYear_var2 = new Date().getFullYear.toString();
year_var2.setAttribute("datetime", thisYear);
year_var2.textContent = thisYear;
