## Working Prototype Known Problems Report
Cloud Canviz
December 2, 2019

# 1. 
When the window is not maximized, the sidebar is minimized as expected. The icon in the middle of the sidebar is the hamburger icon, and clicking on this icon results in the sidebar expanding. The hamburger icon will perform an animation that transitions the icon into an 'x' icon. Clicking this 'x' icon to minimize the sidebar should result in an animation that turns the icon back into the hamburger icon. The animation happens and the sidebar minimizes, but the icon does not change to the appropriate one.

The location of the fault is located in the navbar and sidebar components. This bug can be fixed by rerendering the image on exiting the sidebar. 

#2. 
When you set a filter it works properly. However, when you remove a filter, the state is not reset and it does not show all artwork in the gallery. This state does not update when you clear a filter and use a filter individually. If you toggle another filter while the original filter is toggled and then untoggle both, then the filter properly resets the gallery image

The location of the fault is in the sidedrawer component. To fix this bug, we would need to research GraphQL queries to see if there is a special fetch policy that needs to be known about.

# 3
When a user attempts to contact an artist by clicking the profile of the artist, followed by clicking on contact, the user is greeted with a form to fill out their name, email, and to provide a message. When the user clicks send, it opens the user's email application correctly, however it prefills the fields incorrectly. The provided name, email address, and message fields, are formatted in an unnatural way.

The location of the fault is in the contact component. Fixing the bug would require additional research on how HTML handles email forms.

# 4
When liking and unliking art, and switch to a different page on the web application, the previous old state is remembered, and doesn't change to the new state
when you go back to the original page. However, the changes were made in the backend, it just requires a refresh for the state of the gallery to update.

The location of the fault is in in the backend, in the Art.js model. Fixing the bug would require additional research to see how we can refresh the component to have the new updated states instead of the old one.

# 5
If attempting to go to a web page that doesn't exist, our web application should throw a 404 error, but we do not have that, instead a blank white page shows up. The reason for the fault is not having 404 error components for unauthorized routes. Fixing the bug would require spending time to implement these components, but we decided to prioritize fixing other issues.
