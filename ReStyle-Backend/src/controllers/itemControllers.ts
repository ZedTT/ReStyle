import { query } from "../db/dbInit";
import { insert_item_with_return, get_user_item, display_item } from "../db/sql_library";
import { Response } from "express";
import { TradeItemModel } from "../models/tradeItemModel";
import { ItemCardInterface } from '../models/ItemCardInterface';

// insert dummy item to the db
export function dummy_insertItemForUserWithId() {
  query(
    insert_item_with_return,
    [
      "l15CGtMJ5bSnEkRPpYEgyvVWeLt2",
      "description",
      "Female",
      1,
      "title",
      "category",
      ["path1", "path2", "path3"]
    ],
    (err, res) => {
      if (err) {
        console.log("Error:", err);
      } else {
        console.log("Inside insert_item_with_return", res);
      }
    }
  );
}

// insert an item to the db using the user uid
export function insertItemForUserWithId(
  response: Response,
  item: TradeItemModel
) {
  if (item.getSize() < 0 || item.getSize() > 4) {
    response.send({
      error:
        "Invalid size. Expected from 0 to 4 included. Actual: " + item.getSize()
    });
  } else {
    query(insert_item_with_return, item.getPropertiesArray(), (err, res) => {
      if (err) {
        console.log("Error:", err);
      } else {
        response.send({ message: "New item was added" });
      }
    });
  }
}

// get all items that are owned by a user with id
export function getItemsForUserWithId(response: Response, userId: string) {
  query(get_user_item, [userId], (err, res) => {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log("Inside get_user_item", res.rows);
      response.send({ result: res.rows });
    }
  });
}

// get items to display on home page for a user with a specific id who is signed in at the current moment
// if no user is logged in, userId is expected to be null and all items that exist in the database will be returned
export function getItemsToDisplayForUserWithId(response: Response, userId: string) {
  query(display_item, [userId], (err, res) => {
    if (err) {
      console.log("Error inside getItemsToDisplayForUserWithId:", err);
      response.send({ error: err.message });
    } else {
      console.log("Inside getItemsToDisplayForUserWithId", res.rows);

      let itemsToSend: ItemCardInterface[] = [];
      for (let itemRecord of res.rows) {
        itemsToSend.push({
          itemId: itemRecord.itemID,
          itemPicturePath: itemRecord.photoPaths,
          bookmarked: false, //hardcoded for now, needs another query
          userId: itemRecord.userID,
          userName: 'test user1', //hardcoded for now, needs another query
          userPicturePath: '/path', //hardcoded for now, needs another query
          userVerified: true, //hardcoded, doesn't exist in db for now
          userRating: 5, //rating of the owner of the item
          title: itemRecord.title,
          size: itemRecord.size,
          category: itemRecord.category,
          description: itemRecord.description
        })
      }
      response.send(itemsToSend);
    }
  })
}
