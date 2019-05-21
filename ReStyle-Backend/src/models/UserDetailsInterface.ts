/**
 * A UserDetailsInterface interface represents the user details data 
 * that can be stored and retreived to/from database.
 */
export interface UserDetailsInterface {
  userId: string; // id of the user whose details are retreived or are going to be changed
  displayname: string; // display name
  phone: string; // phone number
  email: string; // email address (is taken initially from Firebase Authentification API)
  postalcode: string; // postalcode
  city: string; // city
  preferredContact: string; // preferred method of contact, can be either 'Phone' or 'Email'
  profilePic: any; // path to the profile photo
}

