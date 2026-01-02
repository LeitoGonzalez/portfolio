"use client";

import { motion, type Variants } from "framer-motion";
import type { Trabajo } from "../../../lib/types/portfolio";

type Props = {
    trabajo: Trabajo;
    container: Variants;
    item: Variants;
};

export default function TrabajoSection({
    trabajo,
    container,
    item,
}: Props) {

    return (<motion.div
        key="trabajo"
        initial="hidden"
        animate="show"
        exit="hidden"
        className="px-2 py-8 min-h-full"
        variants={container}
    >

        {/* Proyectos Personales */}
        <motion.h2
            className="text-4xl text-center md:text-left mb-8"
            variants={item}
        >
            Proyectos Personales
        </motion.h2>

        <motion.div
            className="relative px-2 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]"
            variants={container}
        >
            {trabajo.proyectos.map((proy) => (
                <motion.div
                    key={proy.titulo}
                    className="border border-white/20 rounded-xl p-5 backdrop-blur-md bg-white/5 hover:scale-[1.01] transition-all min-h-[200px] w-full flex flex-col"
                    variants={item}
                >
                    <h4 className="text-lg font-semibold text-white">
                        {proy.titulo}
                    </h4>

                    <p className="text-sm text-white/60 mb-2">
                        {proy.subtitulo}
                    </p>

                    <ul className="list-disc ml-5 text-white/80 text-sm space-y-1">
                        {proy.descripcion.map((d, i) => (
                            <li key={i}>{d}</li>
                        ))}

                        {proy.repoLink && proy.repoLink.map((link, j) => (
                            <li key={j}>
                                <a
                                    href={link}
                                    target="_blank"
                                    className="underline hover:text-[#1F7D53]"
                                >
                                    Repositorio
                                </a>
                            </li>
                        ))}

                    </ul>
                </motion.div>
            ))}
        </motion.div>

        {/* Sección Trabajo */}
        <motion.h2
            className="text-4xl text-center md:text-left mt-12 mb-8"
            variants={item}
        >
            Trabajo
        </motion.h2>

        <motion.div
            className="relative px-2 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]"
            variants={container}
        >
            {trabajo.experiencia.map((exp) => (
                <motion.div
                    key={exp.titulo}
                    className="border border-white/20 rounded-xl p-5 backdrop-blur-md bg-white/5 hover:scale-[1.01] transition-all min-h-[200px] w-full flex flex-col"
                    variants={item}
                >
                    <h3 className="text-xl font-semibold text-white">
                        {exp.titulo}
                    </h3>

                    <p className="text-sm text-white/60 mb-2">
                        {exp.subtitulo}
                    </p>

                    <ul className="list-disc ml-5 text-white/80 text-sm space-y-1">
                        {exp.descripcion.map((d, i) => (
                            <li key={i}>{d}</li>
                        ))}
                    </ul>
                </motion.div>
            ))}
        </motion.div>



    </motion.div>)


}
