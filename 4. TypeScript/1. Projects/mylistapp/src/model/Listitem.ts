export interface Item {
    id: string,
    item: string,
    checked: boolean
  }

  export default class ListItem implements Item {
    constructor(
        private _id: string = '',
        private _item: string = '',
        private _checked: boolean = false;
    ){}

    get id(): string {
      return this._id;
    }
    set id(id: string) {
      this._id = id;
    }

    get item(): string {
      return this._item;
    }
    set item (item: string) {
      this._item = item;
    }

    get checked(): boolean {
      return this._checked
    }
    set checked(checked: boolean) {
      this._checked = checked
    }

  }

  /**
   * the _ in the constructor is to prevent naming diffculties with setter and getter
   * the _ is also a way to indicated a propery is private
   * In the constructor you dont need to wirte this._id = _id cuz of a feature called param propertys
   * Param props enable you to get acces without being explicit 
   * Becauze you write private before the param you ts automatically generates a class prop out of it
   * The method get id ensures that the contract with the interface is satisfied, this is becauze the public method is seen as a property
   * The get and setter are implicit public wihtout explicitly telling it so
   * 
   */

  