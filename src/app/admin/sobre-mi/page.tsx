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
          <button className="px-4 py-2 bg-gray-600 rounded text-white hover:bg-gray-700">
            Volver al menú principal
          </button>
        </Link>
      </div>

      {/* Editar párrafos */}
      <h2 className="text-xl mb-2">Párrafos</h2>
      {data.paragraphs.map((p, i) => (
        <textarea
          key={i}
          value={p}
          onChange={(e) =>
            setData({
              ...data,
              paragraphs: data.paragraphs.map((para, idx) =>
                idx === i ? e.target.value : para
              ),
            })
          }
          className="w-full h-24 mb-4 p-2 rounded bg-white/10 text-white"
        />
      ))}

      {/* Editar redes */}
      <h2 className="text-xl mb-2">Redes</h2>
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
        className="mt-4 px-6 py-2 bg-[#1F7D53] rounded text-white font-bold"
      >
        Guardar cambios
      </button>
    </main>
  );
}
