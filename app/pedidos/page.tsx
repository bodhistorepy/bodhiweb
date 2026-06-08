"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
};

const products: Product[] = [
  {
    id: "normal",
    name: "Brownies Normales",
    description: "Nuestra receta clásica, melcochosa por dentro y con una costra perfecta por fuera. El balance ideal de chocolate premium.",
    price: 20000,
  },
  {
    id: "extra-fuerte",
    name: "Brownies Extra Fuertes",
    description: "Para los amantes intensos del cacao. Elaborado con un blend de chocolates oscuros de alta concentración y un perfil robusto.",
    price: 35000,
  },
];

export default function PedidosPage() {
  // Track quantities for each product independently
  const [quantities, setQuantities] = useState<Record<string, number>>({
    "normal": 1,
    "extra-fuerte": 1,
  });

  const handleQuantityChange = (id: string, amount: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, prev[id] + amount), // Prevents dropping below 1
    }));
  };

  const handleAddToCart = (product: Product) => {
    const qty = quantities[product.id];
    alert(`Añadido al carrito: ${qty}x ${product.name} (Total: ₲ ${(product.price * qty).toLocaleString("es-PY")})`);
    // Integración futura con tu estado global del carrito aquí
  };

  return (
    <div className="min-h-screen bg-[#3D2A25] text-[#F4EFE6]">
      {/* Reuses your beautiful global navbar layout */}
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-black tracking-[0.2em] uppercase mb-4">
            Hacer Pedido
          </h1>
          <p className="text-[#A89F91] text-sm tracking-wide">
            Selecciona tu variedad favorita, ajusta la cantidad y recíbelos recién horneados.
          </p>
        </div>

        {/* Delivery & Pickup Workflow Info Banner */}
        <div className="max-w-4xl mx-auto mb-12 bg-white/5 rounded-2xl p-6 border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A89F91]">Paso 1</span>
            <h3 className="text-sm font-semibold text-[#F4EFE6]">Hacé tu Pedido</h3>
            <p className="text-xs text-[#A89F91]">Elegí tus brownies favoritos y completá la cantidad aquí abajo.</p>
          </div>

          <div className="space-y-1 border-t border-white/5 pt-4 md:border-t-0 md:pt-0 md:border-x md:px-6 border-white/5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A89F91]">Paso 2</span>
            <h3 className="text-sm font-semibold text-[#F4EFE6]">Transferencia</h3>
            <p className="text-xs text-[#A89F91]">Te enviaremos los datos bancarios. Recordá que el costo del envío va por cuenta del cliente.</p>
          </div>

          <div className="space-y-1 border-t border-white/5 pt-4 md:border-t-0 md:pt-0">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A89F91]">Paso 3</span>
            <h3 className="text-sm font-semibold text-[#F4EFE6]">Retiro vía Bolt</h3>
            <p className="text-xs text-[#A89F91]">Te avisamos cuando tu pedido esté listo para que envíes tu Bolt (u otra app) a retirar.</p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex flex-col justify-between bg-white/5 rounded-2xl p-6 border border-white/5 shadow-xl hover:border-white/10 transition-all duration-300"
            >
              <div>
                {/* Product Header */}
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold tracking-wide text-[#F4EFE6]">
                    {product.name}
                  </h2>
                  <span className="text-lg font-semibold text-[#A89F91] whitespace-nowrap ml-4">
                    ₲ {product.price.toLocaleString("es-PY")}
                  </span>
                </div>
                
                {/* Product Description */}
                <p className="text-sm text-[#A89F91] leading-relaxed mb-8">
                  {product.description}
                </p>
              </div>

              {/* Controls Section */}
              <div className="mt-auto space-y-4">
                <div className="flex items-center justify-between bg-[#3D2A25]/60 rounded-xl p-2 border border-white/5">
                  <span className="text-xs uppercase tracking-wider text-[#A89F91] pl-2">
                    Cantidad
                  </span>
                  
                  {/* Quantity Toggles */}
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(product.id, -1)}
                      className="size-8 rounded-lg bg-white/5 flex items-center justify-center font-bold text-[#A89F91] hover:bg-white/10 hover:text-[#F4EFE6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A89F91]/50"
                    >
                      —
                    </button>
                    <span className="text-sm font-bold w-6 text-center select-none">
                      {quantities[product.id]}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(product.id, 1)}
                      className="size-8 rounded-lg bg-white/5 flex items-center justify-center font-bold text-[#A89F91] hover:bg-white/10 hover:text-[#F4EFE6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A89F91]/50"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart CTA */}
                <button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-[#F4EFE6] text-[#3D2A25] py-3.5 rounded-xl font-semibold tracking-wide hover:opacity-90 active:scale-[0.99] transition-all transform duration-100 focus:outline-none focus:ring-4 focus:ring-[#A89F91]/40 uppercase text-xs"
                >
                  Agregar Al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}