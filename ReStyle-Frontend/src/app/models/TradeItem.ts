// a class for TradeItem objects
export class TradeItem {
    itemId: string; // a unique id to identify this item
    picturePath: string[]; // an array of paths to the pictures that are displayed for this item
    bookmarked: boolean; // true if the currently signed in user has bookmarked this trade item
    userId: string; // the id of the user that owns this item
    userPicturePath: string; // the path to the profile picture of the user who owns the item
    verified: boolean; // indicates if the user is verified
    rating: number; // the rating of the user who owns the item
    title: string; // the name of the item
    size: number; // the size, 0: XS, 1: S, 2: M, 3: L, 4: XL
    category: string; // the brand that manufactured this item
    description: string; // the description of the item
}