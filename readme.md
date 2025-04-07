# Link Shortener Application

A modern URL shortening service built with React and Node.js that allows users to create shortened links and track their usage.

## Features

- URL shortening with custom aliases
- User authentication system
- Admin dashboard
- Link analytics and tracking
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or remote connection)
- npm or yarn package manager

## Project Structure

```
├── client/          # Frontend React application
├── server/          # Backend Node.js server
│   ├── models/      # Database models
│   ├── routes/      # API routes
│   └── middleware/  # Custom middleware
```

## Environment Setup

### Server Configuration

Create a `.env` file in the server directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/linksh3
BASE_URL=http://localhost:5000
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## Installation

1. Clone the repository
2. Install server dependencies:
   ```bash
   npm install
   ```
3. Install client dependencies:
   ```bash
   cd client
   npm install
   ```

## Running the Application

### Start the Server

In the root folder:
```bash
npm run server
```
The server will start on http://localhost:5000

### Start the Client

In the client directory:
```bash
npm run dev
```
The client application will be available at http://localhost:3000

## Initial Setup

### Register Admin Account

To create the first admin account, visit:
```
http://localhost:3000/admin/register
```

## Usage

1. Register an account or log in
2. Enter a URL to shorten
3. Optionally customize the alias
4. Share your shortened URL

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/url/shorten` - Create shortened URL
- `GET /:code` - Redirect to original URL

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Suggested Contributions

Here's a list of features that the community can implement:

### High Priority
- Link Tagging System
  - Add custom categories to links
  - Filter and search by tags
  - Hierarchical tag organization

- Advanced Analytics
  - Usage graphs by time period
  - Geographic click analysis
  - Data export in multiple formats

### Medium Priority
- Social Media Integration
  - Direct social media sharing
  - Link preview functionality
  - Customizable share buttons

- Link Customization
  - Visual themes for redirect pages
  - Password-protected links
  - Scheduled link expiration

### Low Priority
- Security Features
  - Malicious link scanning
  - Two-factor authentication
  - Detailed activity logging

- Performance Optimizations
  - Popular links caching
  - Database query optimization
  - Data compression

To contribute:
1. Review existing issues or create a new one
2. Discuss your proposal in the issue
3. Follow standard contribution guidelines
4. Submit a Pull Request

## License

This project is licensed under the MIT License.