# Rick and Morty Explorer

A React application that allows users to explore characters and episodes from the Rick and Morty series using the official Rick and Morty GraphQL API. Built with React, TypeScript, Chakra UI, Apollo Client and AG Grid.

## Features

- 🔐 User authentication system
- 📊 Interactive data tables with AG Grid
- 🔍 Search and filter functionality
- 📝 Pagination controls
- 🎨 Responsive design with Chakra UI
- 🚀 GraphQL integration with Apollo Client

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Chakra UI](https://chakra-ui.com/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [AG Grid](https://www.ag-grid.com/)
- [React Router](https://reactrouter.com/)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>

```
2. Navigate to project directory
```bash
cd rick-and-morty
```

3. Install dependencies
```bash
npm install
```

4. Generate GraphQL types
```bash
npm run codegen
```
5. Start the development server
```bash
npm run dev
```

The application will start at http://localhost:5173

### Login Credentials
Use these credentials to log into the application:

- Username: **admin**
- Password: **password**

### Features in Detail
- Characters Page: Browse, search, and filter Rick and Morty characters
- Episodes Page: Explore all episodes with detailed information
- Authentication: Protected routes with login functionality
- Responsive Design: Works on both desktop and mobile devices
