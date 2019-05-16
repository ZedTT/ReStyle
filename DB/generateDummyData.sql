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
('l15CGtMJ5bSnEkRPpYEgyvVWeLt2', 5.0, 'testUser1', NULL),
('mD7ZT6d9P1bcrBsdQNRGqVaI30m2', 5.0, 'testUser2', NULL),
('Vc8UfAPEQkXR7ebwsAqAlaocWCC2', 5.0, 'testUser3', NULL),
('ieUNOnM2bFWrQBDanavf5ea6rJm1', 5.0, 'testUser4', NULL),
('tSMvjt39LyYI8eHHyz8UQ7iVsK32', 5.0, 'testUser5', NULL),
('fXz3AWKGPIVpDF8s8FsIr4WC9Vl1', 5.0, 'testUser6', NULL);



/*
	Testing inserting data into item table

	Items assigned to all six users
*/
INSERT INTO dev.item (userID, swapID , description, gender, size, title, category, photoPaths) 
VALUES  
('l15CGtMJ5bSnEkRPpYEgyvVWeLt2',NULL, 'Female Dress', 'Female', 1, 'Female Dress', 'Dress','{dress_female_03.jpg}'),
('l15CGtMJ5bSnEkRPpYEgyvVWeLt2', NULL ,'Female Dress', 'Female', 2, 'Female Dress', 'Dress', '{dress_female_04.jpg}'),
('l15CGtMJ5bSnEkRPpYEgyvVWeLt2', NULL ,'Dress Male', 'Male', 3, 'Dress Male', 'Dress', '{dress_male_01.jpg}'),
('mD7ZT6d9P1bcrBsdQNRGqVaI30m2', NULL ,'Dress Male', 'Male', 4, 'Dress Male', 'Dress', '{dress_male_02.jpg}'),
('mD7ZT6d9P1bcrBsdQNRGqVaI30m2', NULL ,'Dress Unisex', 'Unisex', 1, 'Dress Unisex', 'Dress', '{dress_unisex_05.jpg}'),
('mD7ZT6d9P1bcrBsdQNRGqVaI30m2', NULL ,'Female Jeans', 'Female', 2, 'Female Jeans', 'Pants', '{jeans_female_03.jpg}'),
('Vc8UfAPEQkXR7ebwsAqAlaocWCC2', NULL ,'Female Jeans', 'Female', 3, 'Female Jeans', 'Pants', '{jeans_female_04.jpg}'),
('Vc8UfAPEQkXR7ebwsAqAlaocWCC2', NULL ,'Male Jeans', 'Male', 4, 'Male Jeans', 'Pants', '{jeans_male_01jpg}'),
('Vc8UfAPEQkXR7ebwsAqAlaocWCC2', NULL ,'Male Jeans', 'Male', 1, 'Male Jeans', 'Pants', '{jeans_male_02.jpg}'),
('ieUNOnM2bFWrQBDanavf5ea6rJm1', NULL ,'Unisex Jeans', 'Unisex', 1, 'Unisex Jeans', 'Pants', '{jeans_unisex_05.jpg}'),
('ieUNOnM2bFWrQBDanavf5ea6rJm1', NULL ,'Shirt Female', 'Female', 1, 'Shirt Female', 'Shirts', '{shirt_female_03.jpg}'),
('ieUNOnM2bFWrQBDanavf5ea6rJm1', NULL ,'Shirt Female', 'Female', 4, 'Shirt Female', 'Shirts', '{shirt_female_04.jpg}'),
('tSMvjt39LyYI8eHHyz8UQ7iVsK32', NULL ,'Shirt Male', 'Male', 1, 'Shirt Male', 'Shirts', '{shirt_male_01.jpg}'),
('tSMvjt39LyYI8eHHyz8UQ7iVsK32', NULL ,'Shirt Male', 'Male', 1, 'Shirt Male', 'Shirts', '{shirt_male_02.jpg}'),
('tSMvjt39LyYI8eHHyz8UQ7iVsK32', NULL ,'Dress Unisex', 'Unisex', 1, 'Dress Unisex', 'Dress', '{dress_unisex_05.jpg}'),
('fXz3AWKGPIVpDF8s8FsIr4WC9Vl1', NULL ,'Skirt Female', 'Female', 4, 'Skirt Female', 'Skirt', '{skirt_female_03.jpg}'),
('fXz3AWKGPIVpDF8s8FsIr4WC9Vl1', NULL ,'Skirt Female', 'Female', 1, 'Skirt Female', 'Skirt', '{skirt_female_04.jpg}'),
('fXz3AWKGPIVpDF8s8FsIr4WC9Vl1', NULL ,'Unisex Skirt', 'Unisex', 2, 'Unisex Skirt', 'Skirt', '{skirt_unisex_05.jpg}'),
('fXz3AWKGPIVpDF8s8FsIr4WC9Vl1', NULL ,'Female Sweater', 'Female', 3, 'Female Sweater', 'Outerwear', '{sweater_female_04.jpg}'),
('fXz3AWKGPIVpDF8s8FsIr4WC9Vl1', NULL ,'Female Sweater', 'Female', 4, 'Female Sweater', 'Outerwear', '{sweater_female_05.jpg}');

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


