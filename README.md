# IPop
This is my first project of 2nd year higher education training cycle of DAW (Web Development Application).

## Prerequisites

* [npm](https://www.npmjs.com/)
* [NodeJS](https://nodejs.org/es/)

## Installing

1. Clone the repo.
2. Go to backend folder and run 'npm install'.
3. Go to frontend folder and run 'npm install'.

## Starting up the app

Once you've installed the dependeces, follow this steps:

1. Open a terminal and run 'nodemon app.js' on backend folder.
2. Open other terminal and run 'ng serve' on frontend folder.

Following this steps, app is running on [localhost:4200](localhost:4200).

## Features

This application have the following modules.

Module | Description
:--- | :---
Home | Main page of the application where you can see a slider and all the categories
Shop | Show all the items where you can filter by categories and shipping (Items are ordered by karma, a points system from comments, valorations and likes).
Item Details | Here you can see more detailed item information, with an image slider. Where if you are logged, you can like the item, follow item's owner, comment and leave a valoration.
Search | This module is implemented in all the app where you can search for an item and it automatically redirects you to the shop.
Login | It allows you to register and login in the application, like the items and follow other users.
Profile | It allows you to change your user information.

## Technologies

### Frontend

The technology used for the client is [Angular](https://angular.io/) in his 12 version. 

* Implementations:
    * Modules, Shared and Core based
    * Auth:
        * Guards
        * Interceptors
        * JWT Token
        * Custom directives
    * Observables and subscriptions
    * Rxjs Subjects
    * ngx-toastr
    * ngx-infinite-scroll
    * Reactive forms

### Backend

The technology used for the server is [ExpressJS](https://expressjs.com/) in his 4.17.1 version.

* Implementations:
    * Mongoose:
        * Schemas (slug uniqueValidator)
        * Models methods
        * Controller
    * Middleware:
        * JWT Token

Server uses a [MongoDB](https://www.mongodb.com/) database.
    
