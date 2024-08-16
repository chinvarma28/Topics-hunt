
import DeleteBtn from "./components/delete-btn"
import TopicForm from "./components/form"

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/topic`)
  const data = await response.json()

  return (
    <main className="w-1/2 mx-auto grid gap-4">
      <TopicForm />
      <div className="border p-4">
        <h2 className="text-2xl text-center mb-4">All topics</h2>
        {data.allData ? (
          <div className="flex flex-col gap-2">
            {data.allData.map(
              (d: { topic: string; description: string; _id: string }) => (
                <div
                  key={d._id}
                  className="flex justify-between gap-1 bg-gray-50 shadow text-black rounded-md px-4 py-2"
                >
                  <div className="flex flex-col gap-1">
                    <p>Topic: {d.topic}</p>
                    <p>Description: {d.description}</p>
                  </div>
                  <DeleteBtn id={d._id} />
                </div>
              )
            )}
          </div>
        ) : (
          <p className="text-center my-4">Loading topics...</p>
        )}
      </div>
    </main>
  )
}