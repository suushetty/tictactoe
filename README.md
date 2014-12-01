Tic-Tac-Toe
============

**Welcome to the TicTacToe**

This project lets you play a simple game of tic-tac-toe between two people.  Players can either use the keypad(1-9) or the mouse to play

The folders\files are laid out as follows
> public
>  
> routes
>
> views
>
> package.json
>
> app.js

###public###
This has the web client's javascript files, image files and stylesheets. There are two main javascript files in the javascripts/feature folder.
* gameinit.js - This handles creation & initialization of all the game variables and state
* gameplay.js - This handles player's turns & updating the DOM as the game proceeds

###views###
This contains jade files that are responsible for the html display
*layout.jade - This has the basic header and loads all the scripts required by the app
*index.jade - Displays some text and links to gameContent
*gameContent.jade - This has all the main html content to support the tic tac toe game

###package.json###
This has all the packages required by node to run this app

###app.js###
This is responsible for setting up the webserver

How to Run
----------
* Installation
> npm install
* Server
> npm start
