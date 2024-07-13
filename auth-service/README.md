# Interview Microservice Challenge (Auth service) 

```bash
╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱
╱╱                                             ╱╱
╱╱  ╭━━━╮╱╱╱╱╱╱╱╱╭╮╭━━╮╱╱╱╭╮                   ╱╱
╱╱  ┃╭━╮┃╱╱╱╱╱╱╱╱┃┃┃╭╮┃╱╱╱┃┃                   ╱╱
╱╱  ┃╰━━┳━━┳━━┳┳━╯┃┃╰╯╰┳━━┫╰━┳━┳━━┳╮╭┳┳━━┳━╮   ╱╱
╱╱  ╰━━╮┃╭╮┃┃━╋┫╭╮┃┃╭━╮┃╭╮┃╭╮┃╭┫╭╮┃╰╯┣┫╭╮┃╭╮╮  ╱╱
╱╱  ┃╰━╯┃╭╮┃┃━┫┃╰╯┃┃╰━╯┃╭╮┃┃┃┃┃┃╭╮┃┃┃┃┃╭╮┃┃┃┃  ╱╱
╱╱  ╰━━━┻╯╰┻━━┻┻━━╯╰━━━┻╯╰┻╯╰┻╯╰╯╰┻┻┻┻┻╯╰┻╯╰╯  ╱╱
╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱
```

### Technologies used in this project:
   * NodeJs
   * Nest.js
   * JWT
   * Postgresql
   * Prisma
   * Kafka
   * Redis
   * DDD architecture
   * CQRS
   * i18n
   * Docker


Welcome to Interview Microservice Challenge (Auth service)! This README will guide you through setting up the project, accessing documentation, understanding the database design and backend architecture, as well as explaining the backend routes and sample APIs.

## Table of Contents

1. [Backend Architecture](#backend-architecture)
2. [Installation](#installation)
3. [Database Design](#database-design)
4. [Accessing Swagger Documentation](#accessing-swagger-documentation)

## Backend Architecture

The backend architecture of this project follows the principles of Domain-Driven Design (DDD) and Clean Architecture. The architecture is structured into layers, including:

- **Presentation Layer**: Controllers, decorators, DTOs, and OpenAPI.
- **Application Layer**: Interfaces, mapping, service (commands, queries, utilities), and use cases.
- **Domain Layer**: Domain models and services (factories, repositories).
- **Infrastructure Layer**: Interfaces, localization, and modules.

### Project Architecture

This document outlines the architecture of the project.

### Presentation Layer

The presentation layer deals with the user interface. It includes the following components:

- Controllers: Handle incoming requests.
- Decorators: Add functionality to classes or methods.
- DTOs (Data Transfer Objects): Exchange data between layers.
- OpenAPI: Document the API.

### Application Layer

The application layer contains the business logic of the application. It consists of the following components:

- Interfaces: Define contracts.
- Mapping: Transform data between layers.
- Service:
  - Commands: Execute specific actions.
  - Queries: Retrieve data.
  - Utilities: Common functionality.
- Use Cases: Represent high-level actions.

### Domain Layer

The domain layer represents the core domain logic of the application. It includes the following components:

- Services:
  - Factories: Create domain objects.
  - Repositories: Persist and retrieve domain objects.

### Infrastructure Layer

The infrastructure layer provides support to the upper layers. It includes the following components:

- Interfaces: Define contracts with external systems.
- Localization: Handle internationalization and localization concerns.
- Modules: Encapsulate reusable infrastructure components.

Each layer is responsible for specific concerns, and the sublayers help organize and manage the complexity of the application architecture. This architecture follows the principles of Domain-Driven Design (DDD) and CQRS (Command Query Responsibility Segregation), which promote a clear separation of concerns and maintainability of the codebase.

## Installation

### Local Installation

To run the project locally, follow these steps:

1. Clone the repository to your local machine:

   ```bash
      git clone https://github.com/sbahramian/interview-microservice-challenge.git
   ```

2. Navigate to the project directory:

   ```bash
      cd interview-microservice-challenge/auth-service
   ```

3. Install dependencies:

   ```bash
      npm install --legacy-peer-deps
   ```

4. Please create `.env` file. you can use from sample `.env.example`:

   ```bash
      IS_DEVELOPMENT=
      LOG_LEVEL=
      LOG_PRETTY=
      JWT_SLAT=
      POSTGRESQL_DATABASE_URL=
      REDIS_DB=
      REDIS_HOST=
      REDIS_USER=
      REDIS_PASS=
      REDIS_PORT=
      KAFKA_BROKERS=
      KAFKA_ID=
      ADMIN_EMAIL=
      ADMIN_PASSWORD=
   ```
5. Pushing Prisma Schema to the Database:

   This command will generate the Prisma Client based on the schema defined in your Prisma schema file.
   To push the Prisma schema to the database, ensuring that the database schema matches the schema defined in your Prisma schema file, run the following command in your terminal:

   ```bash
      npx prisma generate
   ```
6. This command will apply any pending migrations and update the database schema accordingly.

   ```bash
      npx prisma db push
   ```

7. Start the server:

   ```bash
      npm run start:dev
   ```

8. If get this error:
```bash
   Oops! Something went wrong! :(

   ESLint: 8.57.0

   ESLint couldn't find a configuration file. To set up a configuration file for this project, please run:

      npm init @eslint/config

   ESLint looked for configuration files in /interview-challenge/src/auth/application/guards and its ancestors. If it found none, it then looked in your home directory.

   If you think you already have a configuration file or if you need more help, please stop by the ESLint Discord server: https://eslint.org/chat
```
Please add this file `.eslintrc.js`:
```bash
   module.exports = {
      parser: '@typescript-eslint/parser',
      parserOptions: {
         project: 'tsconfig.json',
         tsconfigRootDir: __dirname,
         sourceType: 'module',
      },
      plugins: [
         '@typescript-eslint/eslint-plugin',
         'prettier'
      ],
      extends: [
         'plugin:@typescript-eslint/recommended',
         'plugin:prettier/recommended',
      ],
      root: true,
      env: {
         node: true,
         jest: true,
      },
      ignorePatterns: ['.eslintrc.js'],
      rules: {
         '@typescript-eslint/interface-name-prefix': 'off',
         '@typescript-eslint/explicit-function-return-type': 'off',
         '@typescript-eslint/explicit-module-boundary-types': 'off',
         '@typescript-eslint/no-explicit-any': 'error',
         'prettier/prettier': 'error',
      },
   };
```

## Database Design

```bash
   User table:
      Columns:
         id (Primary Key, autoincrementing integer)
         username (String)
         password (String)
         email (String)
         avatar (String, nullable)
         firstName (String)
         lastName (String)
         createdAt (DateTime, defaulting to current timestamp)
         updatedAt (DateTime, updating automatically)
      Unique constraints on username and email
      Indexes on createdAt and updatedAt columns
```

## How to Run Seed

To execute the seed, such as for tokens, follow these steps:

1. Run the following command:
   ```bash
   npm run start:repl
   ```

2. Execute the following command in the REPL (Read-Eval-Print Loop):
   ```typescript
   await get(AdminSeederService).ImportSeederAdmin()
   ```

This will initialize the seeding process for tokens.

### Docker Installation

Coming soon.

## Accessing Swagger Documentation

Once the server is running, you can access the Swagger documentation by navigating to:

```
   http://localhost:3000/doc/v1#/
```

This will open up the Swagger UI, where you can explore and interact with the available APIs.
