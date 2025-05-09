"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import CardList from "@/components/custom/CardList";
import type { Credential } from "@/types";


export default function VaultPage({ category }: { category?: string }) {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCredentials = async () => {
      const endpoint = category
        ? `/api/credentials?category=${category}`
        : `/api/credentials`;

      const res = await fetch(endpoint);
      const data = await res.json();
      setCredentials(data);
    };
    fetchCredentials();
  }, [category]);

  const filtered = credentials.filter((cred) =>
    `${cred.website || ""} ${cred.username || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          {category ? `📂 ${category}` : "📁 All Passwords"}
        </h2>
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <CardList credentials={filtered} />
    </div>
  );
}
