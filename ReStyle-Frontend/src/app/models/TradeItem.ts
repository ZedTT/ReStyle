// a class for TradeItem objects
export class TradeItem {
    itemId: string; // a unique id to identify this item
    userId: string; // the id of the user that owns this item
    title: string; // the name of the item
    size: number; // the size, XS, S, M, L, XL
    brand: string; // the brand that manufactured this item
    description: string; // the description of the item
    picturePath: string; // a path to the picture that is displayed for this item
}