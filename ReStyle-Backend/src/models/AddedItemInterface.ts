/**
 * An Item that was just added on the front end.
 * Very similar to TradeItemInterface except that the photos array is an array of type any (Used for form data)
 * In TradeItemInterface, the photos array is an array of strings that represent the url to the images
 * ? Used in itemRoutes.ts when getting items from the front end.
 * * There is another model in the front end that is identical to this with the same name
 */
 export interface AddedItemInterface {
    ownerId: string; // The id of the user that just added this item
    description: string; // The description of the item
    gender: string; // The gender of the item, not of the user. If a man adds a dress, the item will still have a gender of female. (Probably)
    size: number; // The size as a number, 0: XS, 1: S, 2: M, 3: L, 4: XL
    title: string; // The title of the item
    category: string; // The category that the item belongs to (e.g. shirts)
    photos: any[]; // An array of images form data
}
