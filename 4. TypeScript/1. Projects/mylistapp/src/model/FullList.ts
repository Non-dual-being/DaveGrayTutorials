import ListItem from './ListItem'

interface List {
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void
}

export default class FullList implements List {

    static instance: FullList = new FullList()

    private constructor (private _list: ListItem[] = []){}

    get list(): ListItem[] {
        return this._list
    }

    load(): void {
        const storedList: string | null = localStorage.getItem("myList")

        if (typeof storedList !== "string") return

        const parsedList: {_id:string, _item:string, _checked: boolean}[] = JSON.parse(storedList)

        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)

            FullList.instance.addItem(newListItem);
            //singleton instance
        })
    }

    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list))
    }

    clearList(): void {
        this._list = []
        this.save()
    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj)
        this.save()
    }

    removeItem(id: string): void {
        this._list = this._list.filter(listItem => listItem.id !== id)
        this.save()
    }





}

/**
 * een klasse kan als type fungeren en dat gaat het echt over de klasse
 */

/**
 * The private constructor is part of a singleton, meaning there will only be one instance of the class
 * Een Signleton is dus een klasse die een instantie van zichzelf aanmaakt
 * Dit wordt bereikt door een statisch instantie in combi met een private constructor
 * De prive constructor wil zeggen dat buiten de klasse zelf geen nieuwe Fullist aangemaakt kan worden
 * Alle verwijzingen naar de klasse verwijzen diezelfde instantie
 * 
 */
