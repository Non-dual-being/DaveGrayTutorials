export interface Item {
    id: string,
    item: string,
    checked: boolean
  }

  export default class ListItem implements Item {
    constructor(
        public id: string,
        public item: string,
        public checked: boolean
    ){
        this.id = id;
        this.item = item;
        this.checked = checked;
    }
    

  }


  