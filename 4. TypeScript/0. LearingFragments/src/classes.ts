class Coder {
    constructor (
        public readonly name: string,
        public music: string,
        private age: number,
        protected lang: string = 'Typescript' //can get acces also trough derived classes
    ) {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;

    }

    public getAge() {
        return `Hello, I'm ${this.age} year's old`
    }
}

const Dave = new Coder('Dave', 'Rock', 42);

class WebDev extends Coder {
    public constructor (
        public computer: string,
        name: string,
        music: string,
        age: number


    ) {
        super(name, music, age) // this has to be on the top
        this.computer = computer
    }

    public getLanquage() {
        return `My coding lanquage is ${this.lang}`
    }
}

const chefke = new WebDev ('Asus', 'Kevin', 'spot', 2);

console.log(chefke.getLanquage());


//************************** */
interface Musician {
    name: string,
    instrument: string,
    play (action: string): string

}

class Guitarist_interface implements Musician {
    name: string
    instrument: string

    constructor (
        name: string,
        instrument: string
    ) {
        this.name = name
        this.instrument = instrument

        }

    play(action: string): string {
        return `${this.name} ${action} the ${this.instrument}`
    }

}

const Page = new Guitarist_interface('Jimmy', 'Guitar')

console.log(Page.play('eats'));

/******** */

class Peeps {
    static count: number = 0 // static means it belongs to the class

    static getCount(): number {
        return Peeps.count
    }

    public id: number

    constructor (public name: string) {
        this.name = name
        this.id = ++Peeps.count //count will we be added first and wil be 1, the plus ++ in front makes sure its is one

    }
}

const John = new Peeps ('John')
const Steve = new Peeps ('Steve')
const AmylovesEric = new Peeps ('Grabbelton')

//************** */

class Bands {
    private dataState: string[]

    constructor() {
        this.dataState = []
    }

    public get data(): string[] {
        return this.dataState
    }

    public set data(value: string[]) {
        if (Array.isArray(value) && value.every(el => typeof el === 'string')) {
            this.dataState = value
            return

            } else throw new Error ('Param is not an array of strings')
        }
    }

const MyBands = new Bands ();
MyBands.data = ['Niel Young', 'Led Zep'];
console.log(MyBands.data);
MyBands.data = [...MyBands.data, 'ZZ Top'];


