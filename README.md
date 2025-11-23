# 🍅 Mediterranean Pomodoro 🍅

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Local Development Setup](#local-development-setup)
- [Environment variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Screenshots](#screenshots)
- [License](#license)

## Overview

This web application allows users to run a pomodoro timer with custom time ranging from 15 minutes to 60 minutes per one pomodoro session. Users can then track how many hours and minutes they've spent focused over the last day, week, or month. The general vibe of the website is Mediterranean, hence "Mediterranean Pomodoro".

## Tech Stack

- **Frontend:** React (TypeScript), Vite
- **Backend:** Fastapi
- **Database:** PostgreSQL

## Local Development Setup

### Prerequisites

- Node.js
- Python 3.12+
- Docker (optional)
- sqlite (installed with requirements) or PostgreSQL

### 1. Clone the repository

```bash
git clone https://github.com/Sebastijan-Dominis/pomodoro.git
cd pomodoro
```

### 2. Set up backend

```bash
cd backend
```

#### Create a virtual environment

```bash
conda create -n pomodoro python=3.12
conda activate pomodoro
```

#### Install the requirements

```bash
pip install -r requirements.txt
```

#### Define the environment variables

- define .env variables, as described in .env.example

#### Start the server

```bash
uvicorn main:app --reload
```

- optionally:

#### Docker

```bash
docker build -t your-backend .
docker run -p 8000:8000 your-backend
```

### 3. Set up frontend

```bash
cd ../frontend
```

#### Install the requirements

```bash
npm install
```

#### Define the environment variables

- define .env variables, as described in .env.example

#### Start the server

```bash
npm run dev
```

## Environment variables

### Backend

- API_URL=http://localhost:5173
- SECRET_KEY=your-secret-key-for-jwt
- ALGORITHM=your-algorithm-of-choice-for-jwt

Option 1:

- DB_URL=sqlite:///./pomodoroapp.db
- DEPLOYMENT_ENVIRONMENT=DEV

Option 2

- DEPLOYMENT_ENVIRONMENT=PRODUCTION
- DB_URL=postgresql://username:password@host:port/db_name

#### Extra notes

- going with the sqlite option will automatically create an sqlite database within your backend folder
- if opting for postgresql, make sure to create an actual database locally or remotely, run it, and use a valid url to connect to it (should be defined in the DB_URL environment variable)
- using sqlite is recommended for development and local use (easy to use), while postgresql is recommended for deployment

### Frontend

VITE_API_URL=url-to-backend

## API Documentation

### auth

#### Create User

- `/auth/create-user`
- no parameters
- example of a request body:
  {
  "email": "user@gmail.com",
  "password": "password123",
  "username": "user's name"
  }

This endpoint is used to register (sign up) users, and it returns {"id": new user's id, "username": new user's username, "email": new user's email}.

Successful response: 201

Most common errors:

- 422: Validation Error
- 409: User with email {email} already exists.
- 500: User creation failed: {error}

#### Authorize User

- `/auth/authorize`
- no parameters
- request body expects form data

This endpoint is used for logging in the user and assigning them a JWT, which expires in 60 minutes of no action. It returns {"access_token": token, "token_type": "bearer"}.

Successful response: 200

Most common errors:

- 422: Validation error

#### Read Users

- `/auth/all-users`

- no parameters

This endpoint is used for reading all of the users, and is not meant to be called from frontend. It returns a list of all of the registered users.

Successful response: 200

#### Delete User

- `/auth/delete-user/{user_id}`

- parameters:
  **user_id: integer**

This endpoint is used for deleting a user by their id, and is not meant to be called from frontend. It returns {"message": "User with id {user_id} successfully deleted."}.

Successful response: 200

Most common errors:

- 422: Validation error
- 404: User not found.

### pomodoro_sessions

#### Pomos Last Day

- `/pomodoro_sessions/pomos-last-day`

- no parameters

This endpoint is used for getting the total time that the logged-in user has spent focused (sum of all pomos) over the last 24 hours.

Successful response: 200

#### Pomos Last Week

- `/pomodoro_sessions/pomos-last-week`

- no parameters

This endpoint is used for getting the total time that the logged-in user has spent focused (sum of all pomos) over the last 7 days.

Successful response: 200

#### Pomos Last Month

- `/pomodoro_sessions/pomos-last-month`

- no parameters

This endpoint is used for getting the total time that the logged-in user has spent focused (sum of all pomos) over the last 30 days.

Successful response: 200

#### Create Pomo

- `/pomodoro_sessions/create-pomo`

- no parameters

- example of the request body:
  {
  "duration": 15
  }

This endpoint is used to save the duration of the user's finished pomodoro session.

Successful response: 201

Most common errors:

- 422: Validation Error
- 401: Authorization Failed.

### users

#### Get Current User

- `/users/current`

- no parameters

This endpoint is used to fetch the basic information regarding the logged-in user. In the frontend, it is triggered on login, and used to display username to the logged-in user on the homepage.

Successful response: 200

Most common error:

- 401: Authorization Failed.

## Database Schema

- if one chooses to manually create the PostgreSQL database, it should be done like so:

DROP TABLE IF EXISTS users;

CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR UNIQUE,
email VARCHAR UNIQUE,
hashed_password VARCHAR UNIQUE
);

DROP TABLE IF EXISTS pomodoro_session;

CREATE TABLE pomodoro_session (
id SERIAL PRIMARY KEY,
duration INTEGER,
created_at TIMESTAMP,
owner_id INTEGER REFERENCES users(id)
);

## Screenshots

![Main screen - logged out](screenshots/pomodoro-1.png)

![Signup screen](screenshots/pomodoro-2.png)

![Login screen](screenshots/pomodoro-3.png)

![Main screen - logged in](screenshots/pomodoro-4.png)

![Stats](screenshots/pomodoro-5.png)

![Pomo counter - 30min](screenshots/pomodoro-6.png)

![Pomo counter - 15min](screenshots/pomodoro-7.png)

## License

- This repository includes a `LICENSE` file — please review it for terms of reuse.

**Contributing**
- Improvements and bug fixes welcome. Open an issue or submit a pull request with a clear description of the change.

**Contact / Author**
- Author: repository owner (see repository metadata).
