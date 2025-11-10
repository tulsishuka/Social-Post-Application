```
A full-stack social media web application built using the MERN Stack (MongoDB, Express, React, Node.js).
This app allows users to create posts, upload images, like posts (with red heart animation), and comment on them.
```

<img width="1895" height="875" alt="Screenshot 2025-11-10 211209" src="https://github.com/user-attachments/assets/861e9c2a-2aa5-456d-9b0c-8a0335a1066f" />


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
<img width="1901" height="858" alt="Screenshot 2025-11-10 211226" src="https://github.com/user-attachments/assets/1d7c8a73-521c-488b-857d-69766e2210b8" />

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

<img width="483" height="337" alt="Screenshot 2025-11-10 212606" src="https://github.com/user-attachments/assets/2307060c-fca9-46cd-9751-1820f94cd915" />

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
git clone https://github.com/tulsishuka/Social-Post-Application.git
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


