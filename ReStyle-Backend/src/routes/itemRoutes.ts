/**
 * A module that contains all the routes that are related to the items.
 */
import { Express } from "express";
import { insertItemForUserWithId, getItemsToDisplayForUserWithId, getTradeItemsForTheUserWithId, addHiddenItem } from '../controllers/itemControllers';
import { AddItemModel } from "../models/AddItemModel";
// ? https://www.npmjs.com/package/multer
import multer from 'multer';
import { createNewTradeRequest } from "../controllers/tradeControllers";

/**
 * A destination folder for uploaded images.
 */
const DIR = './uploads/';

/**
 * Configuration for multer, module used for uploading binary files.
 * Sets the destination directory and the file names for multer.
 * ? See https://www.npmjs.com/package/multer#diskstorage
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR)
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpeg')
  }
})

/**
 * Defines the type of upload multer would be doing, in our case, its a single file with the name 'photo'.
 */
const uploadImg = multer({ storage: storage }).single('photo');

/**
 * All the item routes to export.
 * 
 * @param app an instance of express module initialized in server.ts file.
 */
const itemRoutes = (app: Express) => {
  app.route("/api/items")
    /**
     * A get request to get all the items that should be displayed for a user.
     */
    .get((request, response) => {
      getItemsToDisplayForUserWithId(response, request.query.uid);
    })
    /**
     * A post request to add a new item to the database.
     */
    .post((request, response) => {
      uploadImg(request, response, function (err) {
        if (err) {
          console.log("Error while uploading an image: ", err);
          return response.status(422).send({ error: err.message })
        }
        // request.body should be of type AddedItemInterface
        let body = request.body
        // replace the photos array which is currently of type File with an array of the paths
        body.photos = [request.file.filename];
        // change the size to a number instead of a string
        body.size = parseInt(body.size);
        // create a new AddItemModel object using the body
        let item = new AddItemModel(body);

        // insert the new user into the DB
        insertItemForUserWithId(response, item);
      });
    });

  app.route('/api/tradeitems')
    /**
     * A get request to get all items that are owned by a specific user.
     */
    .get((request, response) => {
      const userId = request.query.uid
      if (userId !== null) {
        getTradeItemsForTheUserWithId(response, userId)
      } else {
        response.send({ error: `User id is: ${userId} , cannot be null` })
      }
    })
    /**
     * A post request to create a trade request by adding the items proposed for trade to the trade_request table.
     */
    .post((request, response) => {
      const tradeRequest = {
        requesterId: request.body.requesterId,
        notifiedUserId: request.body.notifiedUserId,
        requesterTradeItems: request.body.requesterTradeItems,
        notifiedUserTradeItems: request.body.notifiedUserTradeItems
      };
      createNewTradeRequest(response, tradeRequest)
    })

  app.route('/api/hideitems')
    // sends hidden item id to the db
    .post((request, response) => {
      // console.log(request.body.userId);
      // console.log(request.body.itemId);
      addHiddenItem(response, request.body.userId, request.body.itemId)
    })
}
export default itemRoutes;
