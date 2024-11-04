# FikaFinds Products Service

## Overview

The Products Service is a crucial component of the FikaFinds e-commerce platform, handling all product-related operations. Built with Node.js and Express, this service provides RESTful APIs for product management.

## Features

- CRUD operations for products
- Product search and filtering
- Product inventory management

## Architecture

The application is part of a microservices architecture:

- [**FikaFinds UI**](https://github.com/IanSpeelman/FikaFinds-ui): Frontend interface built with React and Node.js
- [**Products Service(This repository)**](https://github.com/IanSpeelman/FikaFinds-products): Handles product-related CRUD operations
- [**Authentication Service**](https://github.com/IanSpeelman/FikaFinds-authentication): handles user authentication
- **Orders Service**: (Coming soon) Will manage order processing

## Prerequisites

- Node.js
- Docker
- Git

## API Endpoints

```
GET    /products            - Get all products
GET    /products/:id        - Get product by ID
POST   /products            - Create new product
PATCH  /products/edit/:id   - Update product
DELETE /products/:id        - Delete product
```

## Quick Start

### 1. Create Project Directory

**Linux/Mac:**

```bash
mkdir FikaFinds
cd FikaFinds
```

**Windows (Command Prompt):**

```cmd
mkdir FikaFinds
cd FikaFinds
```

### 2. Clone Repositories

```bash
git clone https://github.com/IanSpeelman/FikaFinds-ui.git
git clone https://github.com/IanSpeelman/FikaFinds-products.git
git clone https://github.com/IanSpeelman/FikaFinds-authentication.git
```

### 3. Environment Setup

Create a `.env` file in the root directory and copy it to the UI folder:

```env

DBPASS=<postgres-password-here>
DBUSER=<postgres-username-here>
DBPRODUCTS=<database-name-for-products-services>
DBUSERS=<database-name-for-users-service>
USERSDBHOST=users-database
PRODUCTSDBHOST=products-database
USERSDBPORT=5433
PRODUCTSDBPORT=5432
JWTSECRET=<jwt-secret-here>

VITE_AUTHENTICATION_HOST=http://localhost:3001
VITE_PRODUCT_HOST=http://localhost:3000
```

**Linux/Mac:**

```bash
cp .env FikaFinds-ui/.env
```

**Windows:**

```cmd
copy .env FikaFinds-ui\.env
```

### 4. Docker Compose Configuration

Create a `compose.yml` file in the root directory:

```yaml
services:
  frontend:
    build: ./FikaFinds-ui
    ports:
      - "5173:5173"
    volumes:
      - ./FikaFinds-ui/src:/app/src
    develop:
      watch:
        - path: ./FikaFinds-ui
          target: /
          ignore:
            - node_modules/
            - src/
          action: rebuild

  products:
    build: ./FikaFinds-products
    ports:
      - "3000:3000"
    volumes:
      - ./FikaFinds-products/src:/app/src/
    env_file:
      - .env
    depends_on:
      products-database:
        condition: service_healthy
    develop:
      watch:
        - path: ./FikaFinds-products
          target: /
          ignore:
            - node_modules/
            - src/
          action: rebuild

  authentication:
    build: ./FikaFinds-authentication
    ports:
      - "3001:3001"
    volumes:
      - ./FikaFinds-authentication/src:/app/src/
    env_file:
      - .env
    depends_on:
      users-database:
        condition: service_healthy
    develop:
      watch:
        - path: ./FikaFinds-authentication
          target: /
          ignore:
            - node_modules/
            - src/
          action: rebuild

  products-database:
    image: postgres:13.16
    ports:
      - "${PRODUCTSDBPORT}:5432"
    volumes:
      - "./db:/var/lib/postgresql/data"
    environment:
      POSTGRES_PASSWORD: ${DBPASS}
      POSTGRES_USER: ${DBUSER}
      POSTGRES_DB: ${DBPRODUCTS}
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DBUSER} -d ${DBPRODUCTS}"]
      interval: 10s
      retries: 5
      start_period: 30s
      timeout: 10s

  users-database:
    image: postgres:13.16
    ports:
      - "${USERSDBPORT}:5432"
    volumes:
      - "./db2:/var/lib/postgresql/data"
    environment:
      POSTGRES_PASSWORD: ${DBPASS}
      POSTGRES_USER: ${DBUSER}
      POSTGRES_DB: ${DBUSERS}
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DBUSER} -d ${DBUSERS}"]
      interval: 10s
      retries: 5
      start_period: 30s
      timeout: 10s
```

### 5. Start the Application

```bash
docker compose up
```

To run in detached mode:

```bash
docker compose up -d
```

To run in watch mode:

```bash
docker compose up --watch
```

## Development

### Local Development (Without Docker)

1. Install dependencies:

```bash
cd FikaFinds-products
npm install
```

2. Start development server:

```bash
npm run dev
```

### Docker Development

Build the image:

```bash
docker build -t FikaFinds-products .
```

Run the container:

```bash
docker run -p 3000:3000 FikaFinds-products
```

## Project Structure

```
FikaFinds-products/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.ts
│   └── index.ts
├── tests/
├── Dockerfile
└── package.json
```
