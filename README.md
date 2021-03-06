# Ascend

## Summary
A rock climbing logbook application.

## Live Demo
Link: https://ascend.yuncyang.com

## Current Feature List
- General
  - Use ReactJs as the main framework.
  - Use React Router for the navigation between different components.
  - Use React Context to store the states that are shared between components.
  - Use Bcrypt to hash the password for sign in/ sign up.
  - Use Nodemailer and JWT for user to reset password when needed.
  - Use Jest for unit testing.
- Account
  - User can create a new account.
  - User can log in using an existing account.
  - User can log out of the account.
  - User can request to reset the password. Upon request, an email will be sent to provided email. User can use the temporary address (expire in an hour) to reset the password.
- Route
  - User can view all stored routes.
  - User can add new routes.
  - User can edit detail of existing routes.
  - User can delete existing routes.
- Stat
  - User can view some stats of stored routes.

## Technologies Used
- ReactJs
- NodeJs
- ExpressJs
- React Router
- Nodemailer
- JWT
- Jest
- PostgreSQL
- Webpack
- Babel
- Bootstrap 4
- Sass
- HTML5
- CSS3
- AWS EC2

## Preview
![](./server/public/images/ascend_log.png)
![](./server/public/images/ascend_detail.png)

## Planned Features
- Adding more different types of stats to display on *Stat* page
- Implement chartJs easy stats viewing
- Search page for better looking for routes

## Development
### System Requirements
- NodeJs 10 or higher
- NPM 6 or higher
- PostgreSQL 10 or higher

### Getting Started
1. Clone the repository
  ```
  git clone https://github.com/YunCYang/ascend
  cd ascend
  ```
2. Install all dependencies with NPM
  ```
  npm install
  ```
3. Import the example database to PostrgeSQL
  ```
  npm run db:import
  ```
4. Start the project. You can view the running application by opening http://localhost:3000 in your browser.
  ```
  npm run dev
  ```
