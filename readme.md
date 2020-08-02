# Corey's Portfolio Project for CS 290 
Name: Corey Cunningham
Class: CS 290 
Date: 08-02-2020 

## About 
This project is a fictious website for a bakery that also includes a blog. It uses vanilla JS, HTML, CSS, NodeJS, and Sqlite. All images used on this website were taken from pexels.com and are not my own original photos. 

## To run this site 
This project was built using node v13.3.0
To install the necessary dependencies please run `npm install`
To run the development server run `npm start` 
By default the website will be served on localhost:3000 

## To see the site live:
https://nameless-ravine-87631.herokuapp.com

## Routes 

"/": 
    The home page of the website 
    
    Features a custom built carousel using JS that automatically flips images every 1000ms, stopping when the user hovers over the carousel and restarting when the mouse leaves the carousel. Left and right arrows allow the user to advance left or right 

    The latest blog posts are displayed on the homepage with links to each post 

    The header features links to social media 


"/about":
    A fictious about page that contains images and scrollbox 

"/menu":
    A fictious menu that allows users to download a pdf version of the menu 

"/location":
    Shows the location of the bakery using google map API

    Allows the users to simulate sending an email through a form that uses the Fetch API to send data to the server at the endpoint "/contact"

"blog/:id":
    Displays blog posts that the owner of the website would have uploaded 
    
    Uses an HTML template that is filled by JavaScript after retreiving data from the server using a get request to "/blog/:id"

    Client side JavaScript parses the url to get the id, sends a request to the server to get the blog entry from the database, which is returned to the client and displayed 

"/login" and "/logout":
    An admin user is stored in a sqlite3 database with an encrypted password (encrypted by bcrypt):
    - username: admin
    - password: password 

    successful logins set session.loggedin to true 
    successful logouts set session.logout to false 

"/admin":
    Once the admin is logged in, they can add new blog posts and delete old posts 

