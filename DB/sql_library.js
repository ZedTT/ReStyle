/*
	Insert user into table
	with return to get the row back that was just created

	Array of values, fill with three values: 
	userID character(28) 
	userName text
	userPhotoPath text
*/
export const insert_user_with_return = 
'INSERT INTO dev.restyle_user (userID, userName, userPhotoPath)'+ 
'VALUES ($1, $2, $3) RETURNING *'

/*
	Insert user into the user table
	without return of the row that was just created
	Array of values, fill with three values:
	userID character(28) 
	userName text
	userPhotoPath text 
*/
export const insert_user_no_return = 
'INSERT INTO dev.restyle_user (userID, userName, userPhotoPath)'+ 
'VALUES ($1, $2, $3)'

/*
	Get user based on user id from login 
	
	userID character(28)

*/
export const get_user = 
'SELECT * FROM dev.restyle_user' +
'WHERE userID = '$1''

/*
	Insert item into item table
	with return to get the row back that was just created
	userID character(28)
	swapID integer
	description, gender text
	size integer
	title, category, photoPaths text
*/
export const insert_item_with_return =
'INSERT INTO dev.item (userID, swapID, description, gender, size, title, category, photoPaths)'+
'VALUES ($1, NULL, $2, $3, $4, $5, $6, $7::text[]) RETURNING *'

/*
	Insert a hidden item into the hide table
	
	userID character(28)
	items as an array of integers
*/
export const new_hide =
'INSERT INTO dev.hide (userID, items)' + 
'VALUES ('$1', '{$2}'), ('$3', '{$4}')'


/*
	Create new trade request

*/
export const new_trade_request =
'INSERT INTO dev.trade_request' +
'(requester_userID1, notified_userID2, requester_itemArray1, notified_itemArray2)' +
'VALUES ('l15CGtMJ5bSnEkRPpYEgyvVWeLt2', 'mD7ZT6d9P1bcrBsdQNRGqVaI30m2', '{1, 2, 3}', '{4}')'




/*

	SELECT AVG(Score) FROM rating  WHERE USERID = $1
*/