"use client";

import { Trash2 } from "lucide-react";

export default function DeleteBtn({ id }: { id: number }) {
  return (
    <button
      onClick={async () => {
        await fetch(`http://localhost:3000/api/topic?id=${id}`, {
          method: "DELETE",
        });
      }}
    >
      <Trash2 />
    </button>
  );
}
