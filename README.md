# Task Management Backend

A RESTful API for task management built with **Node.js**, **TypeScript**, **Express**, **Sequelize**, and **MySQL**.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- [npm](https://www.npmjs.com/) v8 or higher
- A running **MySQL** instance (local or cloud-hosted)

---

## Installation

```bash
# Clone the repository
git clone https://github.com/aeiyannn/Task_Management_backend.git
cd Task_Management_backend

# Install dependencies
npm install
```

---

## Environment Variables

Create a `.env` file in the project root (it is already listed in `.gitignore` so it will never be committed):

```env
# ── Database ──────────────────────────────────────────────
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=task_management
DB_DIALECT=mysql

# ── Application ───────────────────────────────────────────
NODE_ENV=development
```

| Variable     | Description                                          | Example value          |
|--------------|------------------------------------------------------|------------------------|
| `DB_HOST`    | MySQL server hostname or IP                          | `localhost`            |
| `DB_PORT`    | MySQL server port                                    | `3306`                 |
| `DB_USER`    | MySQL username                                       | `your_mysql_username`  |
| `DB_PASSWORD`| MySQL password                                       | `your_mysql_password`  |
| `DB_NAME`    | Name of the MySQL database to use                    | `task_management`      |
| `DB_DIALECT` | Sequelize dialect (`mysql` only)                     | `mysql`                |
| `NODE_ENV`   | Application environment (`development`/`production`) | `development`          |

> **Important:** All variables must be set in `.env` before starting the application. The app will fail to connect to the database if any of these values are missing or incorrect.

---

## Database Setup

### 1. Create the database

Connect to your MySQL server and create the database:

```sql
CREATE DATABASE task_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Run Migrations

Sequelize migrations are located in `Src/migrations/`. Run them in order to create all required tables:

```bash
npx sequelize-cli db:migrate
```

This will create the following tables:

| Migration file | Table(s) affected |
|---|---|
| `20240106110957-create-user-table.js` | `users` |
| `20240106122331-create-task-table.js` | `tasks` |
| `20240108060554-alter-table-tasks.js` | `tasks` (alter) |
| `20240108100812-alter-user-table.js`  | `users` (alter) |
| `20240114154830-alter-task-table.js`  | `tasks` (alter) |

> **Tip:** To roll back the last migration batch run `npx sequelize-cli db:migrate:undo`.

### 3. Database Connection

The database configuration lives in `config/database.ts`. Sequelize connects with SSL enabled by default (required for cloud-hosted MySQL instances such as Aiven). For a local MySQL instance without SSL, you can override the `dialectOptions` in that file or simply set the env variables to point at your local server.

---

## Running the Application

```bash
# Development mode (with auto-reload via nodemon)
npm start
```

The server starts on **port 3000** by default.  
You should see the following in the console once it is running:

```
Node.js running on port 3000
Connection has been established successfully.
```

---

## API Endpoints

All routes are prefixed with `/api`.

### Authentication — `/api/auth`

| Method | Endpoint          | Description              | Auth required |
|--------|-------------------|--------------------------|---------------|
| POST   | `/api/auth/signup`| Register a new user      | No            |
| POST   | `/api/auth/login` | Login and receive a JWT  | No            |

### Users — `/api`

| Method | Endpoint           | Description       | Auth required |
|--------|--------------------|-------------------|---------------|
| GET    | `/api/getallusers` | List all users    | No            |

### Tasks — `/api`

| Method | Endpoint                   | Description                          | Auth required        |
|--------|----------------------------|--------------------------------------|----------------------|
| POST   | `/api/addtask/:id`         | Create a task for user `id`          | Admin                |
| GET    | `/api/mytask/:id`          | Get tasks assigned to user `id`      | User (self)          |
| PUT    | `/api/updatestatus/:id`    | Update task status for task `id`     | User or Admin        |
| GET    | `/api/gettaskbyid/:id`     | Get all tasks for user `id`          | Admin                |
| GET    | `/api/getalltask`          | Get all tasks                        | Admin                |

#### Authentication header

Protected routes require a Bearer token obtained from `/api/auth/login`:

```
Authorization: Bearer <your_jwt_token>
```

---

## Project Structure

```
.
├── config/
│   └── database.ts         # Sequelize connection config (reads from .env)
├── middleware/
│   ├── middleware.ts        # User auth middleware
│   └── adminmiddleware.ts   # Admin auth middleware
├── Src/
│   ├── Controllers/         # Route handler logic
│   ├── database/            # Sequelize instance & connection
│   ├── migrations/          # Database migration files
│   ├── models/              # Sequelize model definitions
│   ├── route/               # Express route definitions
│   └── Validator/           # Request validation (Joi)
├── .env                     # ⚠ Not committed — create this yourself
├── .gitignore
├── index.ts                 # Application entry point
├── nodemon.json             # nodemon configuration
├── package.json
└── tsconfig.json
```
