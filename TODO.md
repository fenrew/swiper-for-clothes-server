# Temp users
- When someone opens the app, make a request with their ID stored in local storage. If it does not exists, let the server create one and send it to them. Store it in local storage for future use
- The token is stored in the database as a User, and every request the user makes will store the info under this token
- Delete temp users every 30 days of inactivity something


# Get data
- Make a request with a token => Get back 7 results that is not part of things the user has already swiped on