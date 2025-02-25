

{const myObj = {name: "Dave"};

console.log(myObj.name);

const anotherObj = {
    alive: true,
    answer: 42,
    hobbies: ["Eat", "Sleep", "code"],
    beverage: {
        morning: "Coffee",
        afternoon: "Iced Tea"
    },
    action: function(){
        return `Time for ${this.beverage.morning} `
    }
};



console.log(anotherObj.alive);
console.log(anotherObj.hobbies[0,2]);
console.log(anotherObj["alive"]);
console.log(anotherObj["beverage"].morning);
console.log(anotherObj.action());

}


{const vehicle = {
    wheels: 4,
    engine: function () {
        return "Vroom!";
    }
}

const truck = Object.create(vehicle);
truck.doors = 2;
console.log(truck); //you only see doors here
console.log(truck.wheels); // this works, cuz of Inheritance


const car = Object.create(vehicle);
car.doors = 4;
car.engine = function () {return "Vroom vroom femke!"};}

const poolclub = {
    voorzitter: "Klosjaartje",
    member1: "Ons poepeke",
    member2: "Patrick",
    member3: "Iamgettingdeleted"

}

for (let job in poolclub) {
    console.log(poolclub[job]);
}

delete poolclub.member3
console.log(poolclub.hasOwnProperty("member3"));


// destructuring objects

const {voorzitter: ourFrontsitter} = poolclub;
const {member1: member1, member2:member2} = poolclub;

console.log(member1, member2);








