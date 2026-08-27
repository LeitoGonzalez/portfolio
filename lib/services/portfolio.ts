import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Trabajo, SobreMi } from "../types/portfolio";

type FirestoreProyecto = {
  date?: string | { toDate?: () => Date } | null;
  titulo: string;
  subtitulo: string;
  descripcion: string[];
  repoLink: { label: string; url: string }[];
  images: string[];
};

type FirestoreExperiencia = {
  fechaInicio?: string | { toDate?: () => Date } | null;
  fechaFin?: string | { toDate?: () => Date } | null;
  titulo: string;
  subtitulo: string;
  descripcion: string[];
};

export async function getTrabajo(): Promise<Trabajo | null> {
  const ref = doc(db, "portfolio", "trabajo");
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  const data = snap.data();

  return {
    ...data,
    proyectos: (data.proyectos ?? []).map((p: FirestoreProyecto) => ({
      ...p,
      date:
        typeof p.date === "string"
          ? p.date
          : p.date?.toDate?.().toISOString() ?? null,
    })),
    experiencia: (data.experiencia ?? []).map((e: FirestoreExperiencia) => ({
      ...e,
      fechaInicio:
        typeof e.fechaInicio === "string"
          ? e.fechaInicio
          : e.fechaInicio?.toDate?.().toISOString() ?? null,
      fechaFin:
        typeof e.fechaFin === "string"
          ? e.fechaFin
          : e.fechaFin?.toDate?.().toISOString() ?? null,
    })),
  } as Trabajo;
}

export async function getSobreMi(): Promise<SobreMi | null> {
  const ref = doc(db, "portfolio", "sobre_mi");
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return snap.data() as SobreMi;
}
