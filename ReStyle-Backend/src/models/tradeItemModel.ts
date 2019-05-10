import { TradeItemInterface } from "./TradeItemInterface";

export class TradeItemModel {

    item: TradeItemInterface

    constructor(item: TradeItemInterface){
        this.item = item
    }

    getPropertiesArray(): any[] {
        return [this.item.ownerId, this.item.description, this.item.gender,
        this.item.size, this.item.title, this.item.category, this.item.photos]
    }

    getJSON(): TradeItemInterface{
        return this.item
    }

    getSize(): number{
        return this.item.size
    }
}
