# Snaplink 🔗

A fast and minimal URL shortener built with React, Node.js/Express, and MongoDB.

---

## Tech Stack

**Frontend:** React, JavaScript, CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  

---

## Features

- 🔗 Shorten long URLs instantly
- 📋 Copy short links with one click
- 🚀 Fast redirects
- 📊 Click tracking & analytics per link
- ⏳ Optional link expiration (set expiry in days)
- ✅ URL validation before saving
- 🔁 Duplicate detection — same URL returns the existing short link
- 💾 Persistent storage with MongoDB

---

## Project Structure

```
snaplink/
├── backend/
│   ├── routes/
│   │   └── urlRoutes.js
│   ├── models/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Snaplink/
│   │   ├── pages/
│   │   │   └── HomePage.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/akshadawagadare/snaplink.git
cd snaplink
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5000
```

Start the backend server:

```bash
npm start
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173`

---

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port for the backend server |
| `MONGO_URI` | MongoDB connection string |
| `BASE_URL` | Base URL used for generating short links |

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/url/shorten` | Create a short URL |
| `GET` | `/api/url/analytics/:shortCode` | Get analytics for a short URL |
| `GET` | `/:shortCode` | Redirect to the original URL |

### POST `/api/url/shorten`

**Request Body:**
```json
{
  "originalUrl": "https://example.com/very-long-url",
  "expiresInDays": 7
}
```

> `expiresInDays` is optional. Omit it for a link that never expires.

**Response:**
```json
{
  "shortUrl": "http://localhost:5000/aB3xY",
  "expiresAt": "2024-02-01T00:00:00.000Z"
}
```

### GET `/api/url/analytics/:shortCode`

**Response:**
```json
{
  "originalUrl": "https://example.com/very-long-url",
  "shortCode": "aB3xY",
  "clicks": 42,
  "createdAt": "2024-01-25T00:00:00.000Z",
  "expiresAt": "2024-02-01T00:00:00.000Z"
}
```

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## License

[MIT](LICENSE)