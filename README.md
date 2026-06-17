# EcoCheck

A website carbon footprint calculator that analyzes the environmental impact of websites and provides sustainability insights.

## Overview

EcoCheck helps users understand the carbon footprint of their websites. By analyzing page performance, resource usage, and energy consumption, it provides data-driven insights for reducing digital emissions.

**Features:**
- Carbon footprint analysis with real-time calculations
- Interactive reports with historical tracking
- API endpoints for integration
- Rate-limited endpoints for reliability
- Consulting services

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB
- npm or yarn

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/ecocheck.git
cd ecocheck
```

**2. Setup Server**
```bash
cd server
npm install
```

Create `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecocheck
CLIENT_ORIGIN=http://localhost:5173
NODE_ENV=development
```

Start the server:
```bash
npm run dev  # Development with nodemon
npm start    # Production
```

API runs at `http://localhost:5000`

**3. Setup Client**
```bash
cd client
npm install
npm run dev
```

App runs at `http://localhost:5173`

## Project Structure

```
ecocheck/
├── server/                 # Express.js + MongoDB backend
│   ├── config/            # Database configuration
│   ├── routes/            # API endpoints
│   ├── middleware/        # Rate limiting, error handling
│   ├── utils/             # Utilities
│   └── server.js          # Entry point
├── client/                # React + Vite frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Route pages
│   │   └── App.jsx        # Root component
│   └── index.html         # HTML entry
└── README.md
```

## Tech Stack

### Frontend
- React 19
- Vite 8
- Tailwind CSS 4
- DaisyUI 5
- Recharts 3 (charts)
- React Router 7
- Axios
- React Icons 5

### Backend
- Express 5
- MongoDB 7
- Mongoose 9 (ODM)
- Puppeteer 25 (browser automation)
- @tgwf/co2 (carbon calculations)
- Helmet 8 (security)
- CORS
- Express Rate Limit
- dotenv
- Nodemon

## API Endpoints

### Analyze Website
```bash
POST /api/carbon/analyze
Content-Type: application/json

{
  "url": "https://example.com"
}
```

Response:
```json
{
  "url": "https://example.com",
  "carbonEmissions": 1.24,
  "unit": "grams",
  "pageSize": 2048000,
  "loadTime": 2.5,
  "timestamp": "2026-06-17T10:30:00Z"
}
```

### Get Reports
```bash
GET /api/carbon/reports
```

Response:
```json
{
  "reports": [
    {
      "url": "https://example.com",
      "carbonEmissions": 1.24,
      "createdAt": "2026-06-17T10:30:00Z"
    }
  ]
}
```

## Security

- Helmet.js for HTTP security headers
- CORS configuration
- Rate limiting on all endpoints
- 1KB request size limit
- Secure error handling (stack traces hidden in production)
- URL validation

## Pages

| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Carbon calculator |
| Reports | `/reports` | Analysis history and trends |
| How It Works | `/how-it-works` | Methodology and explanations |
| FAQ | `/faq` | Common questions |
| Consultancy | `/consultancy` | Consulting services |

## Development

### Available Scripts

**Server:**
```bash
npm run dev      # Development with auto-reload
npm start        # Production
```

**Client:**
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint
```

### Environment Variables

**Server (.env):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecocheck
CLIENT_ORIGIN=http://localhost:5173
NODE_ENV=development
```

### Linting

```bash
npm run lint          # Run ESLint
npm run lint -- --fix # Fix linting issues
```

## How It Works

1. User submits a website URL
2. Puppeteer fetches and analyzes the page
3. @tgwf/co2 calculates emissions based on data transfer and energy consumption
4. Results are stored in MongoDB
5. Reports are displayed with visualizations

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

ISC License

## Support

- Open an issue on GitHub for bug reports and feature requests
- Check the FAQ page for common questions
