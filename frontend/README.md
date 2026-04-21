# URL Shortener

A full-stack URL shortener with link expiry, click tracking, and analytics.

## Features

- Shorten any valid URL instantly
- Automatic duplicate detection
- Set custom expiry in days for each link
- Click tracking on every redirect
- Analytics endpoint with click count and creation date
- Responsive UI built with React and Tailwind CSS

## Tech Stack

**Frontend:** React.js, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB Atlas  

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account

### Installation

1. Clone the repository
```bash
   git clone https://github.com/akshadawagadare/url-shortener.git
```

2. Setup Backend
```bash
   cd backend
   npm install
```

3. Create a `.env` file in backend folder
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
4. Start Backend
```bash
   npm start
```

5. Setup Frontend
```bash
   cd frontend
   npm install
   npm run dev
```

6. Open `http://localhost:5173` in your browser

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/shorten` | Create a short URL |
| GET | `/:shortCode` | Redirect to original URL |
| GET | `/analytics/:shortCode` | Get click analytics |