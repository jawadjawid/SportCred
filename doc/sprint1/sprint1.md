# Goals
Complete user stories for this sprint so that we have an application that allows users to sign up, log in, and see/update their profile information. We also want to have a homepage so users are welcomed once they sign in and they're able to access the other pages of the application from the welcome page. 

# Stories
IL-1: As Amanda (new user), I want to sign up for the application, so that I have my own account.    
Acceptance test : I should be able to log in only once I’ve signed up for an account.  
Priority/Point estimate: High/2  

IL-2: As Amanda (registered user), I want to login to the application, so that I can start using it.  
Acceptance test : I should be able to see “the zone” after I log in, if I’ve signed up.  
Priority/Point estimate: High/2  

IL-3: As Amanda, I want a homepage, so that I can access application’s other pages from there  
Acceptance test : I can see a page with buttons to all other pages of the app  
Priority/Point estimate: High/3  

IL-12: As Amanda, I want to have a profile, so that I can see personal info in one place
Acceptance test : I can see the personal information on the screen when I click on my profile
Priority/Point estimate: Low/2  

IL-13: As Harry, I want to be able to edit my information (name, password, etc) in the profile page.
Acceptance test : I can edit my information on my profile and have the previous information deleted
Priority/Point estimate: Low/1  

# Participants
Muhammad Osman Amjad  
Maninder Dhanauta  
Jimmy Yu  
Kshitij Dahal  
Piyush Ukani  
Vineet Desai  
Mahamad Jawad Jawid  

# Team Capacity
10 points in total

# Task Breakdown
As Amanda (new user), I want to sign up for the application, so that I have my own account.    
Acceptance test : I should be able to log in only once I’ve signed up for an account.  
Priority/Point estimate: High/2 
  * Landing page that welcomes the user and provides login option as well as a "Create a new account" option. The login option should have fields "Username" and "Password". 
  * If the user wishes to create a new account, a pop-up window will come and has fields "First Name", "Last Name", "Username", "Password", "Email or Phone Number", "Favourite Sport", "Favourite Player", "Favourite Team", "Sport you're curious about", "Age", "Highest Level of Sports Played" for the user to sign up
  * Once the user hits "sign up", they are taken back to the login page where they can enter their credentials
  * Keep track of data user entered, ensure no repetitive usernames, ensure users cannot create multiple accounts with the same email/phone number. 

IL-2: As Amanda (registered user), I want to login to the application, so that I can start using it.  
Acceptance test : I should be able to see “the zone” after I log in, if I’ve signed up.  
Priority/Point estimate: High/2
  * When a user attempts to login, their credentials should be checked against the database
  * If the user enters incorrect credentials, they are told that "Username or password was incorrect"
  * Once the user successfully logs in, they are taken to main page of the application
  
IL-3: As Amanda, I want a homepage, so that I can access application’s other pages from there  
Acceptance test : I can see a page with buttons to all other pages of the app  
Priority/Point estimate: High/3  
  * This main page of the application includes a navigation bar to other pages of the application "Picks and Predictions", "Trivia", "Debate and Analysis"
  * The page should include a list of posts and user comments, and also an option to post. 
  
IL-12: As Amanda, I want to have a profile, so that I can see personal info in one place
Acceptance test : I can see the personal information on the screen when I click on my profile
Priority/Point estimate: Low/2  
  * Page should include "First Name", "Last Name", "Username", "Password", "Email or Phone Number", "Favourite Sport", "Favourite Player", "Favourite Team", "Sport you're curious about", "Age", "Highest Level of Sports Played", "Profile Picture", and "Biography/Status" fields. 
  * "ACS Score", "Friends List", and "ACS History Report" should be shown to user 

IL-13: As Harry, I want to be able to edit my information (name, password, etc) in the profile page.
Acceptance test : I can edit my information on my profile and have the previous information deleted
Priority/Point estimate: Low/1  
  * User can change profile information by clicking the edit button.
  * After editing, user can click "save" or "discard changes"
  * Database should be updated if the user makes any changes

