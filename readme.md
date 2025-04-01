# Employee-Leave-Management-System

A full-stack Employee Leave Management System built with NestJS, Angular, TypeScript, and PostgreSQL to manage employee leave requests efficiently.

## 🚀 Features

### 🔑 User Authentication
- Register and Login  
- JWT-based authentication  
- Role-based access (Employee and Admin)  
- Protected routes  

### 📌 Leave Management
- **Employee Features**:  
  - Apply for a leave  
  - View personal leave history (Leave Dashboard)  
  - Fields:  
    - **Employee Name** (Required, max 100 characters)  
    - **Leave Type** (Required, one of: `Sick Leave`, `Casual Leave`, `Earned Leave`)  
    - **Start Date** (Required, format: `YYYY-MM-DD`)  
    - **End Date** (Required, format: `YYYY-MM-DD`)  

- **Admin Features**:  
  - View all leave requests (Leave Request Dashboard)  
  - Update leave status (Pending, Approved, Rejected)  


---

## 🛠 Tech Stack

### Backend
- **NestJS**  
- **PostgreSQL**  
- **TypeORM**  
- **JWT Authentication**  
- **Class Validator**  
- **DTOs (Data Transfer Objects)**  

### Frontend
- **Angular**  
- **TypeScript**  
- **Angular Material**  
- **Reactive Forms**  
- **Angular Router**  
- **HttpClient**  

---

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)  
- npm  
- PostgreSQL database  

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
 ```bash
    npm install
```
3. Create a `.env` file in the backend directory with the following variables:
   ```
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=your_password
    DB_NAME=leave_management
    JWT_SECRET=your_jwt_secret
    ```
4. Start the development server:
   ```bash
   npm run start:dev
   ```

5. The backend API will be available at http://localhost:8000


### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
 ```bash
    ng serve
```
4. The frontend application will be available at http://localhost:4200


## API Documentation

The complete API documentation is available on Postman:
[Employee-Leave-Management-System API Documentation](https://documenter.postman.com/preview/43270454-7d6f4276-0ed5-4650-a0c6-73f6ba5faaac?environment=&versionTag=latest&apiName=CURRENT&version=latest&documentationLayout=classic-double-column&documentationTheme=light&logo=https%3A%2F%2Fres.cloudinary.com%2Fpostman%2Fimage%2Fupload%2Ft_team_logo%2Fv1%2Fteam%2Fanonymous_team&logoDark=https%3A%2F%2Fres.cloudinary.com%2Fpostman%2Fimage%2Fupload%2Ft_team_logo%2Fv1%2Fteam%2Fanonymous_team&right-sidebar=303030&top-bar=FFFFFF&highlight=FF6C37&right-sidebar-dark=303030&top-bar-dark=212121&highlight-dark=FF6C37)


# 📽️ Employee-Leave-Management-System - Demo Video  

Watch the demo of the **Job Application Tracker**:  
🔗 **[Click here to watch the demo](https://drive.google.com/file/d/1EZtZ62cnswPSZ8qk8gGLzPphP3hH7SF_/view?usp=sharing)** 

