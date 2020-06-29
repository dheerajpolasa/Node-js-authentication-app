# Node-js-authentication-app

Folder Structure -

  1. Assests --> All the css, js and images are present here
  
  2. config --> All the configuration files are present here
  
      1. middleware.js
      2. mongoose.js
      3. passport-google-oauth2-strategy.js
      4. passport-local-strategy.js
  
  3. controllers --> All the functions of routes are present here
      1. homeController.js
      2. userController.js
  4. models --> models are present here
      1. user.js
  5. routes --> All the routes are present here
      1. user.js
      2. index.js
  6. views --> views are present in this directory
  7. On the root level, the main index.js which is responsible for making the server up and running.
  

 For sending out emails wnile resetting the password, follow the below steps carefully
  
    1. Navigate to controllers/userController.js
    2. Put the mail and password in EMAIL and PASSWORD variables, Make sure your are using gmail
    3. Use the app now.
    
 For Google Authentication
 
    1. Navigate to config/passport-google-oauth2-strategy.js
    2. Change the clientID, clientSecret and callback with your details
 
 
 After cloning this project. Run the index.js file which is on root level.
 
 You are all set to use the application.
 
