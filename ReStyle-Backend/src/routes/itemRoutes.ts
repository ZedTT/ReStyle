import { Express } from "express";
import { insertItemForUserWithId } from "../controllers/itemControllers";
import { TradeItemModel } from "../models/tradeItemModel";

const itemRoutes = (app: Express) => {
  app
    .route("/api/items")
    // to add a new item to the db
    .post((request, response) => {
      console.log("Inside adding new item route, request body: \n", request.body);

      // request.body should be of type AddedItemInterface
      let body = request.body

      console.log("\n\nBody: \n");
      console.log(body);
      console.log("\n\nPhotos: \n");
      console.log(body.photos);

      // const photos: File[] = body.photos;
      // log the first file in the photos array
      // console.log("The file: ");
      // console.log(photos[0]);

      // replace the photos array which is currently of type File with an empty array
      // this empty array will be able to be used as an array of strings for the TradeItemModel
      body.photos = [];

      // log the body after changing the array to empty
      console.log("\n\nNew body: \n")
      console.log(body);
      console.log("\n\n ========== \n\n");

      let item = new TradeItemModel(body);

      // insert the new user into the DB
      insertItemForUserWithId(response, item);
    });
};

export default itemRoutes;
