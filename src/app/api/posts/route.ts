import { NextResponse } from "next/server";
import pool from "../../../lib/db";
import { DatabaseError } from "pg";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT id, title, content, created_at FROM posts ORDER BY id"
    );
    return NextResponse.json(result.rows);
  } catch (error: unknown) {
    if (error instanceof DatabaseError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    const result = await pool.query(
      "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING id, title, content, created_at",
      [title, content]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: unknown) {
    if (error instanceof DatabaseError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
