import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }

    const db = mongoose.connection.db;

    // ESTA ES LA LÍNEA QUE FALTA PARA EL BUILD
    if (!db) {
      return NextResponse.json({ success: false, error: "Base de datos no disponible" }, { status: 500 });
    }

    // Ahora TypeScript sabe que 'db' no es undefined
    const productos = await db.collection('products').find({}).toArray();
    const clientes = await db.collection('customers').find({}).toArray();
    const pedidos = await db.collection('orders').find({}).toArray();

    return NextResponse.json({ success: true, productos, clientes, pedidos });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}