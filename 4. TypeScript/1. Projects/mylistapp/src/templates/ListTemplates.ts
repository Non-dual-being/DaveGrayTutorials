import FullList from '../model/FullList'

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void
}

export default class ListTemplate implements DOMList {
    ul: HTMLUListElement; //class propery so no const or let
    
    static instance: ListTemplate = new ListTemplate();
    
    private constructor(){
        this.ul = document.getElementById("listItems") as HTMLUListElement
    }

    clear(): void {
        this.ul.innerHTML = '';
    }

    render(fullList: FullList): void {
        this.clear() // this is the clear method of the class

        fullList.list.forEach((item) => {
            const myLi = document.createElement("li") as HTMLLIElement;
            myLi.className = "item";
            const myCheckBox = document.createElement("input") as HTMLInputElement;
            myCheckBox.type = "checkbox";
            myCheckBox.id = item.id;
            myCheckBox.tabIndex = 0;
            myCheckBox.checked = item.checked;
            myCheckBox.addEventListener("change", () =>{
                item.checked = !item.checked
                fullList.save();
            })
            const myLabel = document.createElement("label") as HTMLLabelElement;
            myLabel.htmlFor = item.id;
            myLabel.textContent = item.item;
            const myButton = document.createElement("button") as HTMLButtonElement;
            myButton.className = "button";
            myButton.textContent = "X";
            myButton.addEventListener("click", ()=> {
                fullList.removeItem(item.id);
                this.render(fullList);
            })
            myLi.appendChild(myCheckBox);
            myLi.appendChild(myLabel);
            myLi.appendChild(myButton);
            this.ul.appendChild(myLi);
        })
     
    }

}