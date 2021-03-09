# Countries of the World: a GraphQL and React demo

### Overview
This was a coding challenge for a Greetly to display the data of mocked data in a json file, or alternatively to grab the data from a public GraphQL endpoint. I chose the later and used a public GraphQL for countries.

The GraphQL repo can be found here: https://github.com/lennertVanSever/graphcountries. 

The GraphQL playground can be found here: https://countries-274616.ew.r.appspot.com/.

### Using the Application
To run this application simply clone the repo, navigate to the folder in a terminal, and run `npm start`, finally, go to `localhost:3000` and start playing around!

You will initiall see a table with all the countries - this table uses pagination and a user can filter the rows based on the columns by clicking the column header. You can also filter the contents of the table by typing into one of the search fields above the table. Finally, you are able to click on a row in the table and be naviagated to a new page that will display additional information about the country you chose.

### Tools
The following tools/libraries were used for this application:
* Typescript
* React
* Apollo Client - used to handle GraphQL requests and data
* Material UI - used to style the application
* react-router - used for routing of the application

### TODOs
The following is a list of things I would like to accomplish given more time with the application:
* Fix the numeric filters on the search as they don't always work as expected.
* Better filters for country table - would like to use drop downs for regions and subregions filter, and a min-max component for the numeric items in the table.
* Add the border countries to the Country Page so the user can quickly navigate to those bordering countries.
* Potentially add a map you can click on to go directly to the Country Page from the map.

## Below is the contents of the intial README.md for the assignment:

##### Thank you for considering us in your career path.

![Greetly](https://www.greetly.com/hubfs/2020-website-redesign/logo.png)

# Front-End Developer Test
Due to the overwhelming amount of applicants, we have created the following coding challenge to assist our hiring process. 

In order to complete this exercise, you will need a computer with NodeJS installed. You can download it from [here](https://nodejs.org/en/) if you haven't yet.

Once it is installed, please fork this repo and clone it locally. 

# Goals
Your mission, should you choose to accept it, is to develop a client side application with React that retrieves and displays the information provided in the MOCK_DATA.json file. 

# Requirement
App users should be able to review all data on a aesthetically pleasing interface. Such interface should provide users the ability to filter results by "section" and sort users by all other data elements. 

As an optional "extra credit", connect the UI to a public GraphQL endpoint from: https://github.com/APIs-guru/graphql-apis

# Notes
Implementation details are mostly up to you, just note that best practices are expected.

Once you are done, please push your changes to your repo and share it with us.
