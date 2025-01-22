

# Inventory Management Microservice

A NestJS-based Inventory Management API to efficiently manage stock levels for retail stores. This microservice supports high-frequency requests and includes thread-safe updates for inventory management.

## Features

- **Get Stock Level**: Fetch current stock levels for a product.
- **Update Stock**: Adjust stock levels based on incoming events.
- **Order Management**:
  - Confirm orders by reserving stock.
  - Cancel reservations and return stock to inventory.
- **Low Stock Alert**: Trigger alerts when stock drops below a predefined threshold.

---

## API Endpoints

### 1. **Get Stock Level**
   - **URL**: `/inventory/stock-levels/:productId`
   - **Method**: `GET`
   - **Description**: Returns the current stock level for a product.
   - **Response**:
     ```json
     {
       "productId": "string",
       "quantity": "number",
       "lastUpdated": "ISO 8601 timestamp"
     }
     ```

### 2. **Update Stock**
   - **URL**: `/inventory/update-stock`
   - **Method**: `POST`
   - **Description**: Updates stock based on an event.
   - **Request Body**:
     ```json
     {
       "eventType": "stockUpdate",
       "productId": "string",
       "quantity": "number",
       "timestamp": "ISO 8601 timestamp"
     }
     ```
   - **Response**: Success message.

### 3. **Reserve Order**
   - **URL**: `/inventory/reserve-order/:productId`
   - **Method**: `PUT`
   - **Description**: Reserves stock for an order.
   - **Request Body**:
     ```json
     {
       "orderId": "string",
       "quantity": "number"
     }
     ```

### 4. **Cancel Reservation**
   - **URL**: `/inventory/cancel-reservation/:productId`
   - **Method**: `PUT`
   - **Description**: Cancels a reservation and returns stock to inventory.
   - **Request Body**:
     ```json
     {
       "orderId": "string",
       "quantity": "number"
     }
     ```

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the environment variables:
Create a .env file in the root directory. Use env example. Create DB with same name as well

4. Run the application:
  ```bash 
  npm run start:dev
  ```

* Once the application starts, open your browser and navigate to:
  ```
  http://localhost:3836/docs
  ```
  to view the Swagger API documentation and explore the available endpoints interactively.


## Running Tests

1. Run unit tests:
  ```bash
  npm run test
  ```

## Technologies Used
* Framework: NestJS
* Database: PostgreSQL (with TypeORM)
* Testing: Jest and Supertest
* Others: Express.js, Swagger for API documentation

