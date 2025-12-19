# 📝 Blog Website

A full-stack blogging platform built using the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to read and manage blog posts through a responsive user interface backed by a robust REST API.

## 🚀 Tech Stack

**Client:**
* **React.js**: For building the user interface.
* **HTML/CSS**: For structure and styling.
* **JavaScript**: Logic and interactivity.

**Server:**
* **Node.js**: Runtime environment.
* **Express.js**: Web framework for the backend API.
* **MongoDB**: NoSQL database for storing blog posts.

---

## 🏗️ Architecture

This project follows a **Client-Server Architecture** pattern, utilizing a Monorepo structure where both frontend and backend reside in the same repository but function as distinct entities.

### High-Level Overview

1.  **Frontend (`client1/`)**:
    * Built with **React.js**.
    * Acts as a Single Page Application (SPA).
    * Responsible for rendering the UI and handling user interactions.
    * Communicates with the backend server via HTTP requests (REST API).

2.  **Backend (`server/`)**:
    * Built with **Node.js** and **Express.js**.
    * Acts as the REST API provider.
    * Handles business logic, routing, and data validation.
    * Connects to the **MongoDB** database to perform CRUD (Create, Read, Update, Delete) operations.

3.  **Database**:
    * **MongoDB** stores the actual data (users, blog posts, comments) in JSON-like documents.

### Data Flow

```text
[ User Browser ]  <--->  [ React Frontend ]  <--->  [ Express API ]  <--->  [ MongoDB ]
    (UI/UX)                (client1 folder)          (server folder)        (Database)
