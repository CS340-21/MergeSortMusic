# Merge Sort Music Preliminary Proposal

- Georgia Stricklen – Jonathan Ting – John Carmack – Shreyank Patel
- Febuary 8, 2021

## 1. Introduction

### 1.1. Project Description

While many media hosting services do allow users to manage and organize their personal content into
playlists, the functionality of such services can be lacking in both efficiency and efficacy. When users of these
services wish to partake in the media offered, rarely do they wish to spend time battling the cumbersome
user interface for building playlists that the services offer. In addition, many of these services lack the ability
to sort the playlist of media on criteria that many users find significant (such as user rating).

We propose a web application that will allow users to import libraries of media from these media services
and then organize them into playlists based on user-generated criteria. These playlists will then be able to be
exported to the media services that they came from. Users will also be able to store these playlists with their
account such that it will serve as a backup external to the media hosting platform that it’s for. As far as the
team is aware there are already a number of similar applications that provide this service, but they offer it
for specific, obscure media hosting services. Our proposed application would offer similar services for Spotify,
which is a far more mainstream service.

### 1.2. Team Description

Jonathan Ting is a senior studying Computer Engineering currently
doing undergraduate research in hardware security. However, as a hobby, he also enjoys dabbling in web
development, both with backend frameworks such as Django and frontend frameworks such as Bootstrap.
This project will fulfill a wish of his, to optimize the process of sorting music playlists, of which there are
not many great tools for at the moment.

Shreyank Patel is a senior majoring in Computer Science and Economics. He enjoys running, and cooking.
His areas of interest include Machine Learning and Cryptography. He has prior experience designing websites
using HTML, CSS, Javascript and React. Through this project he hopes to gain meaningful experience in
Bootstrap, Django and other frameworks.

Georgia Stricklen is a Junior at the University of Tennessee,
majoring in Computer Science. Her main focus is C++ and Java with some experience in Python. She
enjoys reading and video games. Solving real world problems while bettering existing structures is what she
hopes to work towards in her career as a Computer Scientist.

John Carmack is a Senior majoring in computer science. Web development is a primary interest for him,
though he has only ever worked on fairly static web sites with limited user interactivity. He enjoys rock
climbing, brazillian jiu-jitsu and works as a commissioned artist in his spare time.

## 2. Customer Value

These are the motivations for our proposed web application and our projected outcomes for users.

### 2.1 Need

Spotify occupies a significant portion of the music media hosting market and they serve millions of customers
a day. As highlighted by many members of the team, while the hosting service does offer a user interface for
managing playlists, it can be cumbersome and does not fully support all sorting criteria that the team feels
is important using the service to the fullest extent. It is our belief that many other users of Spotify share
our sentiments, and would relish a more engaging and granular playlist building experience. The large music review industry demonstrates demand for rating music, and our tool aims to make music ranking accessible to normal users. While ranking can be done by manually assigning scores, our project aims to eliminate biases beyond musical opinion through the use of a matchup-based algorithm, which also adds a gamification component to music ranking.

### 2.2. Solution

Our application would provide users with a personalized web application that allows them to import, create,
edit, sort, and export playlists to Spotify. The user’s account will also provide the secondary benefit of
providing a backup of their playlist so that should they inadvertently edit or delete the playlist, they can
simply restore it via our web service.

We would consider this application a success if users were able to say definitively that the user interface
provided by our service is clearly superior to Spotify’s, and that it contributes to the fulfillment they get
from using the media hosting service. We wish to both streamline and provide increased customizability to
Spotify’s playlist feature such that the user’s experience is enhanced.

### 2.3. System

Our software will be a fully-fleshed RESTful web application. We will require a back end that can interface
with the user via a website, the Spotify API, and a database to store user information. From the user’s
perspective we will require a front-end that is both intuitive and simple while also providing the user with the
rich functionality that we find Spotify’s playlist manager lacking. We propose that this is the lightest-weight
system architecture that can accomplish the goals we have in mind. During development we will test the
application’s functionality via dummy accounts. Some possible enhancements that could be a value to the
user would be the ability to save the playlist and export it to the service that provided the original playlist.

### 2.4. Competing Technologies

Currently, there are existing tools and websites that also apply user input-based merge sorting, but these websites are usually tailored towards a specific use case or fanbase. We have not found a general solution that can support any group or sorting of music. The general method of sorting music is either by consensus popularity rating or manually.

## 3. Technology & Tools

Our front-end will be composed of the big three webtools: HTML, CSS, and Javascript. We are also using
the React framework to help organize and streamline the front-end creation process.

Our back end is being implemented in Python’s Django framework, which uses SQLite as its default
database. We have as of yet to decide to keep SQLite as our database technology for deployment.

The IDE of choice for the team seems to be VSCode thanks to the myriad of tools available to the Django
and React developer.

## 4. Team

These assignments are relatively flexible and subject to the requirements of the project.

### 4.1. Georgia Stricklen

Merge Sort Algorithm and back end.

### 4.2. Jonathan Ting

Django Database Design and Backend API. Project manager.

### 4.3. John Carmack

Front end design and development. Documentation. User advocate

### 4.4. Sheyank Patel

Front end design and development.

### 4.5. Team Management

We will have weekly discord meetings to discuss project progress and bring up issues.

### 4.6. Schedule

#### 4.6.1. Week 1

Skeleton code for front and back end.

#### 4.6.2. Week 2

Proposal draft

#### 4.6.3. Week 3

Backend: Develop support for importing Spotify playlists.

Frontend: Create a rough draft layout for the frontend design.

#### 4.6.4. Week 4

Backend: Implement a merge sorting algorithm that will run in the backend.

Frontend: Connect the frontend and backend implementations and ensure they are able to communicate with each other.

#### 4.6.5. Week 5

Backend: Create a login system to store user progress.

Frontend: Use CSS/MaterialUI or Bootstrap to develop the frontend visual design.

#### 4.6.6. Week 6

Backend: Optimize and test website for performance issues and bugs.

Frontend: Revise and upgrade frontend as needed.

#### 4.6.7. Week 7

Implement collaborative sorting.

### 4.7. Constraints

Our website will have authentication, however, the authentication will be handled through 3rd-party services such as Google. The only data stored on our servers would be the Google authentication ID provided by their authentication services. We will be storing playlist data imported from an authenticated Spotify account, however, the user will have to authorize this access, and only playlist data explicitly authorized by the user will be stored in our database. We anticipate no regulatory or ethical constraints. Users will not be sharing sensitive data with out application.

### 4.8. Resources

All data will either be provided by users or via the Spotify API, primarily playlist data which is only imported with explicit permission of the user. We anticipate no difficulty in procuring said data.

### 4.9. Descoping

Our project is limited in scope and we fully expect to be able to complete all schedule items on time. If that
proves to not be the case, however, our Minimum Viable Product will be to deliver single-user playlist sorting functionality on the web app and remove the multi-user sorting functionality. It should also be fully feasible to provide users with the full functionality of
editing existing Spotify playlists.

## 5. Block Diagram

![Block Diagram](/blockdiagram.jpg)
