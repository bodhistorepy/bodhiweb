import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "ID inválido" }, { status: 400 });
    }

    // Aquí está el cambio clave para TypeScript:
    const db = mongoose.connection.db;
    
    if (!db) {
        return NextResponse.json({ success: false, error: "Base de datos no conectada" }, { status: 500 });
    }

    const customer = await db.collection('customers').findOne({ 
        _id: new (mongoose.Types.ObjectId as any)(id)
    });

    if (!customer) {
      return NextResponse.json({ success: false, error: "No encontrado" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: customer });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error de servidor" }, { status: 500 });
  }
}