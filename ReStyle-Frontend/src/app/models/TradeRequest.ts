/**
 * A class for TradeRequest objects.
 * Used for the requests on the inbox screen.
 */
export class TradeRequest {
    // * Request info
    // ! blame back end people for the naming convention here
    // tslint:disable-next-line: variable-name
    trade_requestid: number; // a unique id to identify this request.

    // * Requester's info
    requesterid: string; // the uid of the user who initialized the trade.
    requesterpicturepath: string; // a string of the path of the profile photo of the user who initialized the trade.
    requesterusername: string; // a string representing the name of the user who initialized the trade.

    // * Arrays of picture pahts to the items pictures
    // an array of paths to the pictures that represent the items that belong to the user with whome the trade was initialized.
    requesteeitemphotos: string[];
    // an array of paths to the pictures that represent the items that belong to the user who initialized the trade.
    requesteritemphotos: string[];

    // Sample data from backend explaining naming convention
    //     trade_requestid: 8,
    //     requesterid: 'QqJVsgMeiVcF1bW0x9b28sHK9fh2',
    //     requesterpicturepath: 'zack_avatar.jpg',
    //     requesterusername: 'Zack',
    //     requesteritemphotos: [ [Array], [Array], [Array] ],
    //     requesteeitemphotos

}

