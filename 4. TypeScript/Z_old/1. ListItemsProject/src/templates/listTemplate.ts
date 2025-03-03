import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(FullListInstance: FullList): void //** instance makes it clear youre using singleton, otherwise looks like u use the class itself */
}

export default class ListTemplate implements DOMList {

    ul: HTMLUListElement; //instantiering hier zodat de constructor een assingment kan uitvoeren
    static instance: ListTemplate = new ListTemplate();
    
    private constructor () {
        this.ul = document.getElementById("listItems") as HTMLUListElement; 

        /**
         * het doorgeven in de parameter heeft hier geen zin, want je haalt het direct uit de DOM dus als je een nieuwe klasse maakt, heeft een default value geen zin
         * dit werkt alleen als het element ook aanwezig is in je HTML
         * *assertion is nodig omdat getelementbyid een union type is die ook null kan zijn, in de interface biedt je die mogelijkheid niet
         * *dit houdt er echt geen rekening mee dat het null kan zijn, dus een type guard is beter hier 
         * todo:   this.ul = document.getElementById("listItems")! is het zelfde als   this.ul = document.getElementById("listItems") as HTMLUListElement; 
         * de ! zegt kan niet null zijn 
         */

        //type guard example

        const element = document.getElementById("listItems");
        if (element instanceof HTMLUListElement) {
            this.ul = element;
        } else {
            throw new Error("Element does not exist in DOM")
        }
    }

    clear(): void {
        this.ul.innerHTML = ''
    }

    render(FullListInstance: FullList = FullList.instance): void {
        this.clear()
        /**the paramter refers to the instance and has the default of the instance
         * *this is possible cuz of the singleton
         */
        FullListInstance.list.forEach(item => {
            const li = document.createElement("li") as HTMLLIElement;
            li.className = "item";

            const check = document.createElement("input") as HTMLInputElement;
            check.type = "checkbox"
            check.id = item.id
            check.tabIndex = 0
            check.checked = item.checked 
            //not _item using the getter en setters methods van LisItem, 
            // deze zijn beschikbaar zonder de import omdat je in de klasse van Fullist een type definitie hebt gedaan
            li.append(check) //append is een moderne versie van appendChild. Appenchild accepterteet 1 node, append meerdere via spread en accepteer een string als textknoop op het ouderelement)
            check.addEventListener("change", () => {
                item.checked = !item.checked;
                FullListInstance.save();

                /**verandering kan hier alleen een klik zijn, dus dan draai je het om *. Verandering kan hier muisklik zijn of toetsenbord interactie*/
            })

            const label = document.createElement("label") as HTMLLabelElement
            label.htmlFor = item.id
            label.textContent = item.item
            li.append(label)

            const button = document.createElement("button") as HTMLButtonElement
            button.className = "button"
            button.textContent = "X"
            li.append(button)

            button.addEventListener('click', () => {
                FullListInstance.removeItem(item.id)
                this.render(FullListInstance)
                /** no loop cuz of event listener */
            })

            this.ul.append(li)
            


        })

      


    }


}

