"use client";

import { useEffect, useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getTrabajo } from "@/lib/services/portfolio";
import type { Trabajo, Experiencia, Proyecto } from "@/lib/types/portfolio";
import Link from "next/link";

export default function EditTrabajoPage() {
  const [data, setData] = useState<Trabajo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"experiencias" | "proyectos">("experiencias");

  useEffect(() => {
    const fetchData = async () => {
      const trabajo = await getTrabajo();
      setData(trabajo);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setIsSaving(true);
    try {
      await updateDoc(doc(db, "portfolio", "trabajo"), data);
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
          <span>Cargando datos de Experiencias y Proyectos...</span>
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
      {/* Header Sticky */}
      <header className="sticky top-0 z-20 bg-[#101713]/85 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
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
            <span className="text-sm font-semibold text-white">Editar Trabajo</span>
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

      {/* Tabs Selector */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex gap-2 border-b border-white/[0.08] pb-4">
          <button
            onClick={() => setActiveTab("experiencias")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeTab === "experiencias"
                ? "bg-emerald-500/15 text-[#3BFF8F] border border-emerald-500/30"
                : "text-[#A3B9A7] hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <span>Experiencias Laborales</span>
            <span className="px-1.5 py-0.5 rounded-md bg-black/40 text-[10px]">
              {data.experiencia.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("proyectos")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeTab === "proyectos"
                ? "bg-emerald-500/15 text-[#3BFF8F] border border-emerald-500/30"
                : "text-[#A3B9A7] hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <span>Proyectos Destacados</span>
            <span className="px-1.5 py-0.5 rounded-md bg-black/40 text-[10px]">
              {data.proyectos.length}
            </span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        {/* TAB 1: EXPERIENCIAS */}
        {activeTab === "experiencias" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Historial de Experiencias</h2>
                <p className="text-xs text-[#A3B9A7]">Puestos laborales, roles y trayectorias profesionales.</p>
              </div>
              <button
                onClick={() =>
                  setData({
                    ...data,
                    experiencia: [
                      ...data.experiencia,
                      { titulo: "", subtitulo: "", fechaInicio: "", fechaFin: "", descripcion: [""] } as Experiencia,
                    ],
                  })
                }
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-[#3BFF8F] border border-emerald-500/20 transition cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Agregar experiencia
              </button>
            </div>

            {data.experiencia.map((exp, i) => (
              <div key={i} className="rounded-2xl bg-[#121915]/80 border border-emerald-500/15 p-6 sm:p-7 relative group">
                <div className="flex items-center justify-between mb-4 border-b border-white/[0.06] pb-3">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 text-[#3BFF8F] border border-emerald-500/20">
                    Experiencia #{i + 1}
                  </span>
                  <button
                    onClick={() =>
                      setData({
                        ...data,
                        experiencia: data.experiencia.filter((_, idx) => idx !== i),
                      })
                    }
                    className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 px-2.5 py-1 rounded-lg hover:bg-red-500/10 transition cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    Eliminar
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#E6F2E9] mb-1.5">Título / Cargo</label>
                    <input
                      type="text"
                      placeholder="Ej: Frontend Developer"
                      value={exp.titulo}
                      onChange={(e) =>
                        setData({
                          ...data,
                          experiencia: data.experiencia.map((ex, idx) =>
                            idx === i ? { ...ex, titulo: e.target.value } : ex
                          ),
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-white/[0.03] focus:bg-white/[0.06] border border-white/10 focus:border-[#3BFF8F]/60 rounded-xl text-sm text-white placeholder-zinc-500 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#E6F2E9] mb-1.5">Empresa / Subtítulo</label>
                    <input
                      type="text"
                      placeholder="Ej: Empresa o Cliente"
                      value={exp.subtitulo}
                      onChange={(e) =>
                        setData({
                          ...data,
                          experiencia: data.experiencia.map((ex, idx) =>
                            idx === i ? { ...ex, subtitulo: e.target.value } : ex
                          ),
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-white/[0.03] focus:bg-white/[0.06] border border-white/10 focus:border-[#3BFF8F]/60 rounded-xl text-sm text-white placeholder-zinc-500 outline-none transition"
                    />
                  </div>
                </div>

                {/* Fechas */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block text-xs font-medium text-[#A3B9A7] mb-1.5">Fecha Inicio</label>
                    <input
                      type="date"
                      value={exp.fechaInicio ?? ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          experiencia: data.experiencia.map((ex, idx) =>
                            idx === i ? { ...ex, fechaInicio: e.target.value } : ex
                          ),
                        })
                      }
                      className="w-full px-3.5 py-2 bg-white/[0.03] border border-white/10 focus:border-[#3BFF8F]/60 rounded-xl text-xs text-white outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#A3B9A7] mb-1.5">Fecha Fin</label>
                    <input
                      type="date"
                      value={exp.fechaFin ?? ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          experiencia: data.experiencia.map((ex, idx) =>
                            idx === i ? { ...ex, fechaFin: e.target.value } : ex
                          ),
                        })
                      }
                      className="w-full px-3.5 py-2 bg-white/[0.03] border border-white/10 focus:border-[#3BFF8F]/60 rounded-xl text-xs text-white outline-none transition"
                    />
                  </div>
                </div>

                {/* Descripciones */}
                <div className="border-t border-white/[0.06] pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-semibold text-[#E6F2E9]">Puntos de Descripción</label>
                    <button
                      onClick={() =>
                        setData({
                          ...data,
                          experiencia: data.experiencia.map((ex, idx) =>
                            idx === i ? { ...ex, descripcion: [...ex.descripcion, ""] } : ex
                          ),
                        })
                      }
                      className="text-[11px] text-[#3BFF8F] hover:underline cursor-pointer"
                    >
                      + Agregar punto
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {exp.descripcion.map((desc, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder={`Detalle o logro ${j + 1}...`}
                          value={desc}
                          onChange={(e) =>
                            setData({
                              ...data,
                              experiencia: data.experiencia.map((ex, idx) =>
                                idx === i
                                  ? {
                                      ...ex,
                                      descripcion: ex.descripcion.map((d, k) =>
                                        k === j ? e.target.value : d
                                      ),
                                    }
                                  : ex
                              ),
                            })
                          }
                          className="w-full px-3.5 py-2 bg-white/[0.03] border border-white/10 focus:border-[#3BFF8F]/60 rounded-xl text-xs text-white placeholder-zinc-500 outline-none transition"
                        />
                        <button
                          onClick={() =>
                            setData({
                              ...data,
                              experiencia: data.experiencia.map((ex, idx) =>
                                idx === i
                                  ? {
                                      ...ex,
                                      descripcion: ex.descripcion.filter((_, k) => k !== j),
                                    }
                                  : ex
                              ),
                            })
                          }
                          className="text-zinc-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition cursor-pointer"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: PROYECTOS */}
        {activeTab === "proyectos" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Proyectos Realizados</h2>
                <p className="text-xs text-[#A3B9A7]">Aplicaciones, repositorios y demos de tu autoría.</p>
              </div>
              <button
                onClick={() =>
                  setData({
                    ...data,
                    proyectos: [
                      ...data.proyectos,
                      {
                        titulo: "",
                        subtitulo: "",
                        date: "",
                        descripcion: [""],
                        repoLink: [{ label: "", url: "" }],
                      } as Proyecto,
                    ],
                  })
                }
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-[#3BFF8F] border border-emerald-500/20 transition cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Agregar proyecto
              </button>
            </div>

            {data.proyectos.map((proj, i) => (
              <div key={i} className="rounded-2xl bg-[#121915]/80 border border-emerald-500/15 p-6 sm:p-7 relative group">
                <div className="flex items-center justify-between mb-4 border-b border-white/[0.06] pb-3">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 text-[#3BFF8F] border border-emerald-500/20">
                    Proyecto #{i + 1}
                  </span>
                  <button
                    onClick={() =>
                      setData({
                        ...data,
                        proyectos: data.proyectos.filter((_, idx) => idx !== i),
                      })
                    }
                    className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 px-2.5 py-1 rounded-lg hover:bg-red-500/10 transition cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    Eliminar
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#E6F2E9] mb-1.5">Título del Proyecto</label>
                    <input
                      type="text"
                      placeholder="Ej: E-Commerce App"
                      value={proj.titulo}
                      onChange={(e) =>
                        setData({
                          ...data,
                          proyectos: data.proyectos.map((pr, idx) =>
                            idx === i ? { ...pr, titulo: e.target.value } : pr
                          ),
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-white/[0.03] focus:bg-white/[0.06] border border-white/10 focus:border-[#3BFF8F]/60 rounded-xl text-sm text-white placeholder-zinc-500 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#E6F2E9] mb-1.5">Subtítulo / Stack</label>
                    <input
                      type="text"
                      placeholder="Ej: Next.js + Tailwind + Firebase"
                      value={proj.subtitulo}
                      onChange={(e) =>
                        setData({
                          ...data,
                          proyectos: data.proyectos.map((pr, idx) =>
                            idx === i ? { ...pr, subtitulo: e.target.value } : pr
                          ),
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-white/[0.03] focus:bg-white/[0.06] border border-white/10 focus:border-[#3BFF8F]/60 rounded-xl text-sm text-white placeholder-zinc-500 outline-none transition"
                    />
                  </div>
                </div>

                {/* Fecha */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-[#A3B9A7] mb-1.5">Fecha</label>
                  <input
                    type="date"
                    value={proj.date ?? ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        proyectos: data.proyectos.map((pr, idx) =>
                          idx === i ? { ...pr, date: e.target.value } : pr
                        ),
                      })
                    }
                    className="w-full sm:w-1/2 px-3.5 py-2 bg-white/[0.03] border border-white/10 focus:border-[#3BFF8F]/60 rounded-xl text-xs text-white outline-none transition"
                  />
                </div>

                {/* Descripciones */}
                <div className="border-t border-white/[0.06] pt-4 mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-semibold text-[#E6F2E9]">Puntos de Descripción</label>
                    <button
                      onClick={() =>
                        setData({
                          ...data,
                          proyectos: data.proyectos.map((pr, idx) =>
                            idx === i ? { ...pr, descripcion: [...pr.descripcion, ""] } : pr
                          ),
                        })
                      }
                      className="text-[11px] text-[#3BFF8F] hover:underline cursor-pointer"
                    >
                      + Agregar punto
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {proj.descripcion.map((desc, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder={`Detalle del proyecto ${j + 1}...`}
                          value={desc}
                          onChange={(e) =>
                            setData({
                              ...data,
                              proyectos: data.proyectos.map((pr, idx) =>
                                idx === i
                                  ? {
                                      ...pr,
                                      descripcion: pr.descripcion.map((d, k) =>
                                        k === j ? e.target.value : d
                                      ),
                                    }
                                  : pr
                              ),
                            })
                          }
                          className="w-full px-3.5 py-2 bg-white/[0.03] border border-white/10 focus:border-[#3BFF8F]/60 rounded-xl text-xs text-white placeholder-zinc-500 outline-none transition"
                        />
                        <button
                          onClick={() =>
                            setData({
                              ...data,
                              proyectos: data.proyectos.map((pr, idx) =>
                                idx === i
                                  ? {
                                      ...pr,
                                      descripcion: pr.descripcion.filter((_, k) => k !== j),
                                    }
                                  : pr
                              ),
                            })
                          }
                          className="text-zinc-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition cursor-pointer"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Repositorio Links */}
                <div className="border-t border-white/[0.06] pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-semibold text-[#E6F2E9]">Enlaces & Repositorios</label>
                    <button
                      onClick={() =>
                        setData({
                          ...data,
                          proyectos: data.proyectos.map((pr, idx) =>
                            idx === i
                              ? { ...pr, repoLink: [...pr.repoLink, { label: "", url: "" }] }
                              : pr
                          ),
                        })
                      }
                      className="text-[11px] text-[#3BFF8F] hover:underline cursor-pointer"
                    >
                      + Agregar enlace
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {proj.repoLink.map((linkObj, j) => (
                      <div key={j} className="flex flex-col sm:flex-row items-center gap-2 bg-white/[0.02] border border-white/[0.06] rounded-xl p-2.5">
                        <input
                          type="text"
                          placeholder="Etiqueta (Ej: Demo, Repo)"
                          value={linkObj.label || ""}
                          onChange={(e) =>
                            setData({
                              ...data,
                              proyectos: data.proyectos.map((pr, idx) =>
                                idx === i
                                  ? {
                                      ...pr,
                                      repoLink: pr.repoLink.map((l, k) =>
                                        k === j ? { ...l, label: e.target.value } : l
                                      ),
                                    }
                                  : pr
                              ),
                            })
                          }
                          className="w-full sm:w-1/3 px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white placeholder-zinc-500 outline-none"
                        />
                        <input
                          type="text"
                          placeholder="URL (https://...)"
                          value={linkObj.url || ""}
                          onChange={(e) =>
                            setData({
                              ...data,
                              proyectos: data.proyectos.map((pr, idx) =>
                                idx === i
                                  ? {
                                      ...pr,
                                      repoLink: pr.repoLink.map((l, k) =>
                                        k === j ? { ...l, url: e.target.value } : l
                                      ),
                                    }
                                  : pr
                              ),
                            })
                          }
                          className="w-full sm:w-2/3 px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white placeholder-zinc-500 outline-none"
                        />
                        <button
                          onClick={() =>
                            setData({
                              ...data,
                              proyectos: data.proyectos.map((pr, idx) =>
                                idx === i
                                  ? {
                                      ...pr,
                                      repoLink: pr.repoLink.filter((_, k) => k !== j),
                                    }
                                  : pr
                              ),
                            })
                          }
                          className="text-zinc-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition cursor-pointer shrink-0"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}