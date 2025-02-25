export default class User {
    #id;
    #name;

    constructor (email, name) {
        this.#id = email;
        this.#name = name;
    }

    greeting() {
        return `Hi my name is ${this.#name}`;
    }
}

// Bovenaan de class declaratie geven we een overzicht van de naam en de private velden (#id en #name).
// Deze declaratie is public, waardoor de class "User" beschikbaar is voor import in andere modules.
// Door "export default" te gebruiken, kunnen we de class direct exporteren zonder expliciete naam in de import.
// Dit bevordert code-organisatie en maakt de class gemakkelijk te importeren en gebruiken in andere modules.
// We gebruiken hier geen "const" omdat een class geen constante waarde is; het is een constructie die bij elke instantie een nieuwe waarde kan bevatten.
// Het gebruik van private fields (#id en #name) beperkt de toegang tot deze attributen, wat de encapsulatie en veiligheid van de class verhoogt.
// Door #id en #name bovenaan de klasse te plaatsen, krijgen we direct inzicht in de beschikbare velden en de structuur van de class, wat de leesbaarheid en onderhoudbaarheid vergroot.
