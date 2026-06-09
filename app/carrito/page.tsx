"use client";

import { useState, useEffect } from 'react';
import { useCart } from "@/context/CartContext";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function CarritoPage() {
  // Quitamos clearCart de aquí porque no lo tienes
  const { cart, removeFromCart } = useCart() as any; 
  const [isMounted, setIsMounted] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const groupedItems = cart.reduce((acc: any, item: any) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, quantity: 0 };
    }
    acc[item.id].quantity += 1;
    return acc;
  }, {});

  const items = Object.values(groupedItems);

  const normalsCount = cart.filter((i: any) => i.name.toLowerCase().includes("normal")).length;
  const strongsCount = cart.filter((i: any) => i.name.toLowerCase().includes("extra fuerte")).length;

  const totalNormales = (Math.floor(normalsCount / 3) * 50000) + ((normalsCount % 3) * 20000);
  const totalStrong = (Math.floor(strongsCount / 2) * 60000) + ((strongsCount % 2) * 35000);
  const total = totalNormales + totalStrong;

  const handleWhatsAppOrder = () => {
    let details = "";
    if (normalsCount > 0) details += `*Brownies Normales:* ${normalsCount} unid. (₲ ${totalNormales.toLocaleString("es-PY")})%0A`;
    if (strongsCount > 0) details += `*Brownies Extra Fuertes:* ${strongsCount} unid. (₲ ${totalStrong.toLocaleString("es-PY")})%0A`;

    const message = `Hola Bodhi, quiero realizar un pedido:%0A%0A${details}%0A*Total: ₲ ${total.toLocaleString("es-PY")}*%0A%0APor favor, confírmenme los datos para la transferencia.`;
    window.open(`https://wa.me/595992277163?text=${message}`, "_blank");
    
    setOrderSent(true);
    // Ya no llamamos a clearCart()
  };

  return (
    // ... (El resto de tu HTML queda igual)
    <div className="min-h-screen bg-[#3D2A25] text-[#F4EFE6]">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pt-28 pb-16">
        <h1 className="text-3xl font-black uppercase tracking-widest mb-8">Tu Carrito</h1>

        {orderSent ? (
          <div className="text-center py-20 border border-green-500/20 bg-green-500/5 rounded-2xl">
            <h2 className="text-2xl font-bold text-green-400 mb-2">¡Gracias por tu pedido!</h2>
            <p className="text-[#A89F91]">Tu mensaje fue enviado a Bodhi.</p>
            <Link href="/pedidos" className="mt-8 inline-block px-6 py-3 bg-[#F4EFE6] text-[#3D2A25] font-bold rounded-xl hover:opacity-90">Seguir comprando</Link>
          </div>
        ) : cart.length === 0 ? (
          <div className="text-center py-20 border border-white/5 rounded-2xl">
            <p className="text-[#A89F91] mb-6">Tu carrito está vacío.</p>
            <Link href="/pedidos" className="text-[#F4EFE6] underline">Volver a los brownies</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {items.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm text-[#A89F91]">Cantidad: {item.quantity}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 text-sm hover:underline"
                >
                  Eliminar
                </button>
              </div>
            ))}

            <div className="border-t border-white/10 pt-6 mt-6">
              <div className="flex justify-between text-xl font-bold mb-8">
                <span>Total (con promos):</span>
                <span>₲ {total.toLocaleString("es-PY")}</span>
              </div>
              <button 
                onClick={handleWhatsAppOrder}
                className="w-full bg-[#F4EFE6] text-[#3D2A25] py-4 rounded-xl font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Finalizar Pedido por WhatsApp
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}