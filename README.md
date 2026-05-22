# GuidWay Backend

Backend service for **GuidWay**, a mentoring marketplace platform where users can discover mentors, book sessions, communicate in real-time, and manage mentoring workflows.

Built with **TypeScript**, **Express.js**, **Prisma**, and a scalable clean architecture approach.

---

## Overview

GuidWay is designed as a marketplace platform connecting mentors and learners.

This backend handles:

* Authentication & authorization
* Mentor and user management
* Session booking workflows
* Real-time communication support
* Video session integration
* Chat management
* Secure API handling
* Scalable database operations
* File storage integrations
* Email notifications

The project follows a modular and maintainable architecture focused on scalability and separation of concerns.

---

## Tech Stack

### Core Technologies

* **Node.js**
* **TypeScript**
* **Express.js**
* **Prisma ORM**
* **PostgreSQL**
* **Redis**

### Authentication & Security

* JWT Authentication
* Passport.js
* Google OAuth 2.0
* Argon2 / Bcrypt
* Helmet
* Cookie-based authentication

### Infrastructure & Utilities

* AWS S3
* Nodemailer
* Winston Logger
* Zod Validation
* InversifyJS (Dependency Injection)
* Biome (Linting & Formatting)

---

## Features

### Authentication System

* User signup & login
* JWT-based authentication
* Refresh token handling
* Google OAuth authentication
* Secure password hashing
* Cookie-based session management

### Mentor Marketplace

* Mentor profile management
* Mentor discovery system
* Session scheduling
* Booking management
* Availability handling

### Communication

* Real-time chat support
* Video session support
* Email notifications

### Platform Management

* Role-based access control
* Validation & error handling
* Logging system
* Scalable architecture

---

## Project Structure

```bash
Guidway-backend/
│
├── prisma/                # Prisma schema & database configuration
├── src/
│   ├── application/       # Application services/use cases
│   ├── domain/            # Core business logic & entities
│   ├── infrastructure/    # External services & implementations
│   ├── presentation/      # Controllers, routes, middleware
│   ├── shared/            # Shared utilities & helpers
│   └── main.ts            # Application entry point
│
├── .husky/                # Git hooks
├── package.json
├── tsconfig.json
└── biome.json
```

> The structure may evolve as the project grows.

---

## Architecture

This project follows a **clean and scalable backend architecture**.

### Main Principles

* Separation of concerns
* Dependency injection
* Modular service organization
* Maintainable business logic
* Testable architecture
* Scalable API structure

### Architectural Layers

| Layer          | Responsibility                    |
| -------------- | --------------------------------- |
| Domain         | Business entities and core rules  |
| Application    | Use cases and business workflows  |
| Infrastructure | Database, external APIs, services |
| Presentation   | Routes, controllers, middleware   |

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Aswinkl1/Guidway-backend.git
```

### 2. Move Into the Project

```bash
cd Guidway-backend
```

### 3. Install Dependencies

Using pnpm:

```bash
pnpm install
```

---

## Environment Variables

Create a `.env` file in the root directory.

Example:

```env
PORT=5000
DATABASE_URL=
JWT_SECRET=
REFRESH_TOKEN_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
REDIS_URL=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=
EMAIL_USER=
EMAIL_PASS=
```

> Add all required environment variables based on your local setup.

---

## Database Setup

### Generate Prisma Client

```bash
pnpm prisma generate
```

### Run Database Migrations

```bash
pnpm prisma migrate dev
```

---

## Running the Project

### Development Mode

```bash
pnpm dev
```

### Production Build

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

---

## Available Scripts

| Script            | Description                  |
| ----------------- | ---------------------------- |
| `pnpm dev`        | Run development server       |
| `pnpm build`      | Build TypeScript project     |
| `pnpm start`      | Start production server      |
| `pnpm lint`       | Run Biome checks             |
| `pnpm lint:fix`   | Fix linting issues           |
| `pnpm type-check` | Run TypeScript type checking |

---

## API Design

The backend is designed around RESTful API principles.

Typical modules include:

* Authentication
* Users
* Mentors
* Sessions
* Bookings
* Messaging
* Notifications

---

## Security Practices

* Password hashing with Argon2/Bcrypt
* Secure JWT authentication
* Protected routes
* Input validation using Zod
* HTTP security using Helmet
* Cookie protection
* Environment variable isolation

---

## Scalability Considerations

This backend is structured to support future scaling requirements:

* Modular architecture
* Redis caching support
* Dependency injection
* External storage support (AWS S3)
* Centralized logging
* Strong validation layer
* Type-safe development

---

## Development Tools

### Code Quality

* Biome
* TypeScript strict typing
* Husky Git hooks
* Lint-staged

### Logging

* Winston logger integration

---

## Future Improvements

Potential future enhancements:

* WebSocket-based real-time communication
* Payment gateway integration
* Advanced search & filtering
* Admin analytics dashboard
* Recommendation system
* Docker support
* CI/CD pipeline
* Automated testing suite

---

## Repository

[GuidWay Backend Repository](https://github.com/Aswinkl1/Guidway-backend)

---

## Author

Developed by urlAswinkl1 GitHub Profile[https://github.com/Aswink](https://github.com/Aswinkl1)
