"use client";

import { motion, type Variants } from "framer-motion";
import ContactForm from "../ContactForm";

type Props = {
    container: Variants;
    item: Variants;
};

export default function ContactoSection({ container, item }: Props) {
    return (
        <motion.div
            key="contacto"
            initial="hidden"
            animate="show"
            exit="hidden"
            className="relative px-2 py-8"
            variants={container}
        >
            <motion.h2 className="text-4xl text-center md:text-left mb-8" variants={item}>Contacto</motion.h2>
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                {/* Columna izquierda: Botón y mensaje */}
                <motion.div
                    className="flex-1 flex flex-col items-center md:items-center justify-center gap-4"
                    variants={item}
                >
                    <a
                        href="/cv.pdf"
                        download
                        className="px-6 py-3 rounded bg-[#1F7D53] text-white font-bold hover:bg-[#16613f] transition text-center"
                    >
                        Descargar CV
                    </a>
                    <p className="text-white/80 text-sm md:text-center text-center max-w-xs">
                        ¿Querés saber más sobre mi experiencia y formación? Descargá mi CV actualizado.
                    </p>
                </motion.div>
                {/* Columna derecha: Formulario */}
                <div className="flex-1 w-full">
                    <ContactForm />
                </div>
            </div>
        </motion.div>
    );
}
