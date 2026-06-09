import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    // 1. Conexión segura
    if (mongoose.connection.readyState === 0) {
      if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI no está configurado en las variables de entorno.");
      }
      await mongoose.connect(process.env.MONGODB_URI);
    }

    // 2. Acceso a la instancia de la base de datos
    const db = mongoose.connection.db;
    
    // 3. Guarda de seguridad para TypeScript (esto soluciona el error del build)
    if (!db) {
      throw new Error("No se pudo acceder a la instancia de la base de datos.");
    }

    // 4. Consulta a la base de datos
    const productos = await db.collection('products').find({}).toArray();

    // 5. Retorno exitoso
    return NextResponse.json(productos);

  } catch (error: any) {
    console.error("Error en API de productos:", error); // Útil para depurar en los logs de Docker
    return NextResponse.json(
      { success: false, error: error.message || "Error interno del servidor" }, 
      { status: 500 }
    );
  }
}