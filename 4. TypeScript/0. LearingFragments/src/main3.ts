// Index Signatures

interface TransactionObj {
    Pizza: number,
    Books: number,
    Job: number
}

interface TransactionObj2 {
    [index: string]:number //keys are going to be strings and values are going te be numbers

}

const todaysTransactions: TransactionObj = {
    Pizza: -10,
    Books: -5,
    Job: 50
}

//Dynamically acces to prop

let prop: string = 'Pizza';

`console.log(todaysTransactions[prop])`

/**
 * 
 * de prop werkt niet omdat index signature niet ingesteld
 * dus singature instellen
 * *het werkt zowel niet voor loops als voor indeceren via een variable
 * 
 */

const todaysNet = (transactions: TransactionObj): number => {
    let total = 0;
    for (const transaction in transactions) {
        //!total += transactions[transaction] 
        //hier werk je dus ook weer met een signrature index 

    }
    return total;

}
const todaysNet2 = (transactions: anotherExample): number => {
    let total = 0;
    for (const transaction in transactions) {
        total+= transactions[transaction] 
        /**
         * *dit werkt dus van singature indexing ingesteld in transjactionobj2
         */

    }
    return total;

}


interface anotherExample {
    [index: string]: number
    Pizza: number,
    Books: number,
    Job: number
}

const todaysExample: anotherExample = {
    Pizza: 3,
    Books: 4,
    Job: 5,
    Croissant: 42
    
}

console.log(todaysNet2(todaysExample));

/************************************************* */

interface Student {
    name: string,
    GPA: number,
    classes?: number[]
}

const student2: Student = {
    name: 'ons poepeke',
    GPA: 0,
    classes: [1,2,3,5,6]
}

const student: Student2 = {
    name: 'ons poepeke',
    GPA: 0,
    classes: [1,2,3,5,6]
}


interface Student2 {
    [key: string] : string | number | number[] | undefined
    name: string,
    GPA: number,
    classes?: number[]
}

for (const key in student) {
    console.log(
        `${key} : ${student[key]}`
    )
}


for (const key in student) {
    console.log(
        `${key} : ${student[key]}`
    )
}

for (const key in student2) {
    console.log(
        `${key} : ${student[key as keyof Student]}`
        // keyof allows to loop trough the defined keys without using a index signature
    )
}

Object.keys(student).map(key =>
    {
        console.log(student[key as keyof typeof student])
        //hier gebruik je het object zelf met behulp van typeof
    }
)

const logStudentKey = (student: Student2, key: keyof Student2): void => {
    console.log(`Student ${key}: ${student[key]}`);
}

logStudentKey(student, 'GPA');


type Streams = 'salary' | 'bonus' | 'sidehistle'
type Incomes = Record<Streams, number> 

//record is of format Record<K, T> K are the keys, 
// in this example the union type streams
//Record does not allow to add key values here or to defined type for a speciic key

const Payment: Incomes = {
    salary: 5,
    bonus: 10,
    sidehistle: 3

}

for (const key in Payment) {
    console.log(`${key} : ${Payment[key as keyof Incomes]}`)
}


