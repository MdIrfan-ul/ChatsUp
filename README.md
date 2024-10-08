# chatsUp

**chatsUp** is a real-time chat application built using the MERN stack (MongoDB, Express.js, React, Node.js). It features a modern, responsive design with Tailwind CSS and DaisyUI, utilizes Context API for state management, and provides real-time notifications with React Hot Toast.


## Live Link
- **Live:** [![Netlify Status](https://api.netlify.com/api/v1/badges/718cf822-5963-440c-b69b-9d03eca95aeb/deploy-status)](https://app.netlify.com/sites/chats-up/deploys)

## Features

- **Real-Time Messaging:** Users can send and receive messages instantly.
- **User Authentication:** Sign up and log in to access the chat functionalities.
- **User Profiles:** Users can view and edit their profiles.
- **Contact Management:** Users can manage their contacts and chat only with them.
- **Notifications:** Real-time notifications for incoming messages with sound alerts.
- **Responsive Design:** Modern and responsive UI using Tailwind CSS and DaisyUI.

## Technologies Used

[![My Skills](https://skillicons.dev/icons?i=js,html,css,tailwind,react,nodejs,express,mongodb,postman,git,github)](https://skillicons.dev)


- **Frontend:** 
  - React
  - Tailwind CSS
  - DaisyUI
  - React Hot Toast (for notifications)
  - Context API (for state management)

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Socket.io (for real-time communication)

## Installation

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
2. Install dependencies:

```bash
npm install
```
3. Build the React app for production:
```bash
npm run build
```
4. Start the development server:
```bash
npm start
```

## Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2.Install dependencies:
```bash
npm install
```

3. Set up environment variables in a .env file:
```bash
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
PORT=<your_desired_port>
```
4. Start the server:

```bash
npm start
```

## Configuration
Frontend Configuration: Update API endpoints in your React app to match your backend's production URL.
Backend Configuration: Ensure your backend server is set to listen on the correct port and handle CORS if necessary.


___

Developed with ❤️ by [Mohamed Irfanullah M]

___