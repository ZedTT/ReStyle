/**
 * A class for TradeRequest objects.
 * Used for the requests on the inbox screen.
 */
export class TradeRequest {
    // * Request info
    tradeRequestId: number; // a unique id to identify this request.

    // * Requester's info
    requesterId: string; // the uid of the user who initialized the trade.
    requesterUserPicturePath: string; // a string of the path of the profile photo of the user who initialized the trade. 
    requesterName: string; // a string representing the name of the user who initialized the trade.

    // * Arrays of picture pahts to the items pictures
    // an array of paths to the pictures that represent the items that belong to the user with whome the trade was initialized.
    notifiedItemsPicturePath: string[];
    // an array of paths to the pictures that represent the items that belong to the user who initialized the trade.
    requesterItemsPicturePath: string[];
}
