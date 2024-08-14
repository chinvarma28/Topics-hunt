"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function TopicForm() {
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const router = useRouter();

  async function handleAddTopic(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = { topic, description };
    const response = await fetch("http://localhost:3000/api/topic", {
      method: "POST",
      body: JSON.stringify(data),
    });
    setTopic("");
    setDescription("");
    router.refresh();
    console.log(response);
  }
  return (
    <form onSubmit={handleAddTopic} className="flex flex-col gap-2">
      <label htmlFor="topic" className="grid grid-cols-4 gap-2">
        Topic
        <input
          type="text"
          className="text-black w-full col-span-3"
          name="topic"
          id="topic"
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
          }}
        />
      </label>
      <label htmlFor="description" className="grid grid-cols-4 gap-2">
        Description
        <input
          type="text"
          className="text-black w-full col-span-3"
          name="description"
          id="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </label>
      <button className="px-4 bg-white text-black py-1 mt-4">Add Topic</button>
    </form>
  );
}
