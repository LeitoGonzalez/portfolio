"use client";

import { useEffect, useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getSobreMi } from "@/lib/services/portfolio";
import type { SobreMi } from "@/lib/types/portfolio";
import Link from "next/link";

export default function EditSobreMiPage() {
  const [data, setData] = useState<SobreMi | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const sobreMi = await getSobreMi();
      setData(sobreMi);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setIsSaving(true);
    try {
      await updateDoc(doc(db, "portfolio", "sobre_mi"), data);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar cambios");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f0d] text-[#A3B9A7]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-[#3BFF8F] border-t-transparent rounded-full animate-spin" />
          <span>Cargando datos de Sobre Mí...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f0d] text-white">
        <p className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300">
          No se encontró información en Firestore
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0f0d] text-white pb-24 selection:bg-[#196442] selection:text-white">
      {/* Barra de navegación superior */}
      <header className="sticky top-0 z-20 bg-[#101713]/85 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs text-[#A3B9A7] hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/[0.05] transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Volver al panel
            </Link>
            <span className="text-sm font-semibold text-white">Editar Sobre Mí</span>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#1F7D53] to-[#2db679] hover:from-[#239261] hover:to-[#35c987] text-white shadow-[0_2px_12px_rgba(31,125,83,0.3)] transition disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? (
              <span>Guardando...</span>
            ) : savedSuccess ? (
              <span className="text-emerald-200">¡Guardado con éxito!</span>
            ) : (
              <span>Guardar cambios</span>
            )}
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Sección: Párrafos de la biografía */}
        <section className="rounded-2xl bg-[#121915]/80 border border-emerald-500/15 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white">Párrafos de Presentación</h2>
              <p className="text-xs text-[#A3B9A7] mt-0.5">
                Bloques de texto que componen tu sección "Sobre Mí".
              </p>
            </div>
            <button
              onClick={() =>
                setData({
                  ...data,
                  paragraphs: [...data.paragraphs, ""],
                })
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-[#3BFF8F] border border-emerald-500/20 transition cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Agregar párrafo
            </button>
          </div>

          <div className="space-y-4 mt-6">
            {data.paragraphs.map((p, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 focus-within:border-emerald-500/40 transition">
                <span className="text-xs font-mono text-[#A3B9A7] mt-2 px-1">
                  #{i + 1}
                </span>
                <textarea
                  value={p}
                  placeholder={`Escribí el párrafo ${i + 1}...`}
                  onChange={(e) =>
                    setData({
                      ...data,
                      paragraphs: data.paragraphs.map((para, idx) =>
                        idx === i ? e.target.value : para
                      ),
                    })
                  }
                  className="w-full min-h-[90px] bg-transparent text-sm text-white placeholder-zinc-500 outline-none resize-y"
                />
                <button
                  onClick={() =>
                    setData({
                      ...data,
                      paragraphs: data.paragraphs.filter((_, idx) => idx !== i),
                    })
                  }
                  title="Eliminar párrafo"
                  className="text-zinc-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Sección: Enlaces a Redes */}
        <section className="rounded-2xl bg-[#121915]/80 border border-emerald-500/15 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-white mb-1">Redes Sociales</h2>
          <p className="text-xs text-[#A3B9A7] mb-6">
            Configurá los enlaces directos a tus perfiles profesionales.
          </p>

          <div className="grid gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#E6F2E9] mb-1.5">Instagram</label>
              <input
                type="text"
                placeholder="https://instagram.com/usuario"
                value={data.redes.instagram}
                onChange={(e) =>
                  setData({ ...data, redes: { ...data.redes, instagram: e.target.value } })
                }
                className="w-full px-4 py-2.5 bg-white/[0.03] focus:bg-white/[0.06] border border-white/10 focus:border-[#3BFF8F]/60 rounded-xl text-sm text-white placeholder-zinc-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#E6F2E9] mb-1.5">LinkedIn</label>
              <input
                type="text"
                placeholder="https://linkedin.com/in/usuario"
                value={data.redes.linkedin}
                onChange={(e) =>
                  setData({ ...data, redes: { ...data.redes, linkedin: e.target.value } })
                }
                className="w-full px-4 py-2.5 bg-white/[0.03] focus:bg-white/[0.06] border border-white/10 focus:border-[#3BFF8F]/60 rounded-xl text-sm text-white placeholder-zinc-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#E6F2E9] mb-1.5">GitHub</label>
              <input
                type="text"
                placeholder="https://github.com/usuario"
                value={data.redes.github}
                onChange={(e) =>
                  setData({ ...data, redes: { ...data.redes, github: e.target.value } })
                }
                className="w-full px-4 py-2.5 bg-white/[0.03] focus:bg-white/[0.06] border border-white/10 focus:border-[#3BFF8F]/60 rounded-xl text-sm text-white placeholder-zinc-500 outline-none transition"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}