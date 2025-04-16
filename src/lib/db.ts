import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  connectionString: process.env.DATABASE_URL,
});

export default pool;
