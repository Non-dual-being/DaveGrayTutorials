export interface Item {
    id: string,
    item: string,
    checked: boolean
}

export default class ListItem implements Item {
    constructor(
        private _id: string = '',
        private _item: string = '',
        private _checked: boolean = false
    ) {}

    /**
     * de constructor initialiseert de parameters direct als ze worden doorgegeven
     * de setter wordt hier niet gebruikt in dppr de constructor.
     * *de _ is een conventie en verwijst naar de private eigenschap van eigenschappen
     * * de _ maakt het mogelijk om id() te gebruiken als setter of getter en de_id voor de private eigenschap
     * ! als je zonder _ werkt dan verwijst de getter en setter en het codeblock oneiding naar zichzelf
     * de = in de parameter voorkomt undefined bij een initalisatie
     * de geters en setters komen pas in beeld nadat het object is geinitialiseert
     */

    get id(): string {
        return this._id
    }

    set id(id: string) {
        this._id = id;
    }

    get item(): string {
        return this._item;
    }

    set item(item: string) {
        this._item = item;
    }

    get checked() {
        return this._checked;  

    }

    set checked(checked: boolean) {
        this._checked = checked;
    }


}