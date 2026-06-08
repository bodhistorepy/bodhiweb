import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb"; // Adjust this path to match where your mongodb.ts is

export async function GET() {
  try {
    // 1. Try connecting to the client
    const client = await clientPromise;
    
    // 2. Select your database
    const db = client.db("bodhi_db");
    
    // 3. Ping the database to check if it responds
    await db.command({ ping: 1 });
    
    // 4. Check what collections exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    return NextResponse.json({
      success: true,
      message: "¡Conexión exitosa con MongoDB en Docker!",
      database: "bodhi_db",
      activeCollections: collectionNames
    }, { status: 200 });

  } catch (error: any) {
    console.error("Database connection test failed:", error);
    return NextResponse.json({
      success: false,
      message: "No se pudo conectar a MongoDB.",
      error: error.message || error
    }, { status: 500 });
  }
}