"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function RegistroPage() {
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [mapsUrl, setMapsUrl] = useState("");
  const [details, setDetails] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          deliveryAddress: {
            mapsUrl,
            details,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Hubo un error al registrar tus datos.");
      }

      localStorage.setItem("bodhi_customer_id", data.customerId);

      alert("Datos registrados con éxito.");
      router.push("/pedidos");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#3D2A25] text-[#F4EFE6]">
      <Navbar />

      <main className="mx-auto max-w-xl px-4 pt-28 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-[0.2em] uppercase mb-3">
            Datos de Envío
          </h1>
          <p className="text-[#A89F91] text-sm tracking-wide">
            Completá tu información para procesar tus pedidos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 rounded-2xl p-6 border border-white/5 shadow-xl space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              ⚠️ {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-[#A89F91] block">
              Nombre Completo
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#3D2A25]/60 border border-white/5 rounded-xl p-3 text-sm text-[#F4EFE6] focus:outline-none focus:border-[#A89F91]/50 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-[#A89F91] block">
              Teléfono
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#3D2A25]/60 border border-white/5 rounded-xl p-3 text-sm text-[#F4EFE6] focus:outline-none focus:border-[#A89F91]/50 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-[#A89F91] block">
              Enlace de ubicación (Google Maps)
            </label>
            <input
              type="url"
              required
              value={mapsUrl}
              onChange={(e) => setMapsUrl(e.target.value)}
              className="w-full bg-[#3D2A25]/60 border border-white/5 rounded-xl p-3 text-sm text-[#F4EFE6] focus:outline-none focus:border-[#A89F91]/50 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-[#A89F91] block">
              Detalles adicionales (Opcional)
            </label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full bg-[#3D2A25]/60 border border-white/5 rounded-xl p-3 text-sm text-[#F4EFE6] focus:outline-none focus:border-[#A89F91]/50 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F4EFE6] text-[#3D2A25] py-3.5 rounded-xl font-semibold tracking-wide hover:opacity-90 active:scale-[0.99] transition-all transform duration-100 disabled:opacity-50 focus:outline-none uppercase text-xs mt-2"
          >
            {loading ? "Guardando..." : "Confirmar y Continuar"}
          </button>
        </form>
      </main>
    </div>
  );
}