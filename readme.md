# Dinner Spinner

The dinner spinner takes away your dinner worries by telling you whether you should
make dinner at home or get take out.  
Once the spinner tells you what to do, you can accept or reject.
If you accept, you will be moved to the respective screen (cooking or restaurants).

## Cooking

You can swipe through several pictures of recipes until you find something
that appeals to you. Once you like something, swipe right, and you can be
matched with your dream-come-true recipe!

## Restaurants

Restaurants near you based on your phone's location are shown and if you like
a place, you can see a static map as well as get a link to Google maps
for directions. Don't worry, the restaurant will always <3 you back!

## Profile

The profile screen is a placeholder for future functionality such as
adding a profile picture to enhance your swiping experience, accessing
another screen to see your previously liked recipes and restaurants, and more.

## Future functionality and bug fixes

Know bugs include:

1. There are cases when the Google Places API loads before the user location
   is obtained, throwing an error.
2. The 'show more' text beneath the stack of restaurants is visible initially
   before the images load.
3. The heart animation is not always smooth.
4. After swiping, the component reload is slow.

Future functionality:

1. Allow the user to enter the keyword/query for the Edamam and Places api.
2. Load all of the available restaurants in the stack at once.
3. Allow user to see history of liked recipes and restaurants.
4. Auth and the ability to add a profile picture
