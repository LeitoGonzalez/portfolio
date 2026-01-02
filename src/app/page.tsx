import Portfolio from "./Portfolio";
import { getTrabajo, getSobreMi } from "../../lib/services/portfolio";

export const revalidate = 0;

export default async function Home() {
  const trabajo = await getTrabajo();
  const sobreMi = await getSobreMi();

  return <Portfolio trabajo={trabajo} sobreMi={sobreMi} />;
}
