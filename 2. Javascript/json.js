{const myObjPerson = {
    name: 'Patrick',
    age: 35,
    martial_status: 'Single',
    hobbies: ['coding', 'chess'],
    hello: function () {
        console.log(`Hello my name is ${myObjPerson.name}`);
    }
}

console.log(myObjPerson);
myObjPerson.hello();

const sendJSON = JSON.stringify(myObjPerson);
console.log(sendJSON);

const recieveJSON = JSON.parse(sendJSON);
console.log(recieveJSON);}


