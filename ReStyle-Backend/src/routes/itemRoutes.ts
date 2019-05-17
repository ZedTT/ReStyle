import { Express } from "express";
import { insertItemForUserWithId, getItemsToDisplayForUserWithId, getTradeItemsForTheUserWithId } from '../controllers/itemControllers';
import { AddItemModel } from "../models/AddItemModel";
// ? https://www.npmjs.com/package/multer
import multer from 'multer';

const DIR = './uploads/'; // contains images

/**
 * Adding code to set the file names for multer
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

//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
const uploadImg = multer({ storage: storage }).single('photo');

const itemRoutes = (app: Express) => {
  app
    .route("/api/items")
    // to add a new item to the db
    .post((request, response) => {

      console.log("Inside adding new item route");

      uploadImg(request, response, function (err) {
        if (err) {
          // An error occurred when uploading
          console.log(err);
          return response.status(422).send({ "error": "an Error occured" })
        }
        // No error occured.

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

    })
    .get((request, response) => {
      getItemsToDisplayForUserWithId(response, request.query.uid);
    });

  app.route('/api/tradeitems')
    // to get all items that are owned by a specific user
    .get((request, response) => {
      getTradeItemsForTheUserWithId(response, request.query.uid)
    })
}
export default itemRoutes;
