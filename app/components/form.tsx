
"use client"

import { Loader2, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function TopicForm() {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [description, setDescription] = useState("")
  const [topic, setTopic] = useState("")
  const router = useRouter()

  async function handleAddTopic(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    const data = { topic, description }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/topic`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    )
    setTopic("")
    setDescription("")
    router.refresh()
    setIsLoading(false)
  }
  return (
    <nav className="bg-gray-50  px-4 py-4 my-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-center">Topics Hunt</h1>
        <button
          className="px-4 bg-gray-800 text-white py-2 rounded-md"
          onClick={() => {
            setIsFormVisible(!isFormVisible)
          }}
        >
          {isFormVisible ? <X /> : "New Topic"}
        </button>
      </div>

      {isFormVisible && (
        <form onSubmit={handleAddTopic} className="flex flex-col gap-2 mt-8">
          <label htmlFor="topic" className="grid grid-cols-4 gap-4">
            Topic
            <input
              type="text"
              className="text-black w-full col-span-3 px-2 py-1"
              name="topic"
              id="topic"
              placeholder="Enter topic"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value)
              }}
            />
          </label>
          <label htmlFor="description" className="grid grid-cols-4 gap-2">
            Description
            <input
              type="text"
              className="text-black w-full col-span-3 px-2 py-1"
              name="description"
              placeholder="Enter description"
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
            />
          </label>
          <button
            className="px-4 flex justify-center bg-green-400 text-white py-1 mt-4"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Add Topic"}
          </button>
        </form>
      )}
    </nav>
  )
}
