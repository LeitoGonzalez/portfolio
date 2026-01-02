import Portfolio from "./Portfolio";
import { getTrabajo, getSobreMi } from "../../lib/services/portfolio";

export default async function Home() {
  const trabajo = await getTrabajo();
  const sobreMi = await getSobreMi();

  return <Portfolio trabajo={trabajo} sobreMi={sobreMi} />;
}
