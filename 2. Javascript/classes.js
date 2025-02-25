
function pizzaClass (){
    /**Parent pizza class */
    class Pizza {
        constructor (pizzaSize = 'medium') {
            this.size =  pizzaSize;
            this.crust = "orginal";

        }

    /*     get pizzaCrust() {
            return this.crust;
        } */

        getCrust() {
            return this.crust;
        }
        
    /*     set pizzaCrust(pizzaCrust) {
            this.crust = pizzaCrust
        } */
    
        setCrust(pizzaCrust) {
            this.crust = pizzaCrust
        }

    
    }

    class choicePizza extends Pizza {
        /**default wordt hier geeerfd */
        constructor(pizzaSize){
            super(pizzaSize)
            this.type = "Pollo";
        }
        slice() {
            console.log(`Our ${this.type} ${this.size} Pizza has 8 slices`)
        }
    }


    const myChoicePizza = new choicePizza();
    myChoicePizza.slice();

}

function goodNamingConventions() {

    class Pizza {
        constructor (pizzaSize) {
            this._size = pizzaSize;
            this._crust = "orginal";
        }

        getCrust(){
            return this._crust;
        }

        setCrust(pizzaCrust = 'original'){
            this._crust = pizzaCrust;
        }

        /**the _ undicates a private value, meaning properties has to be set trough class methdos */
    }
}

function pizzaFactoryFuncs() {

//Factory functions

    function pizzaFactory(pizzaSize){
        const crust = 'Original'; /** cosnt is a block variable, so no global scope and this prevents user from direclty setting variables outside methods
        */
        const size = pizzaSize;
        return {
            bake: () => console.log(`baking a ${size} pizza with a ${crust} crust`) /**no {} cuz of single expression */
        }
    }

    const myChoicePizza = pizzaFactory('small');
    myChoicePizza.bake();

}


class Pizza {
    crust = 'Original'; /**Public field */
    #sauce = [];
    #size;

    constructor (pizzaSize) {
        this.#size = pizzaSize;
    }

    getCrust(){
        return this.crust;
    }

    setCrust(pizzaCrust = 'original'){
        this.crust = pizzaCrust;
    }

    getSauce(){
        return this.#sauce;
    }

    setSauce(pizzaSauce = 'Traditionel'){
        this.#sauce.push(pizzaSauce);
    }

    pizzaInfo() {
        console.log(`Here is your ${this.crust} ${this.#sauce} sauce ${this.#size} pizza`)
    }

}

const myPizza = new Pizza('large')
myPizza.pizzaInfo();
console.log(myPizza.crust); /*public availbe without method with . notation*/
myPizza.crust = 'Public thin'
console.log(myPizza.crust); /*this is not wat you want*/

myPizza.setCrust('Method entre les deux'); /**setting trougg methode */
console.log(myPizza.crust); /*this is not wat you want*/

myPizza.setSauce('garlic')
console.log(myPizza.getSauce().length > 0 ? `yes i am private and i am ${myPizza.getSauce()} `: `whoops still public java update most have gone wrong`);







/* const myPizza = new Pizza();
myPizza.bake();
const myPizza2 = new Pizza('Hawai');
myPizza2.bake();
const myPizza3 = new Pizza('large', 'pollo');
myPizza3.bake();

/* myPizza.pizzaCrust = 'entre les deux'; 
myPizza.setCrust('entre les deux');
myPizza.getCrust();
myPizza.bake();

myPizza.setToppings('sausage');
myPizza.setToppings('Olives');
 */


