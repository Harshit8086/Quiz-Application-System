# 🏆 Quizify - Full-Stack Quiz Application

A professional, modern quiz platform designed for seamless learning and competitive assessment. Built with a high-performance **Spring Boot** backend and a stunning **Glassmorphic** frontend.

![Spring Boot](https://img.shields.io/badge/backend-Spring--Boot-6DB33F?logo=springboot)
![MySQL](https://img.shields.io/badge/database-MySQL-4479A1?logo=mysql)
![Frontend](https://img.shields.io/badge/frontend-HTML--CSS--JS-E34F26?logo=html5)

---

## ✨ Features

- 🔐 **Secure Authentication**: JWT-based login and signup system with Spring Security.
- 📊 **Dynamic Dashboard**: Personalized user stats and performance tracking.
- 🏆 **Global Leaderboard**: Real-time ranking of top performers.
- 📱 **Mobile-First Design**: Fully responsive UI with a premium Glassmorphic aesthetic.
- ⚡ **Real-time Scoring**: Instant feedback and score calculation post-quiz.
- 🛠️ **RESTful API**: Professional-grade API architecture for scalability.

---

## 🛠️ Tech Stack

### Backend
- **Java 21**
- **Spring Boot** (Security, Data JPA, Web)
- **JWT (JSON Web Token)** for stateless authentication
- **MySQL** Database
- **Maven** for dependency management

### Frontend
- **HTML5 & Vanilla CSS3** (Custom Design System)
- **JavaScript (ES6+)** for dynamic interactions
- **Glassmorphism UI** with smooth transitions and micro-animations

---

## 📂 Project Structure

```bash
.
├── backend/            # Spring Boot Project
│   ├── src/            # Source code (Java)
│   ├── pom.xml         # Maven dependencies
│   └── ...
├── frontend/           # Frontend Web Assets
│   ├── Src/            # HTML, CSS, JS source files
│   ├── assets/         # Images, videos, and icons
│   └── ...
├── .gitignore          # Git exclusion rules
└── README.md           # Documentation
```

---

## 🚀 Getting Started

### Prerequisites
- JDK 21 or higher
- MySQL Server
- Maven (optional, if using `mvnw`)

### 1. Database Setup
1. Create a database named `quiz` in MySQL.
2. Update `backend/src/main/resources/application.properties` with your MySQL credentials.

### 2. Backend Setup
```bash
cd backend
# Create application.properties from example if needed
# Set environment variables or update application.properties
./mvnw spring-boot:run
```

### 3. Frontend Setup
Simply open `frontend/Src/index.html` in your browser or serve it using a local live server (e.g., Live Server extension in VS Code).

---

## 🐳 Docker Deployment (Recommended)

The easiest way to run the entire stack (Frontend, Backend, and Database) is using Docker Compose.

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### Steps
1. **Clone the repository.**
2. **Start the application:**
   ```bash
   docker-compose up --build
   ```
3. **Access the app:**
   - **Frontend:** http://localhost
   - **Backend API:** http://localhost:8080/api

---

## 📸 Screenshots
*(Add your screenshots here later)*

---

## 🔮 Future Improvements
- [ ] Add support for multiple quiz categories.
- [ ] Implement a timer for each quiz question.
- [ ] Social sharing features for quiz results.
- [ ] Dark mode toggle.
- [ ] Integrate Docker for one-click deployment.


**Developed with ❤️ by [Harshit](https://github.com/Harshit8086)**
