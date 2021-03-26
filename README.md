# MergeSortMusic
## Tech

Python packages used in the project:

- Django - A high-level Python Web framework that encourages rapid development and clean, pragmatic design.
- Django REST framework - A powerful and flexible toolkit for building Web APIs.

Node.js packages used in the project:

- Babel - A JavaScript compiler.
- Material-UI - A popular React UI framework.
- webpack - A module bundler.
- clsx - A tiny utility for constructing className strings conditionally.
- React - A JavaScript library for building user interfaces
- React Router - A collection of navigational components that compose declaratively with your application.

## Installation

Prerequisites: Make sure python3, pip, nodejs, and npm are installed.

Install django and django-rest-framework from pip.

```sh
sudo python3 -m pip install django django-rest-framework
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
