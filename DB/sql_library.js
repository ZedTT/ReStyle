/*
	Insert user into table
	with return to get the row back that was just created

	Array of values, fill with three values: 
	userID character(28) 
	swapScore Numeric(2,1), swapScore > 0 AND swapScore <= 5
	userName text
	userPhotoPath text

	Example:
	['l15CGtMJ5bSnEkRPpYEgyvVWeLt2', 5, 'Haejoon', null]
*/
export const insert_user_with_return = 
"INSERT INTO dev.restyle_user (userID, swapScore, userName, userPhotoPath)"+ 
"VALUES ($1, $2, $3, $4) RETURNING *"

/*
	Insert user into the user table
	without return of the row that was just created
	Array of values, fill with three values:

	userID character(28) 
	swapScore Numeric(2,1), swapScore > 0 AND swapScore <= 5
	userName text
	userPhotoPath text 

	Example:
	['l15CGtMJ5bSnEkRPpYEgyvVWeLt2',1, 'Haejoon', null]
*/
export const insert_user_no_return = 
"INSERT INTO dev.restyle_user (userID, userName, userPhotoPath)"+ 
"VALUES ($1, $2, $3)"

/*
	Get user based on user id from login 
	userID character(28)

	Example:
	['l15CGtMJ5bSnEkRPpYEgyvVWeLt2']

*/
export const get_user = 
"SELECT * FROM dev.restyle_user"+
"WHERE userID = '$1'"

/*
	Get user rating based on the userID 
	userID character(28)

	Example:
	['l15CGtMJ5bSnEkRPpYEgyvVWeLt2']
*/
export const get_user_rating =
"SELECT AVG(rating) FROM dev.rating" +
"WHERE userID = '$1'"

/*
	Insert item into item table
	with return to get the row back that was just created
	userID character(28)
	swapID integer
	description text
	gender text, Male, Female or Unisex
	size integer, (size > 0 AND size <= 4)
	title, category, photoPaths text

	Example:
	['15CGtMJ5bSnEkRPpYEgyvVWeLt2', null , 'description', 'Female', 1, 'title', 'category', ['path1','path2','path3]]
*/
export const insert_item_with_return =
"INSERT INTO dev.item (userID, swapID, description, gender, size, title, category, photoPaths)"+
"VALUES ($1, NULL, $2, $3, $4, $5, $6, $7::text[]) RETURNING *"

/*
	Insert item into item table without return 
	userID character(28)
	swapID integer
	description text
	gender text, Male, Female or Unisex
	size integer, (size > 0 AND size <= 4)
	title, category, photoPaths text

	Example:
	['15CGtMJ5bSnEkRPpYEgyvVWeLt2', null , 'description', 'Female', 1, 'title', 'category', ['path1','path2','path3]]
*/
export const insert_item_no_return =
"INSERT INTO dev.item (userID, swapID, description, gender, size, title, category, photoPaths)"+
"VALUES ($1, NULL, $2, $3, $4, $5, $6, $7::text[])"


/*
	Get item(s) for a specific user based on userID

	Example:
	[userID]
	['15CGtMJ5bSnEkRPpYEgyvVWeLt2']
*/
export const get_user_item =
"SELECT * FROM dev.item" +
"WHERE userID = '$1'"

/*
	Get item(s) for a specific user based on userID

	Example:
	[userID]
	['15CGtMJ5bSnEkRPpYEgyvVWeLt2']
*/
export const display_item =
"SELECT * FROM dev.item" +
"WHERE userID = '$1'"

/*
	Insert an item into the hide table
	This is for when the user no longer 
	wishes to see the item in their feed.
	A single user should have a single hide list.
	
	userID character(28)
	items should be initialized as an empty array

	Example:
	[userID, emptyArray]
	['15CGtMJ5bSnEkRPpYEgyvVWeLt2', {}]


	note may need to create empty array??? '{}'
*/
export const new_user_hide =
"INSERT INTO dev.hide (userID, items)" + 
"VALUES ('$1', null)" 

/*
	Get hide list for a specific user based on the userID
	userID character(28)

	Example:
	[userID]
	['15CGtMJ5bSnEkRPpYEgyvVWeLt2']
*/
export const get_hide_list =
"SELECT items FROM dev.hide" +
"WHERE userID = '$1'"

/*
	Add item to hide table for a specific user

	userID character(28)
	itemID integer

	Note array_append: append an element to the end of an array
	Note: items = array_append(items, $1) is the same as items = items + 1

	Example:
	[itemID, userID]
	[23,'15CGtMJ5bSnEkRPpYEgyvVWeLt2']
*/
export const add_hide =
"UPDATE dev.hide SET items = array_append(items, $1)" +
"WHERE userID = '$2'"


/*
	Remove an item from the hide table for a specific user

	userID character(28)
	itemID integer

	Note array_append: append an element to the end of an array

	Example:
	[itemID, userID]
	[23,'15CGtMJ5bSnEkRPpYEgyvVWeLt2']
*/
export const remove_hide =
"UPDATE dev.hide SET items = array_remove(items, $1)" +
"WHERE userID = '$2'"

/*
	Create new trade request with return

	requester_userID1 character(28)
	notfied_userID2 character(28)
	requester_itemArray1 an array of integers
	notified_itemArray2 an array of integers
	
	Example:
	[userID, userID, [item1, item2], [item1,item2]]

*/
export const new_trade_request_with_return =
"INSERT INTO dev.trade_request" +
"(requester_userID1, notified_userID2, requester_itemArray1, notified_itemArray2)" +
"VALUES ('$1', '$2', '$3::integer[]', '$4::integer[]') RETURNING *"

/*
	Create new trade request with no return

	requester_userID1 character(28)
	notfied_userID2 character(28)
	requester_itemArray1 an array of integers
	notified_itemArray2 an array of integers
	
	Example:
	[userID, userID, [item1, item2], [item1,item2]]

*/
export const new_trade_request_no_return =
"INSERT INTO dev.trade_request" +
"(requester_userID1, notified_userID2, requester_itemArray1, notified_itemArray2)" +
"VALUES ('$1', '$2', '$3::integer[]', '$4::integer[]')"

/*
	Display items that have never been swapped

	userID character(28)

	Example:
	['l15CGtMJ5bSnEkRPpYEgyvVWeLt2']
*/
export const display_neverbeen_swapped_items =
"SELECT * FROM dev.item" + 
"WHERE userID ='$1' AND swapID IS NULL"

