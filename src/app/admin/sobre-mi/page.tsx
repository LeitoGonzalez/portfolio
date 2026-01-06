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
    await updateDoc(doc(db, "portfolio", "sobre_mi"), data);
    alert("Sección 'Sobre mí' actualizada");
  };

  if (loading) return <p className="text-white">Cargando...</p>;
  if (!data) return <p className="text-white">No se encontró información en Firestore</p>;

  return (
    <main className="min-h-screen px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Editar Sobre Mí</h1>

      {/* Botones de navegación */}
      <div className="flex gap-4 mb-6">
        <Link href="/admin">
          <button className="btn btn-gray">Volver al menú principal</button>
        </Link>
      </div>

      {/* Editar párrafos */}
      <h2 className="text-xl mb-2">Párrafos</h2>
      {data.paragraphs.map((p, i) => (
        <div key={i} className="flex items-start gap-2 mb-4">
          <textarea
            value={p}
            onChange={(e) =>
              setData({
                ...data,
                paragraphs: data.paragraphs.map((para, idx) =>
                  idx === i ? e.target.value : para
                ),
              })
            }
            className="w-full h-24 p-2 rounded bg-white/10 text-white"
          />
          <button
            onClick={() =>
              setData({
                ...data,
                paragraphs: data.paragraphs.filter((_, idx) => idx !== i),
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
            ...data,
            paragraphs: [...data.paragraphs, ""],
          })
        }
        className="btn btn-blue"
      >
        Agregar párrafo
      </button>

      {/* Editar redes */}
      <h2 className="text-xl mt-6 mb-2">Redes</h2>
      <input
        type="text"
        placeholder="Instagram"
        value={data.redes.instagram}
        onChange={(e) =>
          setData({ ...data, redes: { ...data.redes, instagram: e.target.value } })
        }
        className="w-full mb-2 p-2 rounded bg-white/10 text-white"
      />
      <input
        type="text"
        placeholder="LinkedIn"
        value={data.redes.linkedin}
        onChange={(e) =>
          setData({ ...data, redes: { ...data.redes, linkedin: e.target.value } })
        }
        className="w-full mb-2 p-2 rounded bg-white/10 text-white"
      />
      <input
        type="text"
        placeholder="GitHub"
        value={data.redes.github}
        onChange={(e) =>
          setData({ ...data, redes: { ...data.redes, github: e.target.value } })
        }
        className="w-full mb-4 p-2 rounded bg-white/10 text-white"
      />

      <button
        onClick={handleSave}
        className="btn btn-green mt-4"
      >
        Guardar cambios
      </button>
    </main>
  );
}