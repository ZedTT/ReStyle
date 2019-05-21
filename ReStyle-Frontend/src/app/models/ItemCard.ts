/**
 * A class for ItemCard objects
 * Used for the cards on the scrolling page
 */
export class ItemCard {
    itemId: number; // a unique id to identify this item
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
    /**
     * True if the card has been passed.
     * Only meant to be used by the front end for setting classes.
     * The back end should never need to send this and it should default to false.
     */
    pass: boolean;
    /**
     * True if the user has just clicked 'trade' on this card.
     * Used to set classes for css animations.
     * The back end should never need to send this and it should default to false.
     */
    trade: boolean;
}
