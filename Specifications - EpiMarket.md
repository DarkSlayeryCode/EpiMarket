# Specifications — EpiMarket MVP

## 1 - Context & Problem Statement

In many schools, students sell products (drinks, pastries, snacks, services).

Currently:

* Visibility is achieved through word-of-mouth
* Orders are placed via WhatsApp or in person
* There is no structured inventory management
* No order tracking

This creates a lack of:

* organization
* visibility
* traceability
* professionalism

---

## 2 - Project Objective

Create a **responsive web platform** that allows:

* Student sellers to create a digital storefront
* To manage their products and inventory
* Buyers (often students/administration) to view products
* To place orders via an integrated form

Payment will be made:

* in cash
* or via local services (outside the platform for the MVP)

---

## 3 - Target Audience

* Student sellers
* Student buyers
* Administration members/buyers
* Eventually: several institutions

---

## 4 - Technical Stack Recommended

### Backend

* Django REST Framework

### Frontend

To get started:

* Django Templates
* HTML / CSS
* Bootstrap or Tailwind

Scalable option:

* React

### Database

* PostgreSQL

### Deployment - CI/CD

* Docker / Docker Compose
* GitHub Actions / Jenkins / Travis
* Deployment to:

* Render / Vercel / NameChap / Name.com / .tech Domains

---

## 5 - Features

### Authentication

* Seller registration
* Customer registration
* Login
* Role management (seller / customer / admin)

---

### Seller side

* Create a seller profile
* Add a product:

* Name
* Description
* Price
* Photo
* Quantity available
* Edit a product
* Delete a product
* Modify stock Daily
* View received orders
* Mark an order as:

* Pending
* Confirmed
* Delivered

---

### Customer Side

* View seller list
* View a seller's products
* Search for a product
* Place an order via form

* Quantity
* Delivery location
* Preferred time
* View past orders

---

### Admin Side

* View all users (sellers + buyers)
* Deactivate a seller
* Delete content - accounts (users and sellers)

---

## 6 - Future Features

* Integrated payment (Stripe or local solution)
* Multi-school (isolated by school)
* Statistics dashboard:

* Total sales
* Best-selling product
* Review and rating system
* Notifications
* Mobile application
