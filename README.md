This is a [Next.js](https://nextjs.org) proof of concept for running SSR (Server-Side Rendering) in your own infrastructure using Docker Compose, PostgreSQL, and PGAdmin.

## Running with Docker Compose

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) and [Docker Compose](https://docs.docker.com/compose/install/) installed

### 1. Build and Start the Services

From the project root, run:

```bash
docker-compose up --build
```

This will start:

- **PostgreSQL** (database)
- **PGAdmin** (database admin UI)

### 2. Accessing Services

- **Next.js app**: (If you want to run the app in Docker, add a service for it in `docker-compose.yml` or run manually:)

  ```bash
  docker build -t ssr-poc .
  docker run --env-file .env.local -p 3000:3000 ssr-poc
  ```

  Then open [http://localhost:3000](http://localhost:3000)

- **PGAdmin**: [http://localhost:5050](http://localhost:5050)

  - Login: `admin@admin.com` / `admin`
  - Add a new server:
    - Host: `postgres`
    - User: `admin`
    - Password: `admin`
    - Database: `mydb`

- **PostgreSQL**: available at `localhost:5432` (see `.env.local`)

### 3. Environment Variables

The app uses the following database URL (see `.env.local`):

```
DATABASE_URL=postgresql://admin:admin@localhost:5432/mydb
```

If running the app inside Docker, use `postgres` as the host:

```
DATABASE_URL=postgresql://admin:admin@postgres:5432/mydb
```

---

## Running Locally (without Docker)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

3. Make sure PostgreSQL is running and accessible as configured in `.env.local`:
   ```
   DATABASE_URL=postgresql://admin:admin@localhost:5432/mydb
   ```
   You can use Docker Compose to start only the database services if needed:
   ```bash
   docker-compose up postgres pgadmin
   ```

This setup is a proof of concept for running SSR/Next.js on your own infrastructure. For production, further configuration and security hardening are required.
