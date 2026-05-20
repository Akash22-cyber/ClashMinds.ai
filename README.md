# ClashMinds.ai 🧠⚔️

**ClashMinds.ai** is an advanced AI-powered debating platform that enables users to participate in structured, real-time debates with intelligent AI opponents.  
The platform includes a **“Practice with Bot”** mode featuring voice-based debates, timed speaking rounds, and live AI responses to help users improve communication, critical thinking, and argument-building skills.

---

# ✨ Features

- 🎙️ **Voice-Based AI Debates**  
  Practice debates with an AI bot using real-time voice interaction.

- ⏱️ **30-Second Speaking Windows**  
  Structured turn-based debate system with timed speaking rounds.

- 🔄 **Real-Time Communication**  
  Instant synchronization powered by WebSockets.

- 🤖 **AI-Powered Responses**  
  Integrated with Google GenAI SDK for intelligent debate generation.

- 🔐 **Authentication & RBAC**  
  Secure authentication using JWT and role-based authorization using Casbin.

- 📊 **Interactive UI/UX**  
  Modern and responsive interface built with Tailwind CSS and Radix UI.

- 🎉 **Engaging Experience**  
  Includes animations, charts, and interactive visual elements.

---

# 🚀 Tech Stack

## Frontend
- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Radix UI
- **State Management:** Jotai
- **Routing:** React Router DOM
- **Animations & Visualization:** React Spring, Recharts, React Confetti

## Backend
- **Framework:** Go (Gin Web Framework)
- **Database:** MongoDB
- **Caching / PubSub:** Redis
- **Real-Time Communication:** Gorilla WebSocket
- **Authentication:** JWT
- **Authorization:** Casbin (RBAC)
- **AI Integration:** Google GenAI SDK
- **Speech Transcription:** Python-based transcription service

---

# 📋 Prerequisites

Make sure the following are installed before running the project:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Go](https://go.dev/) (v1.24 or higher)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Python 3](https://www.python.org/)

---

# 📁 Project Structure

```bash
ClashMinds.ai/
│
├── frontend/          # React frontend
├── backend/           # Go backend
├── README.md
│
└── ...
```

---

# 🛠️ Setup & Installation

## 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
cd ClashMinds.ai
```

---

# ⚙️ Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

## Install Go Dependencies

```bash
go mod download
```

## Configure Environment Variables

Create a `.env` file inside the backend directory and add:

```env
MONGO_URI=your_mongodb_uri
REDIS_URL=your_redis_url
GOOGLE_API_KEY=your_google_api_key
JWT_SECRET=your_jwt_secret
```

## Start Backend Server

```bash
go run cmd/server/main.go
```

Backend server will run on the configured port.

---

# 💻 Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

Frontend will typically run at:

```bash
http://localhost:5173
```

---

# 🔊 Speech Transcription Service

The project includes a Python-based transcription service for handling voice input.

Make sure Python dependencies are installed before running the transcription module.

Example:

```bash
pip install -r requirements.txt
```

---

# 🔐 Security Features

- JWT-based Authentication
- Role-Based Access Control (RBAC) using Casbin
- Secure WebSocket communication
- Environment-based secret management

---

# 📡 Real-Time Architecture

ClashMinds.ai uses WebSockets for:

- Live debate synchronization
- Real-time AI responses
- Timer updates
- Voice interaction events

---

# 🎯 Use Cases

- Debate practice for students
- Public speaking improvement
- AI-powered communication training
- Interview preparation
- Critical thinking exercises

---

# 📸 Future Enhancements

- Multiplayer debate rooms
- AI performance analytics
- Debate history & scoring
- Speech emotion analysis
- Leaderboards and rankings

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Developed with ❤️ by the ClashMinds.ai Team
