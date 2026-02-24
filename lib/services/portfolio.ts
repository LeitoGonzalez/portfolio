import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Trabajo, SobreMi} from "../types/portfolio";

export async function getTrabajo(): Promise<Trabajo | null> {
  const ref = doc(db, "portfolio", "trabajo");
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  const data = snap.data();

  return {
    ...data,
    proyectos: data.proyectos?.map((p: any) => ({
      ...p,
      date: p.date?.toDate().toISOString(),
    })),
    experiencia: data.experiencia?.map((e: any) => ({
      ...e,
      fechaInicio: e.fechaInicio?.toDate().toISOString(),
      fechaFin: e.fechaFin?.toDate().toISOString(),
    })),
  } as Trabajo;
}

export async function getSobreMi(): Promise<SobreMi | null> {
  const ref = doc(db, "portfolio", "sobre_mi");
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return snap.data() as SobreMi;
}
