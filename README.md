
# Angular 2 Messaging Application

Angular 2 Messaging App is an elegant web application built with Angular 2 Framework (Version 5), MySQL Database, and NodeJS/ExpressJS. Some application features include Web Sockets for real-time Server-Client communication, User Authentication and Authorization with JSON Web Tokens and MySQL Database Session Storage, Server-side Caching using Redis, Custom Angular Flash Messages (and all custom styling in application), and more! Users can send each other messages, save drafts, and trigger live updates when receiving new messages. This Web Application features a RESTful API built on NodeJS and ExpressJS. It is also optimized for both desktop and mobile devices. For a demo of this application, visit: https://angular2-msg-app-3z24.herokuapp.com

## Screenshots

![mobile-screenshot](https://i.imgur.com/P2OSFPK.png)
![new-msg-screenshot](https://i.imgur.com/4GLGAWk.png)
![mobile-inbox](https://i.imgur.com/ikLtgLC.png)
![compose-screenshot](https://i.imgur.com/tLVrKyb.png)

## Getting Started

### Prerequisites
The following items are required for the Angular 2 Messaging App:

 - [NodeJS](https://nodejs.org/en/)
 - [MySQL Database](https://www.mysql.com/) (or any other method of connecting to a MySQL Database, such as XAMP, WAMP, etc.)
 - [Angular 2 Command Line Interface](https://cli.angular.io/)

### Installing
To install the application, you only need to run the following command inside of the root directory:

    $ npm install
    
### Configuration

 - Database 
	- To change database settings, go to: `root/server/config/db.js`. (You must change settings for the *options* variable, and *startUpConnection* variable).

### Development Server
Before starting the app, you must have an active MySQL Connection running. To start up a development instance, navigate to the root directory in your command line interface and run:

    $ ng serve

This will create a development instance located at http://localhost:4200. Then, you must start the backend NodeJS server. In a separate terminal, run the following command in the root directory:

    $ node server/index.js

This will create a server instance located at http://localhost:8080.

Once both scripts have finished running, the application can be accessed at http://localhost:4200.

### Production Build
For Windows users, you must go to the file `root/package.json` and change the following line:
from:

    "start": "NODE_ENV=production node server/index.js"

to:

    "start": "SET NODE_ENV=production && node server/index.js"
*(Alternatively, you can manually set your NodeJS environment to production and then run the second command).*  

To start a production build, run the following command in the root directory:

    $ npm run build
    $ npm start

Once the script has finished running, the application can be accessed at http://localhost:8080.

### FAQ
For questions, concerns, or issues starting the application, I can be contacted at:
admin@davidacosta.com
