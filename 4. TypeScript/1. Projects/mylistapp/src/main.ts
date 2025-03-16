import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplates'

const initApp = (): void => {
    const fullList = FullList.instance
    const template = ListTemplate.instance

    const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement;

    itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
        event.preventDefault()
        const input = document.getElementById("newItem") as HTMLInputElement;
        if (typeof(input.value) === "string" && input.value.trim().length ){
            const newEntryText: string = input.value.trim();
            let id: string;
            if (fullList.list.length){
                id = (Math.max(...fullList.list.map(item => parseInt(item.id, 10))) + 1).toString();
            } else {
                id = "1";
            }

            const newItem = new ListItem(id, newEntryText, false);
            fullList.addItem(newItem);
            template.render(fullList);
           
        }

        

         
    })

    const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement;

    clearItems.addEventListener("click", (): void => {
        //data clear
        fullList.clearList();
        //display
        template.clear()
    })
    fullList.load();
    template.render(fullList);



}

document.addEventListener("DOMContentLoaded", initApp)