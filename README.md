🧠 MERN Social Media App
```
A full-stack social media web application built using the MERN Stack (MongoDB, Express, React, Node.js).
This app allows users to create posts, upload images, like posts (with red heart animation), and comment on them.
```
🚀 Features
```
✅ User authentication using JWT (JSON Web Token)
✅ Create, read, and display text/image posts
✅ Like/unlike posts (heart turns red when liked ❤️)
✅ Add and view comments on posts
✅ Responsive design using Material UI
✅ Secure password storage with bcrypt
✅ Persistent user sessions
✅ Image upload support using Multer
```
🛠️ Tech Stack
```
Frontend:

React.js

Material UI

Axios

Backend:

Node.js

Express.js

MongoDB (Mongoose)

JWT for authentication

Multer for image upload

Bcrypt for password hashing
```
📁 Folder Structure
```
project-root/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md

⚙️ Environment Variables (.env)
```
```
Create a .env file in your backend root and add the following:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```
▶️ Installation & Setup
```
1. Clone the repository
git clone https://github.com/yourusername/mern-social-app.git
cd mern-social-app

2. Install dependencies

Backend:

cd backend folder
npm install
nodemon server.js

Frontend:

cd /frontend
npm install
npm run dev

```


