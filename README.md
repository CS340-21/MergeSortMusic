# MergeSortMusic
## Branches

- main - The final codebase for our project with all of the individual components merged together.
- backend - Branch with most of the backend development by Jonathan.
- frontend - Branch with most of the frontend development by Shrey and John.
- sorting - Branch with most of the sorting algorithm development by Georgia.

## Tech

Python packages used in the project:

- Django - A high-level Python Web framework that encourages rapid development and clean, pragmatic design.
- Django REST framework - A powerful and flexible toolkit for building Web APIs.

Node.js packages used in the project:

- React - A JavaScript library for building user interfaces
- React Router - A collection of navigational components that compose declaratively with your application.
- Material-UI - A popular React UI framework.
- Babel - A JavaScript compiler.
- webpack - A module bundler.

## Installation

Prerequisites: Make sure python3, pip, nodejs, and npm are installed.

Install django, django-rest-framework, and requests from pip.

```sh
sudo python3 -m pip install django django-rest-framework requests
```

Install webpack, webpack-cli, and babel-loader from npm.

```sh
sudo npm i -g webpack webpack-cli babel-loader
```

Next, open two terminals. Open the first one in the project root directory, and the second one in the frontend folder.

In the project root directory terminal, run:
```sh
python3 manage.py runserver
```

In the frontend directory terminal, run:
```sh
npm run dev
```

As you make changes to the backend django code, the server will automatically update to reflect the changes and display any errors in the terminal.

As you make changes to the frontend react code, Babel will automatically recompile the js and update the main.js file (minimized .js file containing all of the .js) and display any errors in the terminal.

If you make any changes to the models, please stop the django server and run these commands to update the database with the changes.
```sh
python3 manage.py makemigrations
python3 manage.py migrate
```
