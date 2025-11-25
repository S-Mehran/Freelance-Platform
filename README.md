# Freelancer Platform Backend (Node.js + TypeScript)

This repository contains the backend codebase for a **Freelancer Marketplace Platform**.  
It includes secure authentication using OTP, user role separation (Client, Freelancer, Admin), job posting features, and protected routes.

---

## 📌 Features Overview

### 🔐 Authentication & Security
- OTP verification through **Mailtrap**
- JWT-based login sessions
- Bcrypt password hashing
- Request validation (DTO + Validators)
- Role-based route authorization

### 👤 User Roles
- **Client** – Create/Update/Delete job posts, view own posts
- **Freelancer** – Browse posts, (future: proposals)
- **Admin** – (future: system-level control)

### 🧱 Job Post Features
- Create a job post  
- Update a job post  
- Delete a job post  
- Get all posts belonging to the logged-in client (**Get My Posts**)  
- Full authorization (only owners can modify posts)

---

## 📸 API Testing Screenshots

All test screenshots are stored inside:


### **OTP and Authentication**
![Mailtrap OTP](./Portfolio%20Samples/Mailtrap%20OTP%20code.png)

![Confirm OTP](./Portfolio%20Samples/Postman%20Confirm%20OTP.png)

![Create User](./Portfolio%20Samples/Postman%20Create%20User.png)

![Create User 2](./Portfolio%20Samples/Postman%20Create%20User%20.png)

![Login User](./Portfolio%20Samples/Postman%20Login%20User.png)

---

### **Job Post Operations**
#### Create Post  
![Create Post](./Portfolio%20Samples/Postman%20Create%20Post.png)

#### Update Post  
![Update Post](./Portfolio%20Samples/Postman%20Update%20Post.png)

#### Delete Post  
![Delete Post](./Portfolio%20Samples/Postman%20Delete%20Post.png)

#### Unauthorized Delete (Client not owner)  
![Unauthorized Delete](./Portfolio%20Samples/Postman%20Delete%20Post%20failed%20from%20Unauthorized%20client.png)

---

### **General API Menu**
![Postman Menu](./Portfolio%20Samples/Postman%20Menu.png)

---

## 📂 Folder Structure

```plaintext
src
├── controllers
│   ├── auth.controller.ts
│   ├── job-post.controller.ts
│   └── user.controller.ts
│
├── dto
│   ├── confirm-otp.dto.ts
│   ├── job-post.dto.ts
│   ├── login.dto.ts
│   ├── reset-password.dto.ts
│   ├── send-otp.dto.ts
│   ├── update-user.dto.ts
│   └── user.dto.ts
│
├── entity
│   ├── User.ts
│   ├── admin.ts
│   ├── client.ts
│   ├── freelancer.ts
│   ├── job-post.ts
│   ├── proposal.ts
│   └── index.ts
│
├── enum
│   ├── bid-type.enum.ts
│   ├── level-of-expertise.enum.ts
│   ├── project-type.enum.ts
│   ├── proposal-status.enum.ts
│   └── user-roles.enum.ts
│
├── helpers
│   ├── catch-async.helper.ts
│   ├── encrypt.helper.development.ts
│   ├── encrypt.helper.ts
│   └── unique-validation.ts
│
├── middleware
│   ├── validators
│   │   ├── authentication.ts
│   │   ├── authorization.ts
│   │   ├── get-client-post-authorization.ts
│   │   ├── job-post.validator.ts
│   │   ├── login.validator.ts
│   │   ├── post-authorization.ts
│   │   ├── send-otp.validator.ts
│   │   ├── update-post-authorization.ts
│   │   └── user.validator.ts
│   └── index.ts
│
├── migration
│   ├── 1760272087258-users.ts
│   ├── 1760289365746-users.ts
│   ├── 1760874287327-users.ts
│   └── 1762603085409-users.ts
│
├── repository
│   └── index.ts
│
├── routes
│   ├── auth.routes.ts
│   ├── job-post.route.ts
│   ├── protected.routes.ts
│   └── user.routes.ts
│
├── service
│   ├── client.service.ts
│   ├── freelancer.service.ts
│   ├── job-post.service.ts
│   ├── mail.service.ts
│   ├── proposal.service.ts
│   ├── protected.service.ts
│   └── user.service.ts
│
├── data-source.ts
└── index.ts

```
# 🛠 Tech Stack

-   **Node.js**
-   **Express.js**
-   **TypeScript**
-   **PostgreSQL**
-   **TypeORM**
-   **Supabase (Optional)**
-   **Nodemailer + Mailtrap**
-   **JWT + Bcrypt**
-   **Postman for API Testing**

------------------------------------------------------------------------

# 🔗 API Endpoints Overview

## **Authentication**

  Method   Endpoint                 Description
  -------- ------------------------ ---------------------
  POST     `/auth/register`         Register a new user
  POST     `/auth/send-otp`         Send OTP to email
  POST     `/auth/confirm-otp`      Confirm OTP code
  POST     `/auth/login`            Login user
  POST     `/auth/reset-password`   Reset password

------------------------------------------------------------------------

## **Client Job Post Routes**

  Method   Endpoint                 Description
  -------- ------------------------ ---------------------------------------
  POST     `/client/job-post`       Create a new job post
  PATCH    `/client/job-post/:id`   Update own job post
  DELETE   `/client/job-post/:id`   Delete own post
  GET      `/client/my-posts`       Get posts created by logged-in client

------------------------------------------------------------------------

## **Freelancer Routes**

  Method   Endpoint                  Description
  -------- ------------------------- --------------------------
  GET      `/freelancer/job-posts`   View available job posts

------------------------------------------------------------------------

# ⚙️ Setup & Installation

## 1️⃣ Clone the repository

``` bash
git clone <repo-url>
cd freelancer-backend
```

## 2️⃣ Install dependencies

``` bash
npm install
```

## 3️⃣ Environment variables

Create a `.env` file:

``` ini
DATABASE_URL=postgres://...
JWT_SECRET=...
MAILTRAP_USER=...
MAILTRAP_PASS=...
```

## 4️⃣ Run migrations

``` bash
npm run typeorm migration:run
```

## 5️⃣ Start development server

``` bash
npm run dev
```

------------------------------------------------------------------------

# 🧩 Future Enhancements

-   Proposal system\
-   Real-time notifications\
-   Admin dashboards\
-   Payment integration\
-   Project milestones & messaging

------------------------------------------------------------------------

# 👨‍💻 Author

**Mehran Shah**\
Backend Developer --- Node.js \| TypeScript \| SQL \| Supabase

