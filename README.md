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
- [**Orders Service**](https://github.com/IanSpeelman/FikaFinds-orders): Manages order processing

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
git clone https://github.com/IanSpeelman/FikaFinds-orders.git
```

### 3. Environment Setup

Create a `.env` file in the root directory and copy it to the UI folder:

```env
DBPASS=<database password>
DBUSER=<database user>

DBPRODUCTS=products
DBUSERS=users
DBORDERS=orders

PRODUCTSDBHOST=products-database
USERSDBHOST=users-database
ORDERSHOST=orders-database

PRODUCTSDBPORT=5432
USERSDBPORT=5433
ORDERSDBPORT=5434

JWTSECRET=<JWT secret>

VITE_PRODUCT_HOST=http://<your local ip>:3000
VITE_AUTHENTICATION_HOST=http://<your local ip>:3001
VITE_ORDERS_HOST=http://<your local ip>:3002
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
    depends_on:
      - products
      - orders
      - authentication
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
    hostname: 0.0.0.0
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
    hostname: 0.0.0.0
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

  orders:
    build: ./FikaFinds-orders
    ports:
      - "3002:3002"
    hostname: 0.0.0.0
    volumes:
      - ./FikaFinds-orders/src:/app/src/
    env_file:
      - .env
    depends_on:
      orders-database:
        condition: service_healthy
      products-database:
        condition: service_healthy
    develop:
      watch:
        - path: ./FikaFinds-orders
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

  orders-database:
    image: postgres:13.16
    ports:
      - "${ORDERSDBPORT}:5432"
    volumes:
      - "./db3:/var/lib/postgresql/data"
    environment:
      POSTGRES_PASSWORD: ${DBPASS}
      POSTGRES_USER: ${DBUSER}
      POSTGRES_DB: ${DBORDERS}
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DBUSER} -d ${DBORDERS}"]
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
