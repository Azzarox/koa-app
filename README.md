
# Koa App API

A RESTful API built with **Koa.js** and **Knex.js** using PostgreSQL, featuring JWT authentication, user–book relationships, unit and integration tests and Docker for the database.

---

## Requirements

* Node.js (LTS recommended)
* npm
* Docker & Docker Compose

---
## Quick Start

Get the project running in a few commands:

```bash
# Clone repository
git clone <repository-url>
cd <project-folder>

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env to match docker-compose.yml credentials

# Start database
docker-compose up

# Run migrations
npm run migrations

# (Optional) Seed database
npm run seeds

# Start the server
npm start
```

Your API will be available at `http://localhost:{PORT}/v1`.

---

## Tech Stack

* Typescript
* Koa.js
* Knex.js
* PostgreSQL
* Jest
* Docker

---

## Project Structure

```
├─ /src
│  ├─ /controllers          # Request handlers for API endpoints
│  ├─ /schemas              # Validation Schemas
        └─ models/             # Database models derived from validation schemas
│  ├─ /routes               # Route definitions
│  ├─ /middlewares          # Custom middleware functions
│  ├─ /services             # Business logic and utilities
├─ /migrations              # Database migration scripts
├─ /seeds                   # Database seed scripts
├─ /tests                   # Unit and integration test setup
├─ .env.example             # Example environment variables for development
├─ .env.test.example        # Example environment variables for testing
├─ docker-compose.yml
├─ docker-compose.test.yml
├─ package.json
└─ README.md
```
---
## Scripts

* `npm start` – Starts the application server.
* `npm run build` – Builds the application into the `./dist` directory.
* `npm run migrations` – Runs all database migrations from the `/migrations` folder.
* `npm run seeds` – Runs all database seed files from the `/seeds` folder.

---

## Environment Configuration

Before running the application, environment variables must be configured:

1. Create a `.env` file in the project root.
2. Use `.env.example` as a reference.
3. Ensure all values match the `environment` configuration defined in `docker-compose.yml`.

---

## Database Setup

The project uses **PostgreSQL databases running inside Docker containers**. There are **two separate databases**:

* **Main database** – Used for development.
* **Test database** – Used exclusively for running tests.

### Main Database Setup

1. Configure environment variables in `.env`.
2. Start the main database container:

   ```bash
   docker-compose up
   ```
3. Run migrations:

   ```bash
   npm run migrations
   ```
4. (Optional) Seed initial data:

   ```bash
   npm run seeds
   ```

### Test Database Setup

1. Configure environment variables in `.env.test`.
2. Start the test database container:

   ```bash
   docker-compose -f docker-compose.test.yml up
   ```
3. Run tests:

   ```bash
   npm test
   ```

4. Run tests with coverage:

   ```bash
   npm run test:coverage
   ```
---

## API Endpoints

Base URL: `/v1`
Swagger UI is available at: `http://localhost:{PORT}/v1/docs`

**Note:** The term *"selected"* refers to the resource identified by the `:id` parameter. All endpoints requiring authentication use **Bearer JWT**.

### Authentication

| Method | Endpoint            | Description                                       |
| ------ | ------------------- | ------------------------------------------------- |
| POST   | `/v1/auth/register` | Register a new user (roles: USER, AUTHOR)         |
| POST   | `/v1/auth/login`    | Authenticate a user and return a JWT access token |

### Books

| Method | Endpoint        | Description                              |
| ------ | --------------- | ---------------------------------------- |
| GET    | `/v1/books/all` | Retrieve all books (admin/public)        |
| GET    | `/v1/books/:id` | Retrieve a selected book                 |
| GET    | `/v1/books`     | Retrieve books owned by the current user |
| POST   | `/v1/books`     | Create a new book                        |
| PUT    | `/v1/books/:id` | Update a selected book                   |
| DELETE | `/v1/books/:id` | Delete a selected book                   |

### Users

| Method | Endpoint                          | Description                                                  |
| ------ | --------------------------------- | ------------------------------------------------------------ |
| GET    | `/v1/users/:id/books`             | Retrieve all books for a selected user                       |
| POST   | `/v1/users/books/:id`             | Add a selected book to the currently authenticated user      |
| DELETE | `/v1/users/books/:id`             | Remove a selected book from the currently authenticated user |
| POST   | `/v1/users/:userId/books/:bookId` | Add any selected book to any selected user                   |
| DELETE | `/v1/users/:userId/books/:bookId` | Remove any selected book from any selected user              |
---