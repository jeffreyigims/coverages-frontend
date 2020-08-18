# README

# Coverages Project

## Description 
This application encapsulates the frontend for the coverages project. The application is built with React and follows a FLUX architecture, specifically utilizing the REDUX framework. Security with the current backend is hanled with JSON web token authentication.

## Deployment 
The application is currently deployed on Heroku at the following link: https://dashboard.heroku.com/apps/coverages-frontend. 
There are no add-ons required. To specify which backend is to be used to support the application, navigate to utils/APIUtils.js and replace the base variable with the desired resource. Currently, a supportive backend is running at https://coverages-backend.herokuapp.com. 

## Actions 
All actions are located in the actions file. Most actions that involve interacting the with API are created with higher-order functions that take the name of the model and return an asynchronous function that sends a request to the API. There are also functions to handle updating and posting coverages. These functions handle deleting and posting the associations of carriers and brokers to the coverage. 

## Reducers
All reducers are in the reducers folder. Reducers for each model are created with the use of higher-order functions that take the name of the model and return a reducer that fits the need of our application. There are several types of higher-order functions used in making the reducers to fit the needs of some specific models. The coverages need a reducer that can handle keeping track of page changes and companies and categories need to be able to keep track of changes to their associated brokers and subcategories respectively. This is because brokers and subcategories are posted directly from the companies and categories pages so we must be able to update the view with these changes without making an API call to reload the data. 

## Containers
