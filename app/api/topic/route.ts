import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const client = new MongoClient(process.env.MONGODB_URI!);

export async function GET() {
  try {
    await client.connect();

    // Choose a name for your database
    const database = client.db("topics-db");

    // Choose a name for your collection
    const allDataCursor = database.collection("topics").find();
    const allData = await allDataCursor.toArray();

    return NextResponse.json({ allData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function POST(req: Request) {
  try {
    await client.connect();
    const { topic, description } = await req.json();

    // Choose a name for your database
    const database = client.db("topics-db");

    // Choose a name for your collection
    const result = await database.collection("topics").insertOne({
      topic: topic,
      description: description,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    await client.connect();

    // Check if 'id' is provided
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Choose a name for your database
    const database = client.db("topics-db");

    // Choose a name for your collection
    const result = await database
      .collection("topics")
      .deleteOne({ _id: new ObjectId(id) });

    // Check if a document was deleted
    if (result?.deletedCount === 0) {
      return NextResponse.json(
        { message: "No document found with the provided ID" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Document deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await client.close();
  }
}
