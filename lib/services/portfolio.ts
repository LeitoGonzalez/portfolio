import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Trabajo, SobreMi } from "../types/portfolio";

export async function getTrabajo(): Promise<Trabajo | null> {
  const ref = doc(db, "portfolio", "trabajo");
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  const data = snap.data();

  console.log(
    typeof data?.proyectos?.[0]?.date,
    data?.proyectos?.[0]?.date
  );

  return {
    ...data,
    proyectos: (data.proyectos ?? []).map((p: any) => ({
      ...p,
      date:
        typeof p.date === "string"
          ? p.date
          : p.date?.toDate?.().toISOString() ?? null,
    })),
    experiencia: (data.experiencia ?? []).map((e: any) => ({
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
