/*
	Author: Catreana Cunningham
	Date: April 30, 2019
*/

/*
	Testing inserting data into restyle user table

	Adding six users 
	Userids created in Firebase 

*/
INSERT INTO dev.restyle_user VALUES 
('l15CGtMJ5bSnEkRPpYEgyvVWeLt2', 4.8, 'testUser1', NULL),
('mD7ZT6d9P1bcrBsdQNRGqVaI30m2', 4.2, 'testUser2', NULL),
('Vc8UfAPEQkXR7ebwsAqAlaocWCC2', 2.2, 'testUser3', NULL),
('ieUNOnM2bFWrQBDanavf5ea6rJm1', 1.2, 'testUser4', NULL),
('tSMvjt39LyYI8eHHyz8UQ7iVsK32', 3.2, 'testUser5', NULL),
('fXz3AWKGPIVpDF8s8FsIr4WC9Vl1', 3.5, 'testUser6', NULL);



/*
	Testing inserting data into item table

	Items assigned to all six users
*/
INSERT INTO dev.item (userID, swapID , description, gender, size, title, category) 
VALUES  
('l15CGtMJ5bSnEkRPpYEgyvVWeLt2',NULL, 'testDescription', 'Female', 1, 'testTitle', 'shirt'),
('l15CGtMJ5bSnEkRPpYEgyvVWeLt2', NULL ,'testDescription', 'Male', 2, 'testTitle', 'jeans'),
('l15CGtMJ5bSnEkRPpYEgyvVWeLt2', NULL ,'testDescription', 'Unisex', 3, 'testTitle', 'dress'),
('mD7ZT6d9P1bcrBsdQNRGqVaI30m2', NULL ,'testDescription', 'Female', 4, 'testTitle', 'skirt'),
('mD7ZT6d9P1bcrBsdQNRGqVaI30m2', NULL ,'testDescription', 'Male', 1, 'testTitle', 'sweater'),
('mD7ZT6d9P1bcrBsdQNRGqVaI30m2', NULL ,'testDescription', 'Unisex', 2, 'testTitle', 'shirt'),
('Vc8UfAPEQkXR7ebwsAqAlaocWCC2', NULL ,'testDescription', 'Female', 3, 'testTitle', 'jeans'),
('Vc8UfAPEQkXR7ebwsAqAlaocWCC2', NULL ,'testDescription', 'Male', 4, 'testTitle', 'dress'),
('Vc8UfAPEQkXR7ebwsAqAlaocWCC2', NULL ,'testDescription', 'Unisex', 1, 'testTitle', 'skirt'),
('ieUNOnM2bFWrQBDanavf5ea6rJm1', NULL ,'testDescription', 'Female', 1, 'testTitle', 'sweater'),
('ieUNOnM2bFWrQBDanavf5ea6rJm1', NULL ,'testDescription', 'Male', 1, 'testTitle', 'shirt'),
('ieUNOnM2bFWrQBDanavf5ea6rJm1', NULL ,'testDescription', 'Unisex', 4, 'testTitle', 'jeans'),
('tSMvjt39LyYI8eHHyz8UQ7iVsK32', NULL ,'testDescription', 'Female', 1, 'testTitle', 'dress'),
('tSMvjt39LyYI8eHHyz8UQ7iVsK32', NULL ,'testDescription', 'Male', 1, 'testTitle', 'skirt'),
('tSMvjt39LyYI8eHHyz8UQ7iVsK32', NULL ,'testDescription', 'Unisex', 1, 'testTitle', 'sweater'),
('fXz3AWKGPIVpDF8s8FsIr4WC9Vl1', NULL ,'testDescription', 'Female', 4, 'testTitle', 'shirt'),
('fXz3AWKGPIVpDF8s8FsIr4WC9Vl1', NULL ,'testDescription', 'Male', 1, 'testTitle', 'jeans'),
('fXz3AWKGPIVpDF8s8FsIr4WC9Vl1', NULL ,'testDescription', 'Unisex', 2, 'testTitle', 'dress'),
('fXz3AWKGPIVpDF8s8FsIr4WC9Vl1', NULL ,'testDescription', 'Female', 3, 'testTitle', 'skirt'),
('fXz3AWKGPIVpDF8s8FsIr4WC9Vl1', NULL ,'testDescription', 'Male', 4, 'testTitle', 'sweater');

/*
	Testing inserting data into rating table

	Three ratings per user
*/
INSERT INTO dev.rating (userID, rating) VALUES 
('l15CGtMJ5bSnEkRPpYEgyvVWeLt2', 2.0),
('l15CGtMJ5bSnEkRPpYEgyvVWeLt2', 3.0),
('l15CGtMJ5bSnEkRPpYEgyvVWeLt2', 4.0),
('mD7ZT6d9P1bcrBsdQNRGqVaI30m2', 4.5),
('mD7ZT6d9P1bcrBsdQNRGqVaI30m2', 3.5),
('mD7ZT6d9P1bcrBsdQNRGqVaI30m2', 1.5),
('Vc8UfAPEQkXR7ebwsAqAlaocWCC2', 4.2),
('Vc8UfAPEQkXR7ebwsAqAlaocWCC2', 4.2),
('Vc8UfAPEQkXR7ebwsAqAlaocWCC2', 4.2),
('ieUNOnM2bFWrQBDanavf5ea6rJm1', 4.8),
('ieUNOnM2bFWrQBDanavf5ea6rJm1', 4.8),
('ieUNOnM2bFWrQBDanavf5ea6rJm1', 4.8),
('tSMvjt39LyYI8eHHyz8UQ7iVsK32', 1.5),
('tSMvjt39LyYI8eHHyz8UQ7iVsK32', 1.5),
('tSMvjt39LyYI8eHHyz8UQ7iVsK32', 1.5),
('fXz3AWKGPIVpDF8s8FsIr4WC9Vl1', 2.5),
('fXz3AWKGPIVpDF8s8FsIr4WC9Vl1', 2.5),
('fXz3AWKGPIVpDF8s8FsIr4WC9Vl1', 2.5);

/*
	Testing inserting data into trade request table

	User1 wants to request a trade of their items 1,2,3 for user2 item 4
*/
INSERT INTO dev.trade_request 
(requester_userID1, notified_userID2, requester_itemArray1, notified_itemArray2, status) 
VALUES 
('l15CGtMJ5bSnEkRPpYEgyvVWeLt2', 'mD7ZT6d9P1bcrBsdQNRGqVaI30m2', '{1, 2, 3}', '{4}', NULL);

/*
	Testing inserting data into contact details table

	Contact details added to all six users
*/
INSERT INTO dev.contact_details (userID, email, phoneNumber, preferredMethodOfContact) VALUES 
('l15CGtMJ5bSnEkRPpYEgyvVWeLt2', 'testuser1@test.aa', '6041234567', NULL),
('mD7ZT6d9P1bcrBsdQNRGqVaI30m2', 'testuser2@test.aa', '6041234567', NULL),
('Vc8UfAPEQkXR7ebwsAqAlaocWCC2', 'testuser3@test.aa', '6041234567', NULL),
('ieUNOnM2bFWrQBDanavf5ea6rJm1', 'testuser4@test.aa', '6041234567', NULL),
('tSMvjt39LyYI8eHHyz8UQ7iVsK32', 'testuser5@test.aa', '6041234567', NULL),
('fXz3AWKGPIVpDF8s8FsIr4WC9Vl1', 'testuser6@test.aa', '6041234567', NULL);

/*
	Testing inserting data into address table

	Addresses for all six dummy users
*/
INSERT INTO dev.address (userID, unit, street, city, postalCode) VALUES 
('l15CGtMJ5bSnEkRPpYEgyvVWeLt2', 'testUnit', 'testStreet', 'Vancouver', 'testPostalCode'),
('mD7ZT6d9P1bcrBsdQNRGqVaI30m2', 'testUnit', 'testStreet', 'Vancouver', 'testPostalCode'),
('Vc8UfAPEQkXR7ebwsAqAlaocWCC2', 'testUnit', 'testStreet', 'Vancouver', 'testPostalCode'),
('ieUNOnM2bFWrQBDanavf5ea6rJm1', 'testUnit', 'testStreet', 'Vancouver', 'testPostalCode'),
('tSMvjt39LyYI8eHHyz8UQ7iVsK32', 'testUnit', 'testStreet', 'Vancouver', 'testPostalCode'),
('fXz3AWKGPIVpDF8s8FsIr4WC9Vl1', 'testUnit', 'testStreet', 'Vancouver', 'testPostalCode');



/*
	Testing inserting data into swap table

	User1 and user2
*/
INSERT INTO dev.swap  (userID1, userID2)
VALUES  ('l15CGtMJ5bSnEkRPpYEgyvVWeLt2','mD7ZT6d9P1bcrBsdQNRGqVaI30m2');

/*
	Testing inserting data into hide table

	User1 wants to hide items 4,14,17
	User2 wants to hide items 10,11,12
*/
INSERT INTO dev.hide 
(userID, items) 
VALUES 
('l15CGtMJ5bSnEkRPpYEgyvVWeLt2', '{4, 14, 17}'),
('mD7ZT6d9P1bcrBsdQNRGqVaI30m2', '{10, 11, 12}');


