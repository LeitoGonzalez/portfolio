"use client";

import LoginForm from "./LoginForm";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-[#0a0f0d] text-white p-4 sm:p-6 lg:p-8 overflow-hidden font-sans selection:bg-[#196442] selection:text-white">
      {/* Fondo ambiental con gradientes radiales difuminados */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-[128px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#3BFF8F]/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-emerald-950/30 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Trama de cuadrícula tecnológica sutil */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Contenedor animado con Framer Motion */}
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full flex justify-center"
      >
        <LoginForm />
      </motion.div>
    </main>
  );
}