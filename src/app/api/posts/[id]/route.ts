import { NextResponse } from "next/server";
import pool from "../../../../lib/db";
import { DatabaseError } from "pg";

type Context = { params: Promise<{ id: string }> };

export async function GET(_: Request, context: Context) {
  const { id } = await context.params;

  try {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error: unknown) {
    if (error instanceof DatabaseError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: Context) {
  const { id } = await context.params;

  try {
    const { title, content } = await request.json();
    const result = await pool.query(
      "UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *",
      [title, content, id]
    );
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error: unknown) {
    if (error instanceof DatabaseError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

export async function DELETE(_: Request, context: Context) {
  const { id } = await context.params;

  try {
    await pool.query("DELETE FROM posts WHERE id = $1", [id]);
    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    if (error instanceof DatabaseError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
