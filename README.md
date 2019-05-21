## BCIT CST Program COMP 2930 Project 

about BCIT : https://www.bcit.ca/

about BCIT CST: https://www.bcit.ca/study/programs/5500dipma



# ReStyle

Deployed website URL: [http://restyle-0510.azurewebsites.net/](http://restyle-0510.azurewebsites.net/)

Our web application, ReStyle allows users to easily trade clothes with other users. It promotes sharing and reusing of clothes that otherwise would be disposed. Just by using the app for swapping users are unconsciously helping the environment.

Our application solves the problem that arises when people wish to refresh their wardrobe, without purchasing new items of clothing. For fashion lovers who like to update their closet on a consistent basis but want to minimize their environmental impact and save money, our app will be provide a great solution.

- About us : http://restyle-0510.azurewebsites.net/aboutus



### Created by

- Catreana Cunningham - [🔗 LinkedIn](https://www.linkedin.com/in/catreana-cunningham-07ab4657/)
- Haejoon Choi - [🔗 LinkedIn](https://www.linkedin.com/in/haejoonchoi/)
- Kate Bozhenko - [🔗 LinkedIn](https://www.linkedin.com/in/kateryna-bozhenko-842a57a7/)
- Prateek Girdhar
- Zack Taylor



## Dependencies

- [Node.js](https://nodejs.org/en/): ReStyle is built on top of the Node.js JavaScript runtime.

- [Angular](https://angular.io/): ReStyle is built on top of the Angular framework.

- [Angular Material](https://material.angular.io/): UI component library for buttons and icons.

- [Bootstrap](https://getbootstrap.com/): ReStyle is partly styled with Bootstrap.

- [Firebase](https://firebase.google.com/): Authentication of ReStyle is using Firebase framework.

  

### Node modules

- express
- multer
- postgres-node
- And many other modules from [node package manager](https://www.npmjs.com/)… (you can check `package.json` for more)



## Language

- [TypeScript](https://www.typescriptlang.org/)

  - Angular is based on TypeScript language. 
  - We also wrote our node server in TypeScript. 

- [PostgreSQL](https://www.postgresql.org/)

- JavaScript

- [Sass](https://sass-lang.com/)

- HTML

  

## Hosting

- [Azure Web Services](https://azure.microsoft.com/en-ca/free/cloud-services/search/?&OCID=AID719803_SEM_zBVKwwIG&lnkd=Google_Azure_Brand&dclid=CjgKEAjww47nBRC_7umJ2YDDvHMSJADGx9nAxdf-mA1TAZfRV5eIgm5Az3g1YU_MxFFW81_Z00o5b_D_BwE)
  - We deployed our app on Azure.
  - PostgreSQL server is also deployed on Azure.



## Build

- There is a dbKey.ts / .js file that encapsulates a key to get data from the Azure database. You need to ask developers to get the file.



### Install dependencies

We recommend you to install [npm-install-missing](https://www.npmjs.com/package/npm-install-missing) module from node package manager for installing dependencies. In order to use the command `npm-install-missing`, you have to install "npm-install-missing" module globally.

```shell
$ npm install --global npm-install-missing
```

if you encounter authorization problem in Mac, you can use sudo command.

```shell
$ sudo npm install --global npm-install-missing
```



We have "ReStyle-Frontend" and "ReStyle-Backend" directories and you need to install all the dependencies for both of the directories seperately. 

##### Back-end 

```shell
$ cd /ReStyle-Backend
$ npm-install-missing
```

##### Front-end

```shell
$ cd ../ReStyle-Frontend
$ npm-install-missing
```



### Run the server using node

Then, you can build front-end and back-end consecutively, and start the server!

##### Terminal / Command Prompt

```shell
$ npm run startall
```

The `startall` script is written in `package.json` file to make the whole process convenient.