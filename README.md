Vite + React + TS + FastAPI + sqlite

To run this app locally, you will need to:

- open the frontend in a code editor
- run npm install in the frontend
- run npm run dev in the frontend
- simultaneously open the backend in a code editor
- have python 3.12
- run pip install -r requirements.txt
- the frontend and the backend can now communicate locally, and the data is stored in sqlite

Features:

- authentication with argon2 for password hashing and jwt for authorization
- run a pomodoro timer
- use custom times, ranging from 15 minutes up to 60 minutes per session
- track your daily, weekly and monthly pomo sessions in the stats section
