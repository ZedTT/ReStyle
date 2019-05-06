/**
 * A class for ItemCard objects that have just been recieved from the back end
 * Used for the cards on the scrolling page
 * The RAW version of this object does not contain the trade or pass attributes.
 */
export class ItemCard {
    itemId: string; // a unique id to identify this item
    picturePath: string[]; // an array of paths to the pictures that are displayed for this item
    bookmarked: boolean; // true if the currently signed in user has bookmarked this trade item
    userId: string; // the id of the user that owns this item
    userPicturePath: string; // the path to the profile picture of the user who owns the item
    verified: boolean; // indicates if the user is verified
    rating: number; // the rating of the user who owns the item
    title: string; // the name of the item
    size: number; // the size, 0: XS, 1: S, 2: M, 3: L, 4: XL
    category: string; // the category that this item belongs to: "tops, bottoms, etc"
    description: string; // the description of the item
}
