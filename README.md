# Candy Bite
Web application developed using Next.js that allows a user to get nutritional information on various candy.

The app makes use of the API made available by the U.S Department of Agriculture which provides
nutritional information on food items.

Major objectives of the project were:
  1. Fetch nutritional information based on user search and selection
  2. Display proper image of each candy
  3. Allow user to compare candy by various nutrients and allow sorting by ascending/ descending order.

<img src="https://raw.githubusercontent.com/JesseRM/candy_bite/main/screenshot/candy_bite.jpg" width="600">

## Usage
[Live Demo](https://candy-bite.vercel.app/)

Use the search bar to search for candy in the Home page. If candy is found matching the term, results will be displayed.
Clicking on any of the candy will display a table that contains nutrients and their values.

The Compare page allows the user to search for candy and add them to a list to compare. If results are returned, clicking
on the '+' icon on any of the candy will turn it green meaning the candy has been added.  The icon can be clicked
again to remove from the list which will cause it to turn back to black.

Once candy has been added to the compare list a drop down menu will display for selecting the nutrient and for the 
sort by order.

## Technologies
  1. TypeScript
  2. Next.js
  3. PostgreSQL
  4. Prisma
  5. CSS
