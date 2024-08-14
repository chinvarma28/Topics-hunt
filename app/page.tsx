import Image from "next/image";
import TopicForm from "./components/form";
import { headers } from "next/headers";
import { Trash2 } from "lucide-react";
import DeleteBtn from "./components/delete-btn";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/topic", {
    headers: headers(),
  });
  const data = await response.json();
  console.log(data);

  return (
    <main className="container mx-auto grid gap-4">
      <h1 className="text-5xl text-center my-4">Topics Hunt</h1>
      <TopicForm />
      <h2 className="text-2xl text-center text-gray-100">All topics</h2>
      <div className="flex flex-col gap-2">
        {data.allData.map(
          (d: { topic: string; description: string }, i: number) => (
            <div className="flex justify-between gap-1 bg-gray-50 shadow text-black rounded-md px-4 py-2">
              <div className="flex flex-col gap-1">
                <p>Topic: {d.topic}</p>
                <p>Description: {d.description}</p>
              </div>
              {/* <DeleteBtn id={i} /> */}
            </div>
          )
        )}
      </div>
    </main>
  );
}
