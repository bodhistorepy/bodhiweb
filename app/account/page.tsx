"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function AccountPage() {
  const router = useRouter();
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      // 1. Verificamos si existe la "llave" del usuario
      const id = localStorage.getItem("bodhi_customer_id");
      
      // 2. Si no hay ID, el usuario no está registrado, lo mandamos al registro
      if (!id) {
        router.push("/registro");
        return;
      }

      try {
        const res = await fetch(`/api/customers/${id}`);
        const result = await res.json();
        
        if (result.success) {
          setCustomer(result.data);
        } else {
          // Si el ID existe pero no es válido en BD, limpiamos y mandamos a registro
          localStorage.removeItem("bodhi_customer_id");
          router.push("/registro");
        }
      } catch (err) {
        console.error("Error al cargar perfil:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) return <div className="text-center p-20 text-[#A89F91]">Cargando sesión...</div>;

  return (
    <div className="min-h-screen bg-[#3D2A25] text-[#F4EFE6]">
      <Navbar />
      <main className="max-w-xl mx-auto p-6 pt-12">
        <h1 className="text-2xl font-bold mb-6">Mi Perfil</h1>
        
        {customer && (
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-4">
            <div>
              <p className="text-[#A89F91] text-xs uppercase tracking-widest">Nombre</p>
              <p className="text-lg">{customer.name}</p>
            </div>
            <div>
              <p className="text-[#A89F91] text-xs uppercase tracking-widest">Teléfono</p>
              <p className="text-lg">{customer.phone}</p>
            </div>
            <div>
              <p className="text-[#A89F91] text-xs uppercase tracking-widest">Dirección (Maps)</p>
              <a href={customer.deliveryAddress.mapsUrl} target="_blank" className="text-blue-400 underline text-sm">
                Ver en Google Maps
              </a>
            </div>
            <div>
              <p className="text-[#A89F91] text-xs uppercase tracking-widest">Detalles</p>
              <p className="text-sm">{customer.deliveryAddress.details || "Sin detalles adicionales"}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}