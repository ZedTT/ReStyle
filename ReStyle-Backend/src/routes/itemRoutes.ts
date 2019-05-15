import { Express } from "express";
import { insertItemForUserWithId } from "../controllers/itemControllers";
import { TradeItemModel } from "../models/tradeItemModel";
// ? https://www.npmjs.com/package/multer
import multer from 'multer';
import { ItemCardInterface } from '../models/ItemCardInterface';

const DIR = './uploads/'; // contains images

// TODO comments needed
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
          return response.status(422).send({"error" : "an Error occured"})
        }
        // No error occured.
        
        // request.body should be of type AddedItemInterface
        let body = request.body

        // replace the photos array which is currently of type File with an array of the paths
        body.photos = [request.file.filename];
        // change the size to a number instead of a string
        body.size = parseInt(body.size);

        // create a new TradeItemModel object using the body
        let item = new TradeItemModel(body);

        // insert the new user into the DB
        insertItemForUserWithId(response, item);

      });


    })
    .get((request, response) => { // TODO: Replace with queries to the database
      const itemsToSend: ItemCardInterface[] = [
        {
          itemId: 'i',
          itemPicturePath: ['photo-1557884635385.jpeg'],
          bookmarked: false,
          userId: 'u',
          userName: 'test user1',
          userPicturePath: '/path',
          userVerified: true,
          userRating: 5,
          title: 'test shirt',
          size: 3,
          category: 'shirt',
          description: 'The server worked! lorem ipsum dolor sit amet',
        },
        {
          itemId: 'j',
          itemPicturePath: ['photo-1557884635385.jpeg'],
          bookmarked: true,
          userId: 'v',
          userName: 'test user2',
          userPicturePath: '/path',
          userVerified: false,
          userRating: 4,
          title: 'test pants',
          size: 2,
          category: 'pants',
          description: 'lorem ipsum dolor sit amet',
        }
      ]
      response.send(itemsToSend);
    });

}
export default itemRoutes;
