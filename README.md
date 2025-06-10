# Backend Spendee

This is the backend service for the **Spendee** platform. It is built using [express.js](https://express.dev/) as the main framework and integrates MongoDB using Mongoose, [Machine Learning service](https://github.com/capstone-spendee/speende-ML.git) for job recommendation, CV analysis and cover letter generation. The application supports JWT-based authentication, email notifications, MongoDB Cloud Storage for file management, and includes auto-generated API documentation using Swagger.

---

## 🚀 Features

- RESTful API with Express.js
- MongoDB integration via Mongoose
- JWT Authentication
- Password hashing using bcrypt
- File storage with MongoDB Cloud Storage
- OAuth authentication
- Dev server with nodemon

---

## 📦 Tech Stack

| Category         | Package                                             |
| ---------------- | --------------------------------------------------- |
| Server Framework | @express/express, @express/cookie, @express/vision  |
| Auth & Security  | jsonwebtoken, bcryptjs                              |
| Database         | mongoose                                            |
| File Storage     | @mongodb-cloud/storage                              |
| API Docs         | express                                             |
| Others           | dotenv, nodemon                                     |

---

## 🛠 Installation

```bash
# Clone the repo
git clone https://github.com/capstone-spendee/spendee-backend.git

# Navigate into the project directory
cd spendee-backend

# Install dependencies
npm install
```

---

## 🧪 Available Scripts

```bash
# Run in development mode
node app.js
```

---

## 🔐 Environment Variables

Copy the `.env.example` file to `.env` and modify it according to your needs.

---

## 📁 Project Structure

```
src/
├── configs/       # DB and environment config
├── middleware/    # Intermediary layer between applications
├── public/        # Load image
├── controllers/   # Business logic
├── models/        # Mongoose schemas
├── routes/        # API route definitions
└── app.js         # Main server entry point
```

---

## 📄 API Documentation

Once the server is running, navigate to:

```
http://localhost:3000/
```

---

## 🧑‍💻 Author

Developed by **SPENDEE Team**
[GitHub](https://github.com/capstone-spendee)

---

## 📄 License

This project is licensed under the **ISC License**.