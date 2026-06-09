"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useCart } from "@/context/CartContext";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export default function PedidosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Error al conectar con la base de datos');
        const data: Product[] = await response.json();
        setProducts(data);
        const initialQuantities: Record<string, number> = {};
        data.forEach((p) => { initialQuantities[p.id] = 0; });
        setQuantities(initialQuantities);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const handleQuantityChange = (id: string, amount: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + amount),
    }));
  };

  const handleAddToCart = (product: Product) => {
    const qty = quantities[product.id] || 0;
    if (qty <= 0) {
      alert("Por favor, selecciona al menos 1 unidad.");
      return;
    }
    for (let i = 0; i < qty; i++) {
      addToCart({ id: product.id, name: product.name, price: product.price });
    }
    alert(`Añadido al carrito: ${qty}x ${product.name}`);
    setQuantities(prev => ({ ...prev, [product.id]: 0 }));
  };

  return (
    <div className="min-h-screen bg-[#3D2A25] text-[#F4EFE6]">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        
        {/* Banner de Pasos */}
        <div className="max-w-4xl mx-auto mb-8 bg-white/5 rounded-2xl p-6 border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
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

        {/* Nuevo Banner de Promociones */}
        <div className="max-w-4xl mx-auto mb-12 bg-[#F4EFE6]/5 border border-[#F4EFE6]/10 p-6 rounded-2xl text-center">
          <h4 className="text-[#F4EFE6] font-bold mb-3 uppercase tracking-widest text-sm">¡Aprovecha nuestras promos!</h4>
          <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-[#A89F91]">
            <p>• 3 Brownies Normales: ₲ 50.000</p>
            <p>• 2 Brownies Extra Fuertes: ₲ 60.000</p>
          </div>
        </div>

        {/* Listado de Productos */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col justify-between bg-white/5 rounded-2xl p-6 border border-white/5">
                <div>
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  <p className="text-sm text-[#A89F91] mb-4">₲ {product.price.toLocaleString("es-PY")}</p>
                </div>
                <div className="mt-auto space-y-4">
                  <div className="flex items-center justify-between bg-[#3D2A25]/60 rounded-xl p-2 border border-white/5">
                    <span className="text-xs uppercase text-[#A89F91] pl-2">Cantidad</span>
                    <div className="flex items-center space-x-3">
                      <button onClick={() => handleQuantityChange(product.id, -1)} className="size-8 rounded-lg bg-white/5 hover:bg-white/10">-</button>
                      <span className="text-sm font-bold w-6 text-center">{quantities[product.id] ?? 0}</span>
                      <button onClick={() => handleQuantityChange(product.id, 1)} className="size-8 rounded-lg bg-white/5 hover:bg-white/10">+</button>
                    </div>
                  </div>
                  <button onClick={() => handleAddToCart(product)} className="w-full bg-[#F4EFE6] text-[#3D2A25] py-3.5 rounded-xl font-bold uppercase text-xs hover:opacity-90">
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}