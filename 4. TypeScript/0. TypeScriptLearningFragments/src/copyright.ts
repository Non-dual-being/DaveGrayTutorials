const year = document.getElementById("year") as HTMLSpanElement;
console.log(year);
const thisYear: string = new Date().getFullYear().toString();
year.setAttribute("datetime", thisYear);
year.textContent = thisYear;
console.log(thisYear);
console.log("test");
