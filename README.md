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
- [Contributing](#contributing)
- [Author & Contact](#author--contact)

---

## Overview

This web application allows users to run a pomodoro timer with custom time ranging from 15 minutes to 60 minutes per one pomodoro session. Users can then track how many hours and minutes they've spent focused over the last day, week, or month. The general vibe of the website is Mediterranean, hence "Mediterranean Pomodoro".

---

## Tech Stack

- **Frontend:** React (TypeScript), Vite
- **Backend:** Fastapi
- **Database:** PostgreSQL

---

## Local Development Setup

### Prerequisites

- Node.js
- Python 3.12+
- Docker (optional)
- sqlite (installed with requirements) or PostgreSQL

---

### Without Docker:

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

If using Anaconda:

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

### 4. Use the app
> typically `http://localhost:5173/`.

---

### With Docker:

### 1. Configure the environment variables (see `.env.example`)

- Do this for both backend and frontend

### 2. Build the docker image

```bash
docker-compose build --no-cache
```

### 3. Run the docker container

```bash
docker compose up
```

### 4. Use the app
> typically `http://localhost:5173/`.

---

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

#### Extra note

- if opting for postgresql, make sure to create an actual database locally or remotely, run it, and use a valid url to connect to it (should be defined in the DB_URL environment variable)

### Frontend

VITE_API_URL=url-to-backend

---

## API Documentation

This section is a concise reference of available endpoints. For each endpoint we list the HTTP method, path, whether authentication is required, a short request/response example, and common errors.

### Auth

- **Create user**
  - Method: `POST`
  - Path: `/auth/create-user`
  - Auth: no
  - Body (JSON): `{"email": "user@gmail.com", "password": "password123", "username": "Alice"}`
  - Success: `201` — `{ "id": 1, "username": "Alice", "email": "user@gmail.com" }`
  - Common errors: `422` (validation), `409` (email exists), `500` (server)

- **Authorize (login)**
  - Method: `POST` (form data)
  - Path: `/auth/authorize`
  - Auth: no
  - Body (form): `username` / `password`
  - Success: `200` — `{ "access_token": "<jwt>", "token_type": "bearer" }`
  - Common errors: `422` (validation), `401` (invalid credentials)

- **Read all users**
  - Method: `GET`
  - Path: `/auth/all-users`
  - Auth: no (admin/debug use only)
  - Success: `200` — list of users

- **Delete user**
  - Method: `DELETE`
  - Path: `/auth/delete-user/{user_id}`
  - Auth: no (admin/debug use only)
  - Success: `200` — `{ "message": "User with id {user_id} successfully deleted." }`
  - Common errors: `422`, `404`

### Pomodoro Sessions

- **Create pomo**
  - Method: `POST`
  - Path: `/pomodoro_sessions/create-pomo`
  - Auth: yes (Bearer token)
  - Body (JSON): `{"duration": 15}`
  - Success: `201` — saved session
  - Common errors: `422` (validation), `401` (authorization)

- **Pomos last day**
  - Method: `GET`
  - Path: `/pomodoro_sessions/pomos-last-day`
  - Auth: yes
  - Success: `200` — total focused time (last 24h)

- **Pomos last week**
  - Method: `GET`
  - Path: `/pomodoro_sessions/pomos-last-week`
  - Auth: yes
  - Success: `200` — total focused time (last 7 days)

- **Pomos last month**
  - Method: `GET`
  - Path: `/pomodoro_sessions/pomos-last-month`
  - Auth: yes
  - Success: `200` — total focused time (last 30 days)

### Users

- **Get current user**
  - Method: `GET`
  - Path: `/users/current`
  - Auth: yes
  - Success: `200` — current user info (id, username, email)
  - Common errors: `401` (authorization)

Notes:
- Use the `Authorization: Bearer <token>` header for protected endpoints.
- For development you can use `DB_URL=sqlite:///./pomodoroapp.db` to avoid external DB setup.

---

## Database Schema

- if one chooses to manually create the PostgreSQL database, it should be done like so:

```sql
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
```

---

## Screenshots

![Main screen - logged out](screenshots/pomodoro-1.png)

![Signup screen](screenshots/pomodoro-2.png)

![Login screen](screenshots/pomodoro-3.png)

![Main screen - logged in](screenshots/pomodoro-4.png)

![Stats](screenshots/pomodoro-5.png)

![Pomo counter - 30min](screenshots/pomodoro-6.png)

![Pomo counter - 15min](screenshots/pomodoro-7.png)

---

## License

- This repository includes a `LICENSE` file — please review it for terms of reuse.

## Contributing
- Improvements and bug fixes welcome. Open an issue or submit a pull request with a clear description of the change.

## Author & Contact
- Author: Sebastijan Dominis
- Contact: sebastijan.dominis99@gmail.com
