# Next.js + Payload CMS Project

A project built with Next.js v16 and Payload CMS v3 with Docker support for local development.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Docker](https://www.docker.com/get-started) and Docker Compose
- [Volta](https://volta.sh/) (recommended for Node.js version management) or Node.js v22.11.0
- [pnpm](https://pnpm.io/) v10.16.1 (optional, for local development without Docker)

**Note**: This project uses Volta for Node.js and pnpm version management. If you have Volta installed, it will automatically use the correct versions specified in `package.json`.

## Quick Start

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ruh-camp-website
```

### 2. Environment Variables Setup

Create a `.env` file in the project root (if it doesn't exist) with the following content:

```env
# Payload CMS Configuration
PAYLOAD_SECRET=your-secret-key-change-this-in-production

# MongoDB Connection
# Use 'mongo' as hostname to connect to MongoDB container
DATABASE_URI=mongodb://mongo:27017/payloadcms

# Next.js Configuration
NODE_ENV=development
PORT=3000
```

**Important**: Replace `PAYLOAD_SECRET` with a secure random key for production. You can generate one using:
```bash
openssl rand -base64 32
```

### 3. Run the project with Docker

The easiest way to run the project is using Docker Compose:

```bash
docker-compose up
```

This command will:
- Start the MongoDB container (internal port 27017, external port 27018)
- Start the Next.js application with Payload CMS on port `3000`
- Automatically install dependencies and start the dev server

**First time setup**: The first run may take a few minutes as Docker downloads the required images and installs dependencies.

After starting, open your browser and navigate to:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Payload Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

### 4. Run in background mode

To run containers in the background:

```bash
docker-compose up -d
```

View logs:
```bash
docker-compose logs -f
```

View logs for a specific service:
```bash
docker-compose logs -f payload
docker-compose logs -f mongo
```

Stop containers:
```bash
docker-compose down
```

### 5. Clean up data

If you need to completely clean MongoDB data:

```bash
docker-compose down -v
```

**Warning**: This will delete all data in MongoDB!

## Local Development without Docker

If you want to run the project locally without Docker:

### 1. Install Node.js and pnpm

If you're using Volta (recommended):
```bash
# Volta will automatically use versions from package.json
volta install node@22.11.0
volta install pnpm@10.16.1
```

If you're not using Volta:
```bash
# Install Node.js v22.11.0 using nvm or download from nodejs.org
nvm install 22.11.0
nvm use 22.11.0

# Install pnpm globally
npm install -g pnpm@10.16.1
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Setup MongoDB

You need to have a local MongoDB instance or use MongoDB Atlas. Update `DATABASE_URI` in `.env`:

```env
DATABASE_URI=
# or for MongoDB Atlas:
# DATABASE_URI=
```

### 4. Generate Payload types and import map

Before starting the dev server, generate the necessary files:

```bash
pnpm generate:types
pnpm generate:importmap
```

### 5. Start the dev server

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
ruh-camp-website/
├── app/                    # Next.js App Router
│   ├── (frontend)/        # Frontend routes
│   └── (payload)/         # Payload CMS routes
│       ├── admin/         # Admin panel
│       │   └── [[...segments]]/  # Admin routes (catch-all)
│       └── api/           # API routes
│           └── [...slug]/ # API catch-all route
├── collections/            # Payload CMS collections
│   ├── Users.ts
│   └── Media.ts
├── payload.config.ts      # Payload CMS configuration
├── docker-compose.yml     # Docker Compose configuration
├── .env                   # Environment variables (not in git)
└── package.json           # Dependencies and scripts
```

## Technologies

- **Next.js** v16.0.10 - React framework
- **Payload CMS** v3.68.5 - Headless CMS
- **MongoDB** - Database
- **TypeScript** v5 - Type safety
- **Tailwind CSS** v4 - Styling
- **Node.js** v22.11.0 - Runtime
- **pnpm** v10.16.1 - Package manager

## Useful Commands

### Docker Commands

```bash
# Start containers
docker-compose up

# Start in background
docker-compose up -d

# Stop containers
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f payload
docker-compose logs -f mongo

# Restart containers
docker-compose restart

# Rebuild containers
docker-compose up --build
```

### Development Commands

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Generate Payload types
pnpm generate:types

# Generate import map
pnpm generate:importmap
```

## Troubleshooting

### Port Already in Use

If you get an error that port 3000 or 27018 is already in use:

**For port 3000:**
```bash
# Find the process using port 3000
lsof -i :3000

# Kill the process (replace PID with actual process ID)
kill -9 <PID>

# Or kill all processes on port 3000
kill -9 $(lsof -t -i :3000)
```

**For port 27018 (MongoDB):**
```bash
# Find the process using port 27018
lsof -i :27018

# Kill the process
kill -9 $(lsof -t -i :27018)
```

**Note**: The MongoDB container uses port 27018 externally (to avoid conflicts), but internally uses 27017. The `DATABASE_URI` should always use `mongo:27017` when connecting from within Docker containers.

### MongoDB Connection Issues

Make sure that:
- MongoDB container is running: `docker-compose ps`
- `DATABASE_URI` uses `mongo` as hostname (for Docker) or `localhost` (for local development)
- Port 27018 (external) or 27017 (internal) is not occupied by another process
- Check MongoDB logs: `docker-compose logs mongo`

### Docker Container Issues

If containers fail to start:

```bash
# Check container status
docker-compose ps

# View detailed logs
docker-compose logs

# Rebuild containers
docker-compose up --build

# Remove and recreate containers
docker-compose down
docker-compose up
```

### Clearing node_modules

If you encounter dependency issues:

```bash
# With Docker
docker-compose down
docker volume rm ruh-camp-website_node_modules
docker-compose up

# Without Docker
rm -rf node_modules
pnpm install
```

### Payload CMS Issues

If the admin panel doesn't load:

1. Make sure `PAYLOAD_SECRET` is set in `.env`
2. Generate types: `pnpm generate:types`
3. Generate import map: `pnpm generate:importmap`
4. Check Payload logs: `docker-compose logs payload`

### Volta Issues

If Volta doesn't automatically switch versions:

```bash
# Verify Volta is installed
volta --version

# Pin Node.js version manually
volta pin node@22.11.0

# Pin pnpm version manually
volta pin pnpm@10.16.1
```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PAYLOAD_SECRET` | Secret key for Payload CMS encryption | Yes | - |
| `DATABASE_URI` | MongoDB connection string | Yes | - |
| `NODE_ENV` | Node.js environment | No | `development` |
| `PORT` | Port for Next.js server | No | `3000` |

## Database Access

### From Host Machine

To connect to MongoDB from your host machine (e.g., using MongoDB Compass):

- **Host**: `localhost`
- **Port**: `27018` (external port)
- **Connection String**: `mongodb://localhost:27018/payloadcms`

### From Docker Container

When connecting from within Docker containers, use:

- **Host**: `mongo`
- **Port**: `27017` (internal port)
- **Connection String**: `mongodb://mongo:27017/payloadcms`

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Volta Documentation](https://docs.volta.sh/)
- [pnpm Documentation](https://pnpm.io/docs)

## Getting Help

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section above
2. Review Docker logs: `docker-compose logs`
3. Check Payload CMS logs: `docker-compose logs payload`
4. Verify environment variables are set correctly
5. Ensure all prerequisites are installed
