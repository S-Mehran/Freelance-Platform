# Freelancer Platform Backend (Node.js + TypeScript)

This repository contains the backend codebase for a Freelancer Marketplace Platform.  
It includes user authentication with OTP, role-based access control, job post management for clients, and initial modules for freelancers and admin.

---

## 🚀 Features

### **Authentication & Security**
- Email OTP verification using Mailtrap
- JWT-based authentication
- Bcrypt password hashing
- Request validation using DTOs
- Role-based authorization (Admin, Client, Freelancer)

### **Client Features**
- Create job posts  
- Update job posts  
- Delete job posts  
- Retrieve **My Posts**  
- Authorization ensures only owners can modify/delete posts

### **Freelancer Features**
- View available job posts  
- (Future) Submit proposals

### **Admin Features**
- Basic user management  
- (Future) Approvals & reporting system  

---

## 📸 API Testing Screenshots

Store the screenshots in a `screenshots/` directory.  
These are the tests performed using Postman:

### **OTP & Authentication**
- Mailtrap OTP code  
- Postman Create User  
- Postman Confirm OTP  
- Postman Login User  

### **Job Post Operations**
- Postman Create Post  
- Postman Update Post  
- Postman Delete Post  
- Postman Delete Post (Unauthorized — Failed)  

### **Client Route**
- Get My Posts (Client role)

### **General**
- Postman Menu (All routes)

> Add images using this format once in the repo:  
> `![Create User](./Portfolio Samples/Postman_Create_User.png)`  

---

## 🧱 Project Folder Structure

```plaintext
src
│
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
│   ├── protected.service.ts
│   └── user.service.ts
│
├── data-source.ts
└── index.ts
🛠 Tech Stack
Node.js

Express.js

TypeScript

PostgreSQL

TypeORM

Supabase (Optional)

Nodemailer (Mailtrap)

JWT & Bcrypt

Postman for testing

📌 API Endpoints Overview
Authentication
Method	Endpoint	Description
POST	/auth/register	Register a new user
POST	/auth/send-otp	Send OTP to email
POST	/auth/confirm-otp	Confirm OTP
POST	/auth/login	Login user
POST	/auth/reset-password	Reset password

Client Job Post Routes
Method	Endpoint	Description
POST	/client/job-post	Create a job post
PATCH	/client/job-post/:id	Update own post
DELETE	/client/job-post/:id	Delete own post
GET	/client/my-posts	Retrieve My Posts

Freelancer Routes
Method	Endpoint	Description
GET	/freelancer/job-posts	Browse job posts

⚙️ How to Run the Project
1. Clone the repository
bash
Copy code
git clone <repo-url>
cd freelancer-backend
2. Install dependencies
bash
Copy code
npm install
3. Configure environment variables
Create .env:

ini
Copy code
DATABASE_URL=postgres://...
JWT_SECRET=...
MAILTRAP_USER=...
MAILTRAP_PASS=...
4. Run migrations
bash
Copy code
npm run typeorm migration:run
5. Start development server
bash
Copy code
npm run dev
🧩 Future Enhancements
Proposal submission system (freelancers → client)

Notifications system (real-time)

Admin dashboard

Payment integration

👤 Author
Mehran Shah
Backend Developer (Node.js | TypeScript | PostgreSQL | Supabase)
