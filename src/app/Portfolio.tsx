"use client";
import { useState, useEffect} from "react";
import type { Variants } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import '../app/globals.css';
import ContactForm from "./ContactForm";

export default function Portfolio() {
    const [section, setSection] = useState<"hola" | "trabajo" | "contacto">("hola");
    const [animando, setAnimando] = useState(true);

    const paragraphs = [
        "Soy Leo y estudio Ingeniería en Sistemas. Disfruto trabajar en proyectos que combinan creatividad y lógica, buscando siempre que el resultado combine buen diseño, rendimiento y usabilidad.",
        "He tenido la oportunidad de desarrollar proyectos académicos e iniciativas personales, donde aplico mis conocimientos en programación, robótica y diseño.",
        "Fuera del código, me gusta explorar el arte y la música, buscando inspiración que luego vuelco en mis proyectos.",
        "Este portfolio es una muestra de mi aprendizaje constante y de mi deseo de contribuir con soluciones originales y bien pensadas."
    ];

    useEffect(() => {
        if (section !== "hola") return;
        setAnimando(true);
        const timeout = setTimeout(() => setAnimando(false), 1200);
        return () => clearTimeout(timeout);
    }, [section]);

    const container: Variants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.25
            }
        }
    };


    const item: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    };

    return (
        <div className="flex items-center justify-center min-h-screen min-w-screen font-[var(--font-martian)] bg-[#0F0E0E] relative overflow-hidden">
            {/* intro */}
            {section === "hola" && (
                <h1
                    className={`absolute text-3xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ease-in-out ${animando ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                >
                    hola
                </h1>
            )}

            <div
                className={`w-[96vw] h-[92vh] border border-current pt-2 px-15 flex flex-col gap-2 transition-opacity duration-1000 ease-in-out ${section === "hola" && animando ? "opacity-0" : "opacity-100"
                    } relative overflow-hidden`}
            >
                {/* Navbar */}
                <nav className="w-full flex justify-center sticky top-0 z-20 backdrop-blur-md bg-[#0F0E0E]/80">
                    <ul className="flex flex-col gap- sm:flex-row sm:gap-4 md:gap-8 px-2 sm:px-8 items-center">
                        <li>
                            <button
                                onClick={() => setSection("hola")}
                                className={`text-white text-xl hover:text-[#1F7D53] transition ${section === "hola" ? "font-bold underline" : ""}`}
                            >
                                Hola
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setSection("trabajo")}
                                className={`text-white text-xl hover:text-[#1F7D53] transition ${section === "trabajo" ? "font-bold underline" : ""}`}
                            >
                                Trabajo
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setSection("contacto")}
                                className={`text-white text-xl hover:text-[#1F7D53] transition ${section === "contacto" ? "font-bold underline" : ""}`}
                            >
                                Contacto
                            </button>
                        </li>
                    </ul>
                </nav>
                <div className="flex-1 overflow-y-auto scrollbar-hide fade-edges relative">

                    {/* Contenido animado */}
                    <AnimatePresence mode="wait">
                        {section === "hola" && !animando && (
                            <motion.div
                                key="hola"
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                                className="flex flex-col justify-between min-h-full px-2 py-8"
                                variants={container}
                            >
                                <div>
                                    <motion.h2 className="text-4xl text-center md:text-left  mb-8" variants={item}>Sobre mí</motion.h2>
                                    {paragraphs.map((text, idx) => (
                                        <motion.p
                                            key={idx}
                                            className="text-xl text-white font-mono mb-2"
                                            variants={item}
                                        >
                                            {text}
                                        </motion.p>
                                    ))}
                                </div>

                                <motion.div
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    variants={item}
                                    className="flex justify-center gap-2"
                                >
                                    <a
                                        href="https://www.instagram.com/leitogonzalez06/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg flex items-center border-gray-300 justify-center transition-all duration-500 group"
                                        aria-label="Instagram"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 448 512"
                                            width="28"
                                            height="28"
                                            className="text-#gray-300 transition-colors duration-300 group-hover:text-[#1F7D53]"
                                        >
                                            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/leonardo-gonzalez-818450304/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg flex items-center border-gray-300 justify-center transition-all duration-500 group"
                                        aria-label="LinkedIn"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 448 512"
                                            width="28"
                                            height="28"
                                            className="text-#gray-300 transition-colors duration-300 group-hover:text-[#1F7D53]"
                                        >
                                            <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://github.com/LeitoGonzalez"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg flex items-center border-gray-300 justify-center transition-all duration-500 group"
                                        aria-label="GitHub"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 496 512"
                                            width="28"
                                            height="28"
                                            className="text-#gray-300 transition-colors duration-300 group-hover:text-[#1F7D53]"
                                        >
                                            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                                        </svg>
                                    </a>
                                </motion.div>
                            </motion.div>
                        )}

                        {section === "trabajo" && (
                            <motion.div
                                key="trabajo"
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                                className="px-2 py-8 min-h-full"
                                variants={container}
                            >

                                {/* Proyectos Personales */}
                                <motion.h2 className="text-4xl text-center md:text-left mb-8" variants={item}>Proyectos Personales</motion.h2>
                                <motion.div
                                    className="relative px-2 sm:px-2 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))] justify-items-center items-stretch"
                                    variants={container}
                                >
                                    {/* Proyecto 1 */}
                                    <motion.div
                                        className="border border-white/20 rounded-xl p-5 backdrop-blur-md bg-white/5 hover:scale-[1.01] transition-all min-h-[200px] w-full flex flex-col"
                                        variants={item}
                                    >
                                        <h4 className="text-lg font-semibold text-white">Portfolio Web</h4>
                                        <p className="text-sm text-white/60 mb-2">2025</p>
                                        <ul className="list-disc ml-5 text-white/80 text-sm space-y-1">
                                            <li>Desarrollado con Next.js, Tailwind y Framer Motion.</li>
                                            <li>Diseño responsive y animaciones suaves.</li>
                                            <li>Secciones dinámicas con contenido animado y transiciones.</li>
                                            <li>
                                                <a href="https://github.com/LeitoGonzalez/portfolio" target="_blank" className="underline hover:text-[#1F7D53]">Repositorio</a>
                                            </li>
                                        </ul>
                                    </motion.div>
                                    {/* Proyecto 2 */}
                                    <motion.div
                                        className="border border-white/20 rounded-xl p-5 backdrop-blur-md bg-white/5 hover:scale-[1.01] transition-all min-h-[200px] w-full flex flex-col"
                                        variants={item}
                                    >
                                        <h4 className="text-lg font-semibold text-white">Sistema de Gestión</h4>
                                        <p className="text-sm text-white/60 mb-2">2023 · Proyecto académico</p>
                                        <ul className="list-disc ml-5 text-white/80 text-sm space-y-1">
                                            <li>Sistema fullstack para un comercio de comida rápida.</li>
                                            <li>Frontend en React. Backend en Java Spring Boot.</li>
                                            <li>Gestión de productos, pedidos, usuarios y reportes.</li>
                                            <li>
                                                <a href="https://github.com/LeitoGonzalez/ElBuenSabor-Reactionando-" target="_blank" className="underline hover:text-[#1F7D53]">Repositorio Backend</a> ·
                                                <a href="https://github.com/LeitoGonzalez/ElBuenSabor-Reactionando-Front" target="_blank" className="underline hover:text-[#1F7D53] ml-1">Frontend</a>
                                            </li>
                                        </ul>
                                    </motion.div>
                                </motion.div>

                                {/* Sección Trabajo */}
                                <motion.h2 className="text-4xl text-center md:text-left mt-12 mb-8" variants={item}>Trabajo</motion.h2>
                                <motion.div
                                    className="relative px-2 sm:px-2 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))] justify-items-center items-stretch"
                                    variants={container}
                                >
                                    {/* Tarjeta 1 */}
                                    <motion.div
                                        className="border border-white/20 rounded-xl p-5 backdrop-blur-md bg-white/5 hover:scale-[1.01] transition-all min-h-[200px] w-full flex flex-col"
                                        variants={item}
                                    >
                                        <h3 className="text-xl font-semibold text-white">Profesor</h3>
                                        <p className="text-sm text-white/60 mb-2">FODA · 2024 - Actualidad</p>
                                        <ul className="list-disc ml-5 text-white/80 text-sm space-y-1">
                                            <li>Clases de robótica avanzada con Arduino (12 a 14 años).</li>
                                            <li>Clases de programación básica con Python (10 a 12 años).</li>
                                            <li>Diseño de guías, tareas y proyectos educativos.</li>
                                            <li>Seguimiento personalizado del progreso de cada alumno.</li>
                                        </ul>
                                    </motion.div>

                                    {/* Tarjeta 2 */}
                                    <motion.div
                                        className="border border-white/20 rounded-xl p-5 backdrop-blur-md bg-white/5 hover:scale-[1.01] transition-all min-h-[200px] w-full flex flex-col"
                                        variants={item}
                                    >
                                        <h3 className="text-xl font-semibold text-white">Técnico en reparaciones</h3>
                                        <p className="text-sm text-white/60 mb-2">ABBA Service · 2020 - 2023</p>
                                        <ul className="list-disc ml-5 text-white/80 text-sm space-y-1">
                                            <li>Armado, mantenimiento y reparación de computadoras.</li>
                                            <li>Limpieza y optimización de equipos personales.</li>
                                            <li>Documentación de presupuestos, diagnósticos y tiempos de reparación.</li>
                                            <li>Manejo de herramientas manuales y medición de componentes electrónicos.</li>
                                        </ul>
                                    </motion.div>
                                </motion.div>


                            </motion.div>
                        )}

                        {section === "contacto" && (
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
                        )}
                    </AnimatePresence>


                </div>
            </div>
        </div>
    );
}