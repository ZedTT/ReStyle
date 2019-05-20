import { AddItemInterface } from "./AddItemInterface";

export class AddItemModel {

    item: AddItemInterface

    constructor(item: AddItemInterface){
        this.item = item
    }

    getPropertiesArray(): any[] {
        return [this.item.ownerId, this.item.description, this.item.gender,
        this.item.size, this.item.title, this.item.category, this.item.photos]
    }

    getJSON(): AddItemInterface{
        return this.item
    }

    getSize(): number{
        return this.item.size
    }
}
