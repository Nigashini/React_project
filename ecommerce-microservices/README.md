# Spring Boot E-Commerce Microservices

A complete 4-service Spring Boot microservices ecosystem featuring Service Discovery, API Gateway, JPA Persistence, and Inter-Service Communication via OpenFeign.

---

## 🏗️ Architecture

```
                                  +-----------------------+
                                  |     API Gateway       |
                                  |     (Port: 8080)      |
                                  +-----------+-----------+
                                              |
                   +--------------------------+--------------------------+
                   | (routes /products/**)                               | (routes /orders/**)
                   v                                                     v
      +-------------------------+                           +-------------------------+
      |     Product Service     | <---- OpenFeign Client - |      Order Service      |
      |      (Port: 8081)       |      (Service Name)       |      (Port: 8082)       |
      +------------+------------+                           +------------+------------+
                   |                                                     |
                   +--------------------------+--------------------------+
                                              |
                                   (Registers with Eureka)
                                              v
                                  +-----------------------+
                                  |     Eureka Server     |
                                  |     (Port: 8761)      |
                                  +-----------------------+
```

---

## 🛠️ Microservices Included

| Service Name | Port | Description | Database / Tool |
|---|---|---|---|
| **`eureka-server`** | `8761` | Service Registry & Discovery Server | Spring Cloud Netflix Eureka Server |
| **`product-service`** | `8081` | Product Catalog CRUD REST API | Spring Data JPA + H2 In-Memory DB |
| **`order-service`** | `8082` | Order Placement API + OpenFeign product lookup | Spring Data JPA + H2 + OpenFeign |
| **`api-gateway`** | `8080` | Unified Entry Point routing `/products/**` and `/orders/**` | Spring Cloud Gateway + Eureka Client |

---

## 🚀 How to Run locally

### Prerequisites
- **Java 21** or higher
- **Maven 3.9+**

### Launch Order
Run each service in a separate terminal tab in this order:

1. **Eureka Server**:
   ```bash
   cd eureka-server
   mvn spring-boot:run
   ```
2. **Product Service**:
   ```bash
   cd product-service
   mvn spring-boot:run
   ```
3. **Order Service**:
   ```bash
   cd order-service
   mvn spring-boot:run
   ```
4. **API Gateway**:
   ```bash
   cd api-gateway
   mvn spring-boot:run
   ```

---

## 🧪 Testing REST Endpoints (via Gateway `:8080`)

### 1. Create a Product
```bash
curl -X POST http://localhost:8080/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Wireless Mouse", "price": 29.99, "quantity": 50}'
```

### 2. Get All Products
```bash
curl http://localhost:8080/products
```

### 3. Place an Order
```bash
curl -X POST http://localhost:8080/orders \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2, "customerName": "Alice"}'
```

### 4. Get All Orders
```bash
curl http://localhost:8080/orders
```
