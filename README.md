# Customer Microservice

This microservice is a core component of the **Car Sales API** architecture, responsible for handling customer identity, authentication, profiles, and domain data management[cite: 1, 4].

## Features

- **Authentication & Security:** User registration (signup) and login with JWT session tokens and secure password hashing (bcrypt + salt)[cite: 1, 3].
- **Profile Management:** Retrieval of complete customer profiles including delivery addresses[cite: 3, 4].
- **Domain Data Ownership:** Acts as the single source of truth for customer-embedded data such as the shopping cart, wishlist, and order history[cite: 4].

## Architecture & Design Patterns

To ensure maintainability and high software engineering standards, this service implements:
- **Clean Code** principles and strict domain boundaries[cite: 1, 4].
- **Repository Pattern** to isolate database operations.
- **Dependency Injection** for modular and testable components.

## Tech Stack

- **Runtime:** Node.js[cite: 1]
- **Framework:** Express.js[cite: 1]
- **Database:** MongoDB with Mongoose ODM[cite: 1]
- **Security:** JSON Web Tokens (JWT) & bcryptjs[cite: 1, 3]
- **Containerization:** Docker & Docker Compose[cite: 1]
