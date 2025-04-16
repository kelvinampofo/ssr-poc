import { useEffect, useState } from "react";

export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export function usePosts() {
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    const res = await fetch("/api/posts");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  const createItem = async (title: string, content: string) => {
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    fetchItems();
  };

  const deleteItem = async (id: number) => {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    fetchItems();
  };

  const updateItem = async (id: number, title: string, content: string) => {
    await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    fetchItems();
  };

  return { items, loading, createItem, deleteItem, updateItem };
}
