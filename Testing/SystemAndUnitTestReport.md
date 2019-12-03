## Systen and Unit Test Report.pdf
Cloud Canviz
December 2, 2019

---

### System Test Scenarios

# 1. User story 1 from Sprint 1:
 “As an artist, I would like a clean UI that shows me images with their relevant data”

Scenario:
- Start the web application
- User is immediately greeted with a gallery of art, with the - following information:
Artist
Name of art
The year the art was created
The dimensions of the art piece

# 2. User story 2 from Sprint 1: 
“As an artist, I want an easy way to upload image data with relevant information”

Scenario:
- Start the web application
- Create an account by clicking the login button in the top right corner
- Click the sign up button if the user does not have an account yet
- Fill in the fields: First Name, Last Name, Email, Password (and the password confirmation)
- Click CRM in the top right corner, on the left of ‘Logout’ and on the right of ‘Profile’
- Click the Upload Artwork button
- The user now has the option of dragging the desired file into the specified area, or to select the file from their computer
- The user can then fill in the fields the user thinks is relevant to their art piece.

# 3. User story 1 from Sprint 2:
“As a collector, I want to be able to view artwork so that I can decide which ones I like”

Scenario:
- Start the web application
- User is immediately greeted with a gallery of art from all artists
- If the user likes a certain piece of art displayed, the user can then click on the artist name displayed underneath the image, which will bring the user to the artist’s profile page, which displays the artist’s other created works

# 4. User story 2 from Sprint 2:
“As an artist, I want to be able to upload my images so that collectors can view them on the site”

Scenario:
- Start the web application
- Click the login button in the top right corner
- Click the sign up button if the user does not have an account yet, otherwise log in with the user’s  username and password and skip the next step.
- Fill in the fields: First Name, Last Name, Email, Password (and the password confirmation)
- Click CRM in the top right corner, on the left of ‘Logout’ and on the right of ‘Profile’
- Click the Upload Artwork button
- The user now has the option of dragging the desired file into the specified area, or to select the file from their computer
- The user can then fill in the fields the user thinks is relevant to their art piece.
- Collectors can then see the artist’s uploaded image in the main gallery of the web application, and can also be viewed on the artist’s profile page.

# 5. User story 1 from Sprint 3:
“As a collector, I want to be able to search for art by size, price and style so that I can find the exact piece I want for my home”

Scenario:
- Regardless of whether the user is logged in or not, a gallery of images a sidebar on the left will be available to the user
- If the window is full sized, the sidebar will be already expanded, showing the options available for filtering the displayed art by the following categories: ‘Painting’, ‘Photography’, ‘Drawing’, ‘Sculpture’, ‘Mixed Media’, ‘Print’, and in the following styles: ‘Abstract’, ‘Fine Art’, ‘Modern’, ‘Photo Realism’, ‘Expressionism’, ‘Realism’, and in the following orientations: ‘Portrait’, ‘Landscape’, ‘Square’.
- If the window is not full sized, the sidebar may not be expanded. In that case, simply click on the hamburger icon in the middle of the sidebar to expand it. 
- This allows the collector to be able to search for art with certain tags, however the user is not able to search for art by size or price.

# 6. User story 2 from Sprint 3:
“As an artist, I want to be able to organize and manage my artwork and contacts so that I can more easily follow up on my leads”

Scenario:
- Start the web application
- Click the login button in the top right corner
- Click the sign up button if the user does not have an account yet, otherwise log in with the user’s  username and password and skip the next step
- Fill in the fields: First Name, Last Name, Email, Password (and the password confirmation)
- The user can upload their own artwork by clicking ‘CRM’ in the top right corner, followed by clicking ‘Upload Artwork’.
- Upload image by dragging the desired file into the specified area, or select the file from your computer.
- All images uploaded by the user can be accessed through the user’s profile page by clicking ‘Profile’ in the top right corner from the home page.
- After clicking the ‘CRM’ button, click the ‘Contacts’ button in the top right corner to see a list of the user’s contacts.
- The contacts page displays the name of the contact, phone number and email, along with other relevant information, allowing the artist to easily follow up on leads.

# 7. User story 3 from Sprint 3:
“As a collector, I want to be able to search for art on my phone as well as my desktop”

Scenario:
- In the case that the user is trying to search for art on their phone, the application will have less screen real estate compared to accessing the application on a desktop.
- The web application will recognize this and display a minimized sidebar to make sure a majority of the screen is not blocked by it (if it was expanded).
- If the user wants to search for art in this scenario, simply click the hamburger icon in the middle of the sidebar to expand the sidebar to filter art by certain tags.

# 8. User story 4 from Sprint 3:
“As a collector, I want to be able to comment and follow artists artwork”

Scenario:
- TO BE FILLED IN

# 9. User story 1 from Sprint 4:
“As a collector, I want to be able to easily filter my searches for art so that I can view only the art that is relevant to my tastes and budget.”

Scenario:
- Regardless of whether the user is logged in or not, a gallery of images a sidebar on the left will be available to the user
- If the window is full sized, the sidebar will be already expanded, showing the options available for filtering the displayed art by the following categories: ‘Painting’, ‘Photography’, ‘Drawing’, ‘Sculpture’, ‘Mixed Media’, ‘Print’, and in the following styles: ‘Abstract’, ‘Fine Art’, ‘Modern’, ‘Photo Realism’, ‘Expressionism’, ‘Realism’, and in the following orientations: ‘Portrait’, ‘Landscape’, ‘Square’.
- If the window is not full sized, the sidebar may not be expanded. In that case, simply click on the hamburger icon in the middle of the sidebar to expand it. 
- This allows the collector to be able to search for art with certain tags.

# 10. User story 2 from Sprint 4:
“As a user, I want to be able to use a web app with cohesive styling and no bugs, so that I can find art I want without the app crashing or looking unappealing”

Scenario:
- Whether or not the user is logged in or not, the user is immediately greeted with our home page with beautiful styling and no bugs. 
- The user can choose to filter through certain categories of art by using the sidebar, and enjoy a bug free experience.
- If the user is logged in and has uploaded artwork before, the user can click on ‘Profile’ in the top right corner and be greeted with the user’s profile page, which includes a profile picture, as well as all the artwork the user has uploaded, followed by other pieces of art to fill in the page.
- If the user is not logged in, the profile page will consist of a gallery of other images, but still allow the user the functionality of uploading artwork.


---

### Unit Tests

- see 'server/test/UserTests.js' in Git Repository.

---