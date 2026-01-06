"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, type Variants } from "framer-motion";
import "./globals.css";
import type { Trabajo, SobreMi } from "../../lib/types/portfolio";
import SobreMiSection from "./sections/sobreMiSection";
import TrabajoSection from "./sections/trabajoSection";
import ContactoSection from "./sections/contactoSection";

type Props = {
  trabajo: Trabajo | null;
  sobreMi: SobreMi | null;
};

export default function Portfolio({ trabajo, sobreMi }: Props) {
  const [section, setSection] =
    useState<"hola" | "trabajo" | "contacto">("hola");
  const [animando, setAnimando] = useState(true);

  useEffect(() => {
    if (section !== "hola") return;
    setAnimando(true);
    const timeout = setTimeout(() => setAnimando(false), 1200);
    return () => clearTimeout(timeout);
  }, [section]);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.25 } },
  };

  const item: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen font-[var(--font-martian)] bg-[#0F0E0E] relative overflow-hidden">
      {!trabajo || !sobreMi ? (
        <div className="flex items-center justify-center min-h-screen text-white">
          Cargando...
        </div>
      ) : (
        <>
          {/* Intro */}
          {section === "hola" && (
            <h1
              className={`absolute text-3xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ease-in-out ${
                animando ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              hola
            </h1>
          )}

          <div
            className={`w-[96vw] h-[92vh] border border-current pt-2 px-15 flex flex-col gap-2 transition-opacity duration-1000 ease-in-out relative overflow-hidden
              ${section === "hola" && animando ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}
          >
            {/* Navbar */}
            <nav className="w-full flex justify-center sticky top-0 z-20 backdrop-blur-md bg-[#0F0E0E]/80">
              <ul className="flex flex-col sm:flex-row sm:gap-4 md:gap-8 px-2 sm:px-8 items-center">
                <li>
                  <button
                    onClick={() => setSection("hola")}
                    className={`text-white text-xl hover:text-[#1F7D53] transition ${
                      section === "hola" ? "font-bold underline" : ""
                    }`}
                  >
                    Hola
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setSection("trabajo")}
                    className={`text-white text-xl hover:text-[#1F7D53] transition ${
                      section === "trabajo" ? "font-bold underline" : ""
                    }`}
                  >
                    Trabajo
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setSection("contacto")}
                    className={`text-white text-xl hover:text-[#1F7D53] transition ${
                      section === "contacto" ? "font-bold underline" : ""
                    }`}
                  >
                    Contacto
                  </button>
                </li>
              </ul>
            </nav>

            <div className="flex-1 overflow-y-auto scrollbar-hide fade-edges relative">
              <AnimatePresence mode="wait">

                {section === "hola" && sobreMi && !animando && (
                  <SobreMiSection
                    sobreMi={sobreMi}
                    animando={animando}
                    container={container}
                    item={item}
                  />
                )}

                {section === "trabajo" && !animando && (
                  <TrabajoSection
                    trabajo={trabajo}
                    container={container}
                    item={item}
                  />
                )}

                {section === "contacto" && !animando && (
                  <ContactoSection container={container} item={item} />
                )}
              </AnimatePresence>
            </div>
          </div>
        </>
      )}
    </div>
  );
}