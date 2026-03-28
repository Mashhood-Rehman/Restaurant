# Driver Workflow Design Plan

This document outlines the architecture and workflow for the relationship between **Drivers**, **Customers**, and **Orders** in our microservices-based restaurant platform.

---

## 🏗️ Architectural Overview

To ensure scalability (handling 100s of orders per driver per day) and maintain a clean separation of concerns, we will distribute responsibilities across our services:

### 1. **Auth Service (Identity)**
- **Role**: Manages the core `User` profile.
- **Riders**: Users with the `rider` role.
- **Data**: Basic profile (name, email, phone). The relation `orders Order[]` in your schema helps link historical data, but for real-time dispatching, we should use the **Driver Service**.

### 2. **Orders Service (Order Lifecycle)**
- **Role**: Source of truth for order details and status.
- **Statuses**: `Pending` → `Preparing` → `Rider_Assigned` → `In_Delivery` → `Delivered`.
- **Driver Link**: Stores the `driverId` (the `id` from Auth Service) when a rider is assigned.

### 3. **Driver Service (Real-time Presence & Status)**
- **Role**: Tracks rider availability (`ACTIVE` vs `OFFLINE`), current location, and their **assigned active workload**.
- **Data model**:
  ```prisma
  model DriverState {
    id          Int      @id // Syncs with User ID from Auth
    status      Status   @default(OFFLINE) // Enum: ACTIVE, OFFLINE, ON_DELIVERY
    lastLocation Json?    // Current Lat/Lng
    activeOrders Int      @default(0) // Tracks current load
  }
  ```

---

## 🔄 The Assignment Workflow

Since a driver might handle many orders, we need a robust communication loop between `Orders Service` and `Driver Service`.

### Phase 1: Order Placement
1. **Customer** places an order via `Orders Service`.
2. Order status is set to `Pending`.
3. `Orders Service` emits an event: `ORDER_CREATED`.

### Phase 2: Rider Discovery (The Dispatcher)
- **Option A (Auto-assign)**: The `message-service` or a worker listens for `ORDER_CREATED`. It queries `Driver Service` for available riders in the area with status `ACTIVE` and Capacity < Max.
- **Option B (Marketplace)**: `Orders Service` broadcasts to `Driver Service`, which then pushes notifications to all nearby `ACTIVE` riders' mobile apps.

### Phase 3: Assignment & Acceptance
1. Once a rider accepts or is assigned:
   - `Orders Service` updates `driverId` and status to `Rider_Assigned`.
   - `Driver Service` increments the rider's `activeOrders` count.
2. The **Customer** is notified (via `message-service`).

---

## 🔗 Entity Relationships

| Entity | Service | Key Relationships |
| :--- | :--- | :--- |
| **User (Rider)** | `auth-service` | Foundational profile. Linked to `DriverState`. |
| **DriverState** | `driver-service` | Current status/location. Linked to `Orders` current lifecycle. |
| **Order** | `orders-service` | Linked to `customerId` and `driverId`. |

### Performance Note (Scaling to 100s of Orders)
- **Denormalization**: Do NOT store every historical order in the `User` model's direct relations for daily operations. It will make the object too large. Use a separate `DeliveryHistory` or query `Orders` by `driverId`.
- **Active Orders Queue**: Keep a separate table or Redis key for "Active Deliveries" (e.g., `driver:123:active_tasks`). Move them to "Historical" once `Delivered`.
- **Indexing**: Ensure `driverId` and `status` are indexed in the `Order` table for fast lookups of a driver's daily history.

---

## 🚀 Suggested API Endpoints (Driver Service)

- `GET /status`: Get your current status (Active/Offline).
- `PATCH /status`: Toggle availability.
- `GET /active-orders`: List orders currently being delivered by the authenticated driver.
- `POST /update-location`: Real-time location push for maps.

---

## ✅ Next Steps for Implementation
1. **Sync Auth ID**: Ensure `DriverState` in `driver-service` uses the same `Int` ID as the `User` in `auth-service`.
2. **Define a Messaging Standard**: Choose how services talk (e.g., `REST` for immediate needs, `Events/RabbitMQ` for updates).
3. **Setup Redis**: Highly recommended for the real-time location/status of "Active" drivers to keep the main DB load low.
