This is a [Next.js](https://nextjs.org) proof of concept for running SSR (Server-Side Rendering) in your own infrastructure using Docker Compose, PostgreSQL, and PGAdmin.

## Docker Compose Setup

This project includes a `docker-compose.yml` for running PostgreSQL and PGAdmin. The app itself is built and run using the provided `Dockerfile`.

### 1. Start Database Services

From the project root, run:

```bash
docker-compose up -d
```

- **PostgreSQL** will be available at `localhost:5432`.
- **PGAdmin** will be available at [http://localhost:5050](http://localhost:5050)
  - Login: `admin@admin.com` / `admin`
  - Add a new server with:
    - Host: `postgres`
    - User: `admin`
    - Password: `admin`
    - Database: `mydb`

### 2. Build and Run the App in Docker

```bash
docker build -t ssr-poc .
docker run --env-file .env.local -p 3000:3000 ssr-poc
```

- The app will be available at [http://localhost:3000](http://localhost:3000)

### 3. Environment Variables

- See `.env.example` for required variables. If running the app in Docker, set `DATABASE_URL=postgresql://admin:admin@postgres:5432/mydb`.
- If running locally, use `localhost` as the host.

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

---

This setup is a proof of concept for running SSR/Next.js on your own infrastructure. For production, further configuration and security hardening are required.
