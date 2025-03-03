import ListItem from "./ListItem";


interface List {
    list: ListItem[], 
    /** 
     * de interface verwacht hier dat list als eigenschap publiekelijk beschikbaar wordt gesteld 
     * hoewel hier in de klasse gebruikt wordtt gemaakt van private _list, maakt het via get list mogeljk om de lijst op te halen met FullList.instance.list op die manier ziet ts het als een eigenschap
     * */
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void

}

export default class FullList implements List{

    static instance: FullList = new FullList();

    private constructor (private _list: ListItem[] = []) {}
        /**
         * Private cuz we are going to create a single instance of the class, only one list: singleton behavior
         * Privat means no instance can be made outside of the class const mynewList = new Fullist() is not possible
         * This in combinatie with a static (belonging the class) instance of type Fullist makes a singleton possible
         * 
         */

    get list(): ListItem[] {
        return this._list;
        /**dit moet get list heten anders voldoe je niet aan de interface */
    }

    load(): void {
        const storedList: string | null = localStorage.getItem("myList");
        if (typeof storedList !== "string") return

        const parsedList: {_id: string, _item:string, _checked:boolean}[] = JSON.parse(storedList);

        parsedList.forEach(itemObj =>
        { 
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked);

            FullList.instance.addItem(newListItem);


        })
        
    }

    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list));
    }

    clearList(): void {
        this._list = [];
        this.save();
    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj);
        this.save();
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id);
        this.save();
    }









}