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
    await updateDoc(doc(db, "portfolio", "trabajo"), data);
    alert("Sección 'Trabajo' actualizada");
  };

  if (loading) return <p className="text-white">Cargando...</p>;
  if (!data) return <p className="text-white">No se encontró información en Firestore</p>;

  return (
    <main className="min-h-screen px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Editar Trabajo</h1>

      {/* Botones de navegación */}
      <div className="flex gap-4 mb-6">
        <Link href="/admin">
          <button className="btn btn-gray">Volver al menú principal</button>
        </Link>
      </div>

      {/* Editar experiencias */}
      <h2 className="text-xl mb-2">Experiencias</h2>
      {data.experiencia.map((exp, i) => (
        <div key={i} className="mb-6 border p-4 rounded">
          <input
            type="text"
            placeholder="Título"
            value={exp.titulo}
            onChange={(e) =>
              setData({
                ...data,
                experiencia: data.experiencia.map((ex, idx) =>
                  idx === i ? { ...ex, titulo: e.target.value } : ex
                ),
              })
            }
            className="w-full mb-2 p-2 rounded bg-white/10 text-white"
          />
          <input
            type="text"
            placeholder="Subtítulo"
            value={exp.subtitulo}
            onChange={(e) =>
              setData({
                ...data,
                experiencia: data.experiencia.map((ex, idx) =>
                  idx === i ? { ...ex, subtitulo: e.target.value } : ex
                ),
              })
            }
            className="w-full mb-2 p-2 rounded bg-white/10 text-white"
          />

          {/* Descripciones de experiencia */}
          <h3 className="text-lg mb-2">Descripciones</h3>
          {exp.descripcion.map((desc, j) => (
            <div key={j} className="flex items-start gap-2 mb-2">
              <textarea
                placeholder="Descripción"
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
                className="w-full h-20 p-2 rounded bg-white/10 text-white"
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
                className="btn btn-red"
              >
                🗑️
              </button>
            </div>
          ))}
          <div className="flex gap-2">
            <button
              onClick={() =>
                setData({
                  ...data,
                  experiencia: data.experiencia.map((ex, idx) =>
                    idx === i
                      ? { ...ex, descripcion: [...ex.descripcion, ""] }
                      : ex
                  ),
                })
              }
              className="btn btn-blue"
            >
              Agregar descripción
            </button>

            <button
              onClick={() =>
                setData({
                  ...data,
                  experiencia: data.experiencia.filter((_, idx) => idx !== i),
                })
              }
              className="btn btn-red"
            >
              Eliminar experiencia
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={() =>
          setData({
            ...data,
            experiencia: [
              ...data.experiencia,
              { titulo: "", subtitulo: "", descripcion: [""] } as Experiencia,
            ],
          })
        }
        className="btn btn-blue"
      >
        Agregar experiencia
      </button>


      {/* Editar proyectos */}
      <h2 className="text-xl mt-8 mb-2">Proyectos</h2>
      {data.proyectos.map((proj, i) => (
        <div key={i} className="mb-6 border p-4 rounded">
          <input
            type="text"
            placeholder="Título"
            value={proj.titulo}
            onChange={(e) =>
              setData({
                ...data,
                proyectos: data.proyectos.map((pr, idx) =>
                  idx === i ? { ...pr, titulo: e.target.value } : pr
                ),
              })
            }
            className="w-full mb-2 p-2 rounded bg-white/10 text-white"
          />
          <input
            type="text"
            placeholder="Subtítulo"
            value={proj.subtitulo}
            onChange={(e) =>
              setData({
                ...data,
                proyectos: data.proyectos.map((pr, idx) =>
                  idx === i ? { ...pr, subtitulo: e.target.value } : pr
                ),
              })
            }
            className="w-full mb-2 p-2 rounded bg-white/10 text-white"
          />

          {/* Descripciones de proyecto */}
          <h3 className="text-lg mb-2">Descripciones</h3>
          {proj.descripcion.map((desc, j) => (
            <div key={j} className="flex items-start gap-2 mb-2">
              <textarea
                placeholder="Descripción"
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
                className="w-full h-20 p-2 rounded bg-white/10 text-white"
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
                className="btn btn-red"
              >
                🗑️
              </button>
            </div>
          ))}

          <div className="flex gap-2 mb-4">
            <button
              onClick={() =>
                setData({
                  ...data,
                  proyectos: data.proyectos.map((pr, idx) =>
                    idx === i
                      ? { ...pr, descripcion: [...pr.descripcion, ""] }
                      : pr
                  ),
                })
              }
              className="btn btn-blue"
            >
              Agregar descripción
            </button>
          </div>

          <h3 className="text-lg mb-2">Repo Links</h3>
          {proj.repoLink.map((link, j) => (
            <div key={j} className="flex items-start gap-2 mb-2">
              <input
                type="text"
                placeholder={`Link ${j + 1}`}
                value={link}
                onChange={(e) =>
                  setData({
                    ...data!,
                    proyectos: data!.proyectos.map((pr, idx) =>
                      idx === i
                        ? {
                          ...pr,
                          repoLink: pr.repoLink.map((l, k) =>
                            k === j ? e.target.value : l
                          ),
                        }
                        : pr
                    ),
                  })
                }
                className="w-full p-2 rounded bg-white/10 text-white"
              />
              <button
                onClick={() =>
                  setData({
                    ...data!,
                    proyectos: data!.proyectos.map((pr, idx) =>
                      idx === i
                        ? {
                          ...pr,
                          repoLink: pr.repoLink.filter((_, k) => k !== j),
                        }
                        : pr
                    ),
                  })
                }
                className="btn btn-red"
              >
                🗑️
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              setData({
                ...data!,
                proyectos: data!.proyectos.map((pr, idx) =>
                  idx === i ? { ...pr, repoLink: [...pr.repoLink, ""] } : pr
                ),
              })
            }
            className="btn btn-blue"
          >
            Agregar link
          </button>
          <button
            onClick={() =>
              setData({
                ...data,
                proyectos: data.proyectos.filter((_, idx) => idx !== i),
              })
            }
            className="btn btn-red"
          >
            Eliminar proyecto
          </button>
        </div>
      ))}

      <button
        onClick={() =>
          setData({
            ...data,
            proyectos: [
              ...data.proyectos,
              {
                titulo: "",
                subtitulo: "",
                descripcion: [""],
                repoLink: [""],
              } as Proyecto,
            ],
          })
        }
        className="btn btn-blue"
      >
        Agregar proyecto
      </button>

      <button
        onClick={handleSave}
        className="btn btn-green"
      >
        Guardar cambios
      </button>
    </main>
  );
}