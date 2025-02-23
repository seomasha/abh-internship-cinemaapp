# Atlantbh Internship - Cinema App by Sead Mašetić

CinemaApp is a web-based ticketing application that allows users to purchase movie tickets online for a specific movie company with multiple subsidiaries across the country or world. The application offers an intuitive user interface and a range of services to make the movie-going experience seamless and convenient.

The backend of CinemaApp is built using **Spring Boot** to handle core functionalities such as user management, booking systems, and business logic. The frontend is developed using **React**, created with **Vite**, for an interactive and responsive user experience. A **PostgreSQL** database serves as the data management layer for handling user information, ticket bookings, and movie data across different subsidiaries.

## Frontend Dependencies Used

The following dependencies have been installed for the frontend part of the CinemaApp:

- **axios:** Promise-based HTTP client for making requests to the backend API.
- **Material-UI:** A popular React UI framework that provides a set of customizable components to build responsive and modern user interfaces.
- **Bootstrap:** A CSS framework that helps in designing responsive and mobile-first websites.
- **Formik:** A library for building forms in React, making form handling and validation easier.
- **Yup:** A JavaScript schema builder for value parsing and validation.
- **React Router:** A library for routing in React applications, allowing navigation between different components and views.
- **React icons:**: A library containing various types of icons.
- **React Toastify:** Library for showing toast notifications.
- **rsuite:** Library with Date pickers.

## Backend Dependencies Used

The following dependencies have been included for the backend part of the CinemaApp:

- **Spring Web:** Provides features to create web applications, including RESTful services.
- **Spring Data JPA:** Provides integration with JPA and simplifies database access.
- **Spring Security:** A framework for securing the application with authentication and authorization.
- **Spring Boot Devtools:** Enhances the development experience by enabling automatic restarts and live reloads.
- **PostgreSQL Driver:** JDBC driver to connect the Spring Boot application to a PostgreSQL database.
- **Lombok:** A library that helps reduce boilerplate code by using annotations.
- **Swagger:** A tool for documenting APIs, making it easier to understand and test the backend services.

## How to Run the Application

### Prerequisites

Ensure you have the following installed on your system:

- **Java 23** (for the Spring Boot backend)
- **Node.js** and **npm** or **yarn** (for the React frontend)
- **PostgreSQL** (for the database)

### Backend (Spring Boot)

1. **Configure the Database**:

   - Make sure you have a running PostgreSQL instance.
   - In the `src/main/resources/application.properties` file, update the database connection details:

     ```properties
     spring.datasource.url=jdbc:postgresql://localhost:5432/your-database
     spring.datasource.username=your-username
     spring.datasource.password=your-password
     ```

2. **Run the Backend**:

   - Navigate to the backend directory (root of the Spring Boot project).
   - Compile and package the backend application:

     ```bash
     ./mvnw clean package
     ```

   - Run the application:

     ```bash
     ./mvnw spring-boot:run
     ```

   The backend should now be running on `http://localhost:8080`.

# Mock application.properties

- spring.datasource.url=jdbc:postgresql://localhost:5432/your_database_name
- spring.datasource.username=username
- spring.datasource.password=password
- server.servlet.context-path=/api/v1
- frontend.url=http://localhost:5173/
- jwt.secret=secret
- spring.jpa.hibernate.ddl-auto=update
- spring.profiles.active=local

# Mock .env (frontend)

- VITE_BACKEND_URL=http://localhost:8080
- VITE_API_PATH=/api/v1
- VITE_OMDB_URL=http://www.omdbapi.com/
- VITE_OMDB_API_KEY=key

### Frontend (React)

1. **Install Dependencies**:

   - Navigate to the frontend directory where the `package.json` file is located (your React project directory).
   - Install all necessary dependencies:

     ```bash
     npm install
     ```

   or if you're using Yarn:

   ```bash
   yarn install
   ```

2. **Run the Frontend**:

   - Start the development server:

     ```bash
     npm run dev
     ```

   or if you're using Yarn:

   ```bash
   yarn dev
   ```

   The frontend should now be running on `http://localhost:5173` (this is the default port used by Vite).

3. **Database example**:

- Download the db example: https://drive.google.com/file/d/1DfB15AllpLHGAcgoDdYCRL-Qo8DN9TwC/view?usp=drive_link

### Running the Application Together

Once both the frontend and backend are running, you can navigate to the frontend URL (`http://localhost:5173`), and it should interact with the backend API hosted at `http://localhost:8080`.
