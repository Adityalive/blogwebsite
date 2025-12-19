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
* **MongoDB**: NoSQL database for storing blog posts (assumed).

---

## 📂 Project Structure

The project is organized into two main directories:

* `client1/` - Contains the Frontend React application.
* `server/` - Contains the Backend Node.js/Express API.

---

## 🛠️ Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed:
* [Node.js](https://nodejs.org/) (v14 or higher)
* [npm](https://www.npmjs.com/) (Node Package Manager)
* [MongoDB](https://www.mongodb.com/) (Locally or Atlas connection string)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Adityalive/blogwebsite.git](https://github.com/Adityalive/blogwebsite.git)
    cd blogwebsite
    ```

2.  **Setup Backend (Server):**
    ```bash
    cd server
    npm install
    ```
    *Create a `.env` file in the `server` directory and add your variables (e.g., MONGODB_URI, PORT).*

3.  **Setup Frontend (Client):**
    ```bash
    cd ../client1
    npm install
    ```

---

## 🏃‍♂️ Running the Application

To run the application, you will need to start both the backend and frontend servers.

**1. Start the Server:**
Open a terminal in the `server` directory:
```bash
npm start
# or if you have nodemon installed
npm run dev
