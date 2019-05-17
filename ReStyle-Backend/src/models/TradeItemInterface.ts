/**
 * An interface for TradeItem objects.
 * Used to send the items to frontend to display on the trade screen.
 */
export interface TradeItemInterface {
    itemId: number; // a unique id to identify this item
    picturePath: string[]; // an array of paths to the pictures that are displayed for this item
    title: string; // the name of the item
    description: string; // the description of the item
    size: number; // the size, 0: XS, 1: S, 2: M, 3: L, 4: XL
    category: string; // the category of the item
}
