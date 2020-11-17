# Goals
Complete user stories for this sprint so that we have an application that allows users to be able to debate with others, change their password if they forgot it, logout automatically
if they're idle, and be able to see their ACS Tier on their profile page.

# Stories
IL-6: As Harry, I want a “Forgot your password?” option, so that I may click it in case I forgot my password.
Acceptance test : I should be able to reset my password and log in with it only
Priority/Point estimate: Medium/1

IL-9: As Harry, I want to be able to have a Debate option, so that I can discuss, analyze, and debate with other users  
  * As Harry, I want to receive a notification for a daily debate prompt so that I can choose to engage in the debate
    * Acceptance test : I can see a notification that pop ups on the app daily reminding me of that day’s debate prompt
    * Priority/Point estimate:  Medium-Low/2
  * As Harry, I want to be able to post my analysis to the daily debate prompt so that I can engage in the debate
    * Acceptance test : I can type up my analysis and post it on the app
    * Priority/Point estimate:  Medium-High/2
  * As Harry, I want a sliding scale on everyone's analysis so that I can vote on other’s responses
    * Acceptance test : I am put in a group and can see other people’s responses. I also see a sliding scale to vote how much I agree with their post
    * Priority/Point estimate:  Medium-Medium/5
  * As Harry, after 24 hrs I want to see a summary of the debate so that I can see who won and by how much
    * Acceptance test : I receive another notification 24 hrs after the debate started outlining the winner and various other stats (ex. Scores of all people in group, most popular opinion, gained a.c.s score etc)
    * Priority/Point estimate:  Medium-Low/2
    
IL-11: As Amanda, I want to logout of SportCred if I remain idle for 10 minutes, so that my data remains safe.  
Acceptance test : I want be redirected to the login screen after idling for 10 min  
Priority/Point estimate:  Low/1

IL-48: As Amanda, I want to know my tier based on my ACS Score  
Acceptance test : I want to see my ACS Tier on my profile page  
Priority/Point estimate:  Medium/5  

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
IL-6: As Harry, I want a “Forgot your password?” option, so that I may click it in case I forgot my password.
  * Forgot your password button and allow user to make new password

IL-9: As Harry, I want to be able to have a Debate option, so that I can discuss, analyze, and debate with other users.  
  * Receive a notification for a daily debate prompt to choose to engage in the debate
  * Able to post analysis to the daily debate prompt to engage in the debate
  * Sliding scale on everyone's analysis to vote on other’s responses
  * After 24 hrs a summary of the debate to see who won and by how much
  * Keep track of last daily debate prompt sent in db
  * Set and get posts on each debate question  
  * Keep track of people who gave scores on a post in a new collection for daily debate
  * Keep track of last daily debate the user was a part of
  * Send a list of users with the scores they got on their posts in sorted order
  * Get the daily debate questions

IL-11: As Amanda, I want to logout of SportCred if I remain idle for 10 minutes, so that my data remains safe. 
 * Keep track of how long user has been logged in

IL-48: As Amanda, I want to know my tier based on my ACS Score.  
  * Show user's ACSTier on their profile
