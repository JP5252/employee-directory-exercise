# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Requirements

Create a simple but impressive (looks good, works well, has intuitive design, etc.) CRUD application that can do the following:

1) Retrieve employees from a REST API
2) Display the employees in a React application
3) Has UI mechanisms for creating and deleting employees
4) Has API endpoints for creating and deleting employees
5) Edit your version of the `README.md` file to explain to us what things you did, where you focussed your effort, etc.

*Read over the `Bonus` objectives and consider tackling those items as well*

## Bonus (Highly Encouraged)

1) Use a relational database to store the data (SQLite, MariaDB, Postgres)
2) UI mechanisms to edit/update employee data
3) Add API endpoint to update employee data
4) Use [React Table](https://react-table.js.org)

## Other Technologies

You are permitted to use the following if you prefer ...

1) TypeScript, Front-end or backend.
2) NestJS, back end.

## Getting it Done

* You are free to use whatever libraries that you want. Be prepared to speak to your decisions decisions.
* There is no time limit. Use as little or as much time as is necessary, but aim to get it done within a week. If you need more time it's no problem, but you must let us know. Sometimes life happens. That's ok.
* Fork or clone our repository into your own repository.

When you are done, we'll schedule a zoom call with you where you will share your screen, demo the application for us, and walk us through the code while we ask questions about it.

## What I Did

- Created a new React Project with Vite in a folder named frontend. I used
  typescript in my frontend.
  - the frontend is ran with 'npm run dev'
- Created a Backend folder and put the Node.js/express server in there.
  - run the backend with 'npm start'
- The application has all the CRUD operations, Create to add a new employee, Read will get all the all employees from the directory, Update to edit any employee in the registry and delete to remove any employee from the registry
- tested the UI on tester, they were able to complete all the operations with no knowledge of the application.
  - took note for the edit button in the popup to change the wording and color to be more inuitive.
- different packages I used:
  - frontend
    - axios - simplifies making http requests to the API.
    - react-table - used a react table to display the data.
  - backend
    - pg - needed for the postgreSQL server connection.
- Made an html table at first, then tried the react-table.
- added a postgreSQL database to the backend.
  - made sure the queries were safe from injection.
