# YouApp Backend Test

## 🚀 How to Start the Project

### 🔧 Without Docker

1. Make sure **MongoDB** and **Node.js v20 or higher** are installed.
2. Run `npm install` in the root folder.
3. Create and fill in a `.env` file (see `.env.example`).
4. Run the project with:
   npm run start:dev

---

### 🐳 With Docker

Run the following in the root folder:

docker-compose up --build

---

## 📘 API Documentation

- API docs available at:  
  `http://{serverURL}:3000/api`

## ⚙️ Configuration

- **HTTP Server Port**: `3000`
- **WebSocket Port**: `5000`  
  WebSocket URL: `ws://{serverURL}:5000`

---

## 🔌 WebSocket Events

| Event Name              | Description                           |
| ----------------------- | ------------------------------------- |
| `exception`             | Exception thrown by the server        |
| `connect_error`         | Connection error to WebSocket         |
| `error`                 | Error during communication            |
| `receivePrivateMessage` | Subscribe to receive private messages |
| `sendPrivateMessage`    | Emit this to send a private message   |

---
