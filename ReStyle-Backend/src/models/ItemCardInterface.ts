/**
 * A class for ItemCard objects.
 * Used for the cards on the scrolling page.
 */
export interface ItemCardInterface {
    itemId: string; // a unique id to identify this item
    itemPicturePath: string[]; // an array of paths to the pictures that are displayed for this item
    bookmarked: boolean; // true if the currently signed in user has bookmarked this trade item
    userId: string; // the id of the user that owns this item
    userName: string; // the name of the user
    userPicturePath: string; // the path to the profile picture of the user who owns the item
    userVerified: boolean; // indicates if the user is verified
    userRating: number; // the rating of the user who owns the item
    title: string; // the name of the item
    size: number; // the size, 0: XS, 1: S, 2: M, 3: L, 4: XL
    category: string; // the category that this item belongs to: "tops, bottoms, etc"
    description: string; // the description of the item
}
