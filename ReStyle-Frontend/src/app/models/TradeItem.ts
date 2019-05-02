// a class for TradeItem objects
export class TradeItem {
    itemId: string; // a unique id to identify this item
    userId: string; // the id of the user that owns this item
    title: string; // the name of the item
    size: number; // the size, 0: XS, 1: S, 2: M, 3: L, 4: XL
    brand: string; // the brand that manufactured this item
    description: string; // the description of the item
    picturePath: string[]; // an array of paths to the pictures that are displayed for this item
}