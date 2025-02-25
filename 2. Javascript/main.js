document.addEventListener('DOMContentLoaded', function () {
    
    
    function firstjs () {
    const myString = "Today";

    document.addEventListener('click', function() {
        console.log(`It's rainy, ${myString}`);
    });

    const myString2 = "Yesterday";

    if (myString2.charAt(0).toLowerCase() === myString2.charAt(myString2.length - 1).toLowerCase()) {
        const h1_js = document.getElementById('h1');
        if (h1_js) {
            console.log(`The text of the h1 element is: ${h1_js.innerText}`);
        } else {
            console.log("The h1 element with name 'h1' was not found.");
        }
    }

    const myNumber = "43.123c";

    console.log(parseFloat(myNumber));
    console.log(typeof(parseFloat(myNumber)));
    // Javascript has no float type, only number

    const myRealNumber = parseFloat(myNumber);
    const myRealToFixed2Number = myRealNumber.toFixed(2);

    console.log(`My Real Number is ${myRealNumber} and is of type ${typeof(myRealNumber)}`);
    console.log(`My Real to fixed 2 Number is ${myRealToFixed2Number} and is of type ${typeof(myRealToFixed2Number)}`);

    const myRealInt = parseInt(myNumber);
    const myRealToFixed2Int = myRealInt.toFixed(2);

    console.log(`My Real Number is ${myRealInt} and is of type ${typeof(myRealInt)}`);
    console.log(`My Real to fixed 2 Number is ${myRealToFixed2Int} and is of type ${typeof(myRealToFixed2Int)}`);

    function randomLetterFromName (someName){
        let passedName = '';
        if (someName.length > 0){
            if (typeof someName === 'string'){
                passedName = someName;
            } else {
                passedName = String(someName);
            }
            if (passedName) {
                console.log(passedName);
                charIndex = Math.floor((Math.random()*passedName.length));
                console.log(charIndex);
                console.log(passedName.charAt(charIndex));
            } else {
                alert('provide a correct name');
            }
        } else {
            alert('no name');
        }
    }
    const myName = 'Ons_Poepeke';
    randomLetterFromName(myName);

    let soup = "Pumpkin soup";
    isCustomerBanned = false;

    isCustomerBanned ? console.log('Sorry no soup 4 you') : soup ? console.log(`We have some ${soup} for you`) : console.log('Sorry no soup today!');

    confirm("OK === True\n Cancel === False")

    let name = prompt("Please enter your name: ");
    name ? console.log(name) : console.log("You didn't enter your name.");

}

    function RockPaperSirros() {

        const validPlayerChoice = ["rock", "paper", "siccors"];

        let playGame = confirm("Shall we play Rock, Paper, or siccors?");

        if (playGame) {
            let playerChoice = prompt("Please enter rock, paper or sciccors")
            if (playerChoice){
                let playerOne = playerChoice.trim().toLowerCase();
                if (validPlayerChoice.includes(playerOne)) {
                    let computerChoice = validPlayerChoice[Math.floor(Math.random()*validPlayerChoice.length)];
                    let result =
                    playerOne === computerChoice ? 'Tie Game!' 
                    : playerOne === 'rock' && computerChoice === 'paper' ? `Player one ${playerOne}, computer ${computerChoice}. \n Computers wins this one!` 
                    : playerOne === 'paper' && computerChoice === 'siccors' ? `Player one ${playerOne}, computer ${computerChoice}. \n Computers wins this one!` 
                    : playerOne === 'siccors' && computerChoice === 'rock' ? `Player one ${playerOne}, computer ${computerChoice}. \n Computers wins this one!` 
                    : `Player one ${playerOne}, computer ${computerChoice}. \n Great job on winning this game!` 
                    alert(result);
                    let playAgain = confirm("Play again");
                    playAgain ? this.location.reload() : alert("Thanks for playing");
                } else {
                    alert("You didn't enter rock, player or scissors")
                }
                
            } else {
                alert("See you later!");
            }
        } else {
            alert("Ok, maybe next time");
        }
    }
    
    function loops () {
        let myNumber1 = 0;
        while (myNumber1 < 50) {
            console.log(myNumber1);
            myNumber1++;
        }

        let myNumber2 = 1
        do {
            console.log(myNumber2);

        } while (myNumber2 < 50)
        
        for (let i = 0; i <=10; i++){
            console.log(i);
        }

        let name = "ForLoop"
        index = 0;

        for(index; index < name.length; index++) {
            console.log(name.charAt(index));
        }

        let name2 = "ForLoop";

        for (let char of name2) {
            console.log(char);
        }

        let name3 = "ForLoop";

        name.split('').forEach(char => console.log(char)); //less efficiemt cuz of making a array
        
        let counter = 0;
        const myName = "Breakawhileloop"
        let myLetter;

        while (true) {
            myLetter = myName.charAt(counter);
            console.log(myLetter);
            if (myLetter === 'p') break; //*single instructions dont aquire {}
            counter++;
        }

        let counter1 = 0;
        const myName1 = "Breakawhileloop"
        let myLetter1;
    
        while (true) {
            myLetter1 = myName1.charAt(counter);
            console.log(myLetter);
            if (counter === 0) {
                counter = myName1.length - 1;
                continue;
            }
            if (myLetter1 === 'p') break; //*single instructions dont aquire {}
    
            counter++;
        }

    }

    function someMyFunctions () {
        
        function sum (num1, num2) {
            if (!num2) {
                return num1*2;
            } 
            return num1 + num2;
            }

            console.log(sum(5,10));

        function getUserNameFromEmail(email) {
            return email.slice(0, email.indexOf('@'));     
        }
        
        console.log(getUserNameFromEmail("someUser@live.com"));

        const someEmailStored = function (email) {
            return email.slice(0, email.indexOf('@')); 
        }
    
        console.log(someEmailStored('myCFunction@gmail.com'));

    
    //arrow fuctioms    
    
        const someEmailStored2 = (email) => {
            return email.slice(0, email.indexOf('@')); 
        }

        console.log(someEmailStored2('myCFunction@gmail.com'));

        const toPropperCase =  (name) => {
            return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        }

        console.log(toPropperCase("patricK"));
    
        function scope() {
            const z = 5; //local scope
            return z;
        }

        // Geef scope terug als methode van een object
        return { scope };

        function someFunc () {
            var x = 10;
            const y = 10;
            {
                var x = 11;
                const z = 6;
            }
    
            console.log(`var is function scoped ${x}`); //const and let are blocked scope
        }

        
    // || global scope || \\
    const x = 3; 
    let y = 6;
    const z = 10;

    // { code } = code_block

    {
        let y = 4; // local scope
    }

    const methodsfromSomeMyFunctions = someMyFunctions();
    console.log(methodsfromSomeMyFunctions.scope());



    }

    //* || Arrays  || *\\

    const myArray = ['1', '2', 'three']
    myArray.unshift('4');
    console.log(myArray);

    myArray.push('5');

    /**
 * Voorbeeld van gebruik van de splice() methode.
 * splice() wordt gebruikt om elementen toe te voegen, te verwijderen of te vervangen
 * in een array op een specifieke indexpositie.
 */

    let fruits = ["appel", "banaan", "kers", "druif", "mango"];

    // Gebruik splice om één element te verwijderen
    // Syntax: array.splice(startIndex, deleteCount, item1, item2, ...)

    // Verwijderen van het element op index 2 ("kers")
    let removedFruit = fruits.splice(2, 1); // Verwijdert 1 element vanaf index 2
    console.log("Array na verwijdering:", fruits); // ["appel", "banaan", "druif", "mango"]
    console.log("Verwijderd element:", removedFruit); // ["kers"]

    // Gebruik splice om elementen toe te voegen
    // Toevoegen van "peer" en "ananas" op index 1
    fruits.splice(1, 0, "peer", "ananas"); // Verwijdert niets, voegt 2 elementen toe op index 1
    console.log("Array na toevoeging:", fruits); // ["appel", "peer", "ananas", "banaan", "druif", "mango"]

    // Gebruik splice om een element te vervangen
    // Vervangen van het element op index 3 ("banaan") met "sinaasappel"
    fruits.splice(3, 1, "sinaasappel"); // Vervangt 1 element op index 3
    console.log("Array na vervanging:", fruits); // ["appel", "peer", "ananas", "sinaasappel", "druif", "mango"]

    /**spread operator */
    const myArray2 = [1, 2, 3, 4]
    const myArray3 = myArray2.map(x => x*2);

    const mynewArray1 = [...myArray2, ...myArray3]; // no new array with 2 arrats both 1 array with all the elements

    const evennewArray = mynewArray1.filter(x => x % 2 === 0).map(x => x*x);

    const acculated = evennewArray.reduce((acc, x) => { //callback functie die iterereert over elke element uit de lijst, reduce geeft pas de waarde terug als elke iteratie is doorlopem. 
       return x % 2 === 0 ? acc + x * x : acc;}
       , 0)

       //ternaire operator als het even is dan het geacculumeneerde getalen optellen bij het product anders acc behouden, de 0 is de initiele waarde

    console.log(acculated);

    
});
