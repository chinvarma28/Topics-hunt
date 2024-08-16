
"use client"

import { Loader2, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DeleteBtn({ id }: { id: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <button
      onClick={async () => {
        setIsLoading(true)
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/topic?id=${id}`, {
          method: "DELETE",
        })
        router.refresh()
        setIsLoading(false)
      }}
      className="text-red-500"
    >
      {isLoading ? <Loader2 className="animate-spin" /> : <Trash2 />}
    </button>
  )
}