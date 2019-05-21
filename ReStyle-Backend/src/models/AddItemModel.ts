import { AddItemInterface } from "./AddItemInterface";

/**
 * A class to provide functionality for AddItemInterface.
 */
export class AddItemModel {

    item: AddItemInterface

    /**
     * Initializes an AddItemModel instance.
     * 
     * @param item an AddItemInterface object that contains all the needed properties.
     */
    constructor(item: AddItemInterface) {
        this.item = item
    }

    /**
     * Returns all the properties from AddItemInterface as an array
     * for convenient use as values for a database query. 
     */
    getPropertiesArray(): any[] {
        return [this.item.ownerId, this.item.description, this.item.gender,
        this.item.size, this.item.title, this.item.category, this.item.photos]
    }

    /**
     * Returns the size property of an item.
     */
    getSize(): number {
        return this.item.size
    }
}
