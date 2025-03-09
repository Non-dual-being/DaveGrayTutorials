"use strict";
const year = document.getElementById("year");
console.log(year);
const thisYear = new Date().getFullYear().toString();
year.setAttribute("datetime", thisYear);
year.textContent = thisYear;
console.log(thisYear);
console.log("test");
