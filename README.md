# API Store

A production-level REST API platform built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB** that enables user authentication, secure API key management, API protection, and usage tracking.

This project focuses on backend architecture, security, scalability, and maintainability while following modern development practices such as ESLint, Prettier, Husky, and feature-based modular architecture.

---

## Features

### Authentication

- User Registration
- User Login
- JWT-based Authentication
- Password Hashing using bcrypt
- Protected Routes

### API Key Management

- Generate secure API Keys
- Store hashed API Keys in MongoDB
- Activate / Deactivate API Keys
- API Key Authentication Middleware

### API Protection

- Protect APIs using JWT Authentication
- Protect APIs using API Keys
- Rate Limiting
- Request Tracking

### Backend Architecture

- Feature-based Folder Structure
- Controller → Service → Model Architecture
- Global Error Handling
- Custom Error Classes
- Environment Variable Management

### Developer Experience

- TypeScript
- ESLint
- Prettier
- Husky
- lint-staged
- pnpm
- Express 5

---

## Tech Stack

| Category         | Technology          |
| ---------------- | ------------------- |
| Runtime          | Node.js             |
| Framework        | Express.js          |
| Language         | TypeScript          |
| Database         | MongoDB Atlas       |
| ODM              | Mongoose            |
| Authentication   | JWT                 |
| Password Hashing | bcrypt              |
| API Key Security | SHA-256             |
| Package Manager  | pnpm                |
| Linting          | ESLint              |
| Formatting       | Prettier            |
| Git Hooks        | Husky + lint-staged |

---

# Request Flow [ from where it's orignated and ended]

The following diagram shows how every request travels through the application from the client to MongoDB and back.

```text
                              CLIENT
                         (Browser / Postman)
                                   │
                        HTTP Request (GET/POST)
                                   │
                    Express Server (server.ts)
                                   │
                     Express App (app.ts)
                                   │
          ┌────────────────────────┴────────────────────────┐
          │                                                 │
   express.json()                                  Global Middleware
                                            (Error Handler, Future Middleware)
          │
          └────────────────────────┬────────────────────────┘
                         Root Router (/api/v1)
                                   │
          ┌───────────────┬─────────┴──────────┬
      /auth           /api-keys              /api
          │               │                    │
     Route File      Route File          Route File
          │               │                    │
      Controller      Controller          Controller
          │               │                    │
        Service         Service             Service
   (Business Logic) (Business Logic) (Business Logic)
          │               │                    │
 JWT Utils /      API Key Utils         Validation
 Password Hashing  SHA-256 Hashing
          │               │
          └───────────────┼────────────────────┐
                    Mongoose Models      Shared Models
                          │
                    MongoDB Atlas
                          │
                 Read / Write Documents
                          │
                     Mongoose Result
                          │
                        Service
                          │
                      Controller
                          │
                 JSON Response Returned
                          │
                        CLIENT
```

This architecture makes it easy to extend the project by adding new modules without affecting existing functionality.

## Request Processing Steps

1. The client sends an HTTP request to the Express server.
2. `server.ts` starts the application and forwards the request to `app.ts`.
3. Global middleware executes (JSON parsing, error handling, etc.).
4. The request is routed through the root router (`/api/v1`).
5. The appropriate feature module is selected.
6. The controller receives the request and extracts required data.
7. The controller delegates business logic to the service layer.
8. The service validates data, performs security checks, and executes business logic.
9. Database operations are performed through Mongoose models.
10. MongoDB processes the query and returns the result.
11. The service formats the business response.
12. The controller converts it into an HTTP response.
13. Express sends the JSON response back to the client.

---

# Project Structure

```
src
│
├── config/
│   └── db.ts
│
├── middlewares/
│   ├── auth.middleware.ts
│   ├── apiKey.middleware.ts
│   └── error.middleware.ts
│
├── models/
│   └── user.model.ts
│
├── modules/
│   ├── auth/
│   │   ├── auth.routes.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.model.ts
│   │
│   ├── api/
│   │   ├── api.routes.ts
│   │   ├── api.controller.ts
│   │   ├── api.service.ts
│   │   └── api.model.ts
│   │
│   └── api-key/
│       ├── apiKey.routes.ts
│       ├── apiKey.controller.ts
│       ├── apiKey.service.ts
│       └── apiKey.model.ts
│
├── routes/
│   └── root.routes.ts
│
├── utils/
│   ├── jwt.ts
│   └── appError.ts
│
├── app.ts
└── server.ts
```

### Folder Responsibilities

| Folder        | Responsibility                                               |
| ------------- | ------------------------------------------------------------ |
| `config`      | Database and application configuration                       |
| `middlewares` | Authentication, API key validation and global error handling |
| `models`      | Shared database models                                       |
| `modules`     | Feature-based business modules                               |
| `routes`      | Root application routing                                     |
| `utils`       | Reusable helper utilities                                    |
| `app.ts`      | Express application configuration                            |
| `server.ts`   | Application entry point                                      |

---

# Installation

## Prerequisites

Make sure the following tools are installed on your machine:

- Node.js (v20 or later recommended)
- pnpm
- MongoDB Atlas account (or local MongoDB instance)
- Git

---

## Clone the Repository

```bash
git clone https://github.com/ARYAN0-work/API-STORE.git

cd API-STORE
```

---

## Install Dependencies

```bash
pnpm install
```

---

## Configure Environment Variables

Create a `.env` file in the project root.

```bash
cp .env.example .env
```

Update the variables:

```env
MONGO_URI=
JWT_SECRET=
PORT=
```

---

## Run the Development Server

```bash
pnpm dev
```

If the MongoDB connection is successful, you'll see logs similar to:

```
Connecting to MongoDB...
Database connected successfully!
Server is listening on port 5000
```

---

## Production Build

Compile the TypeScript project:

```bash
pnpm build
```

Run the compiled application:

```bash
pnpm start
```

---

## Available Scripts

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `pnpm dev`      | Start development server with hot reload |
| `pnpm build`    | Compile TypeScript into JavaScript       |
| `pnpm start`    | Run compiled production build            |
| `pnpm lint`     | Run ESLint                               |
| `pnpm lint:fix` | Automatically fix lint issues            |
| `pnpm format`   | Format the project using Prettier        |

# API Endpoints

The API is versioned using the `/api/v1` prefix.

---

## Health Check

| Method | Endpoint   | Authentication | Description                       |
| ------ | ---------- | -------------- | --------------------------------- |
| GET    | `/api/v1/` |                | Verify that the server is running |

---

## Authentication

| Method | Endpoint                | Authentication | Description                          |
| ------ | ----------------------- | -------------- | ------------------------------------ |
| POST   | `/api/v1/auth/register` |                | Register a new user                  |
| POST   | `/api/v1/auth/login`    |                | Authenticate a user and return a JWT |

---

## API Key Management

| Method | Endpoint                      | Authentication | Description                                               |
| ------ | ----------------------------- | -------------- | --------------------------------------------------------- |
| POST   | `/api/v1/api-keys/generate`   | JWT            | Generate a new API Key                                    |
| GET    | `/api/v1/api-keys`            | JWT            | Retrieve all API Keys belonging to the authenticated user |
| PATCH  | `/api/v1/api-keys/:id/toggle` | JWT            | Activate or deactivate an API Key                         |
| DELETE | `/api/v1/api-keys/:id`        | JWT            | Delete an API Key                                         |

---

## Protected APIs

| Method | Endpoint          | Authentication | Description                                 |
| ------ | ----------------- | -------------- | ------------------------------------------- |
| GET    | `/api/v1/api/...` | API Key        | Access protected APIs using a valid API Key |

---

## Authentication Headers

### JWT Authentication

Include the JWT token in the `Authorization` header.

```http
Authorization: Bearer <jwt_token>
```

---

### API Key Authentication

Include the API key in the request headers.

```http
x-api-key: api_key
```

# The HTTP Status Codes i used

| Status Code | Meaning                       |
| ----------- | ----------------------------- |
| 200         | Request successful            |
| 201         | Resource created successfully |
| 400         | Bad request                   |
| 401         | Unauthorized                  |
| 429         | Too many requests             |
| 500         | Internal server error         |

# Security & Design Decisions

---

## JWT Authentication

JWT (JSON Web Token) is used to authenticate users after a successful login.

### Why JWT?

The generated token contains the authenticated user's identifier and is required to access protected endpoints.

---

## Password Security

User passwords are **never stored in plain text**.

Passwords are hashed using **bcrypt** before being stored in MongoDB.

Benefits:

- Prevents password leakage
- One-way hashing

---

## API Key Security

Generated API Keys are **never stored directly** inside the database.

This ensures that even if the database is compromised, original API Keys cannot be recovered.

---

## Environment Variables

Sensitive configuration values are stored inside environment variables.

Examples include:

- MongoDB connection string
- JWT Secret
- Server Port

The `.env` file is ignored using Git, while `.env.example` documents the required configuration for contributors.

---

## Global Error Handling

A centralized error handling middleware is used to provide consistent error responses throughout the application.

---

## Feature-Based Architecture

Instead of organizing files by type, the project follows a feature-based architecture.

Each feature owns its:

- Routes
- Controller
- Service
- Model

This improves maintainability and allows new modules to be added without affecting existing features.

---

## Controller → Service → Model Pattern

Business logic is intentionally separated into layers.

### Controller

- Receives HTTP requests
- Validates incoming data
- Returns HTTP responses

### Service

- Contains business logic
- Coordinates database operations
- Handles validations
- Communicates with utilities

### Model

- Represents database schemas
- Performs MongoDB operations using Mongoose

---

### ESLint

Used to detect potential bugs and enforce coding standards.

### Prettier

Automatically formats the codebase to maintain a consistent style.

### Husky

Runs Git hooks before every commit.

### lint-staged

Ensures only staged files are linted and formatted before committing.

Together, these tools help maintain a clean and consistent codebase throughout development.

---

## Rate Limiting

API Keys maintain usage information including request count and request window.

Each request:

- Validates the API Key
- Checks the request count
- Resets the window after one hour
- Rejects requests exceeding the configured limit with **HTTP 429 (Too Many Requests)**

This protects APIs from abuse and excessive usage.

---

# Author

**Aryan Mishra**

MERN-Stack Developer | Computer Science Student

- GitHub: https://github.com/ARYAN0-work
- LinkedIn: https://www.linkedin.com/in/aryan-mishra-501428367

---

# Acknowledgements

Special thanks to the open-source community and the creators of the tools and libraries that made this project possible:

- Node.js
- Express.js
- TypeScript
- MongoDB & Mongoose
- JSON Web Token (JWT)
- bcrypt
- ESLint
- Prettier
- Husky
- pnpm

---

## Testing

All endpoints were tested using Insomnia.
