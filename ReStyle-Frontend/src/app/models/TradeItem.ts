/**
 * A class for TradeItem objects.
 * Used for the items on the trade screen.
 */
export class TradeItem {
    itemId: string; // a unique id to identify this item
    picturePath: string[]; // an array of paths to the pictures that are displayed for this item
    title: string; // the name of the item
    description: string; // the description of the item
    size: number; // the size, 0: XS, 1: S, 2: M, 3: L, 4: XL
    caterory: string; // the category of the item
    /**
     * The back end will not need to send selected
     */
    selected: boolean; // keeps track of if the item is selected for trading or not
}
