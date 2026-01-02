import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Trabajo, SobreMi} from "../types/portfolio";

export async function getTrabajo(): Promise<Trabajo | null> {
  const ref = doc(db, "portfolio", "trabajo");
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return snap.data() as Trabajo;
}

export async function getSobreMi(): Promise<SobreMi | null> {
  const ref = doc(db, "portfolio", "sobre_mi");
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return snap.data() as SobreMi;
}
