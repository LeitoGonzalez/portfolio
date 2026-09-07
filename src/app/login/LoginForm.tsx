// src/app/login/LoginForm.tsx
"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../../lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in:", userCredential.user);
      router.push("/admin");
    } catch (error: unknown) {
      console.error("Error al iniciar sesión:", error);
      const firebaseError = error as { code?: string; message?: string };
      if (
        firebaseError?.code === "auth/invalid-credential" ||
        firebaseError?.code === "auth/user-not-found" ||
        firebaseError?.code === "auth/wrong-password"
      ) {
        setErrorMessage("Credenciales incorrectas. Verificá tu correo y contraseña.");
      } else if (firebaseError?.code === "auth/too-many-requests") {
        setErrorMessage("Demasiados intentos fallidos. Por favor, esperá unos minutos.");
      } else if (firebaseError?.code === "auth/invalid-email") {
        setErrorMessage("El formato del correo electrónico no es válido.");
      } else {
        setErrorMessage("No se pudo iniciar sesión. Verificá tus datos o tu conexión.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Tarjeta Glassmorphic */}
      <div className="relative rounded-3xl bg-[#121915]/75 border border-emerald-500/20 shadow-[0_8px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl p-7 sm:p-10 overflow-hidden">
        {/* Línea de brillo decorativa superior */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#3BFF8F]/50 to-transparent" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Encabezado */}
        <div className="flex flex-col items-center text-center mb-8 relative">
          {/* Badge superior */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18231c]/80 border border-emerald-500/20 text-[11px] font-medium text-[#A3B9A7] mb-5 tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3BFF8F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3BFF8F]"></span>
            </span>
            <span>Panel de Administración</span>
          </div>

          {/* Icono de escudo / candado */}
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-[#3BFF8F] shadow-[0_0_25px_rgba(31,125,83,0.25)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.75}
              stroke="currentColor"
              className="w-7 h-7"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Iniciar Sesión
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#A3B9A7] leading-relaxed">
            Ingresá tus credenciales para gestionar el contenido y proyectos de tu portafolio.
          </p>
        </div>

        {/* Mensaje de Error Animado */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              role="alert"
              aria-live="assertive"
              className="mb-6 flex items-start gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-200 text-xs sm:text-sm leading-snug"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-red-400 shrink-0 mt-0.5"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="flex-1 font-normal">{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Campo Email */}
          <div>
            <label
              htmlFor="email-input"
              className="block text-xs font-semibold text-[#E6F2E9] mb-2 tracking-wide"
            >
              Correo Electrónico
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A3B9A7] group-focus-within:text-[#3BFF8F] transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.75}
                  stroke="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <input
                id="email-input"
                type="email"
                required
                autoComplete="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                className="w-full pl-11 pr-4 py-3 bg-white/[0.04] hover:bg-white/[0.06] focus:bg-white/[0.08] border border-white/10 focus:border-[#3BFF8F]/60 rounded-xl text-white placeholder-zinc-500 text-sm outline-none transition-all duration-200 focus:ring-4 focus:ring-[#1F7D53]/25"
              />
            </div>
          </div>

          {/* Campo Contraseña */}
          <div>
            <label
              htmlFor="password-input"
              className="block text-xs font-semibold text-[#E6F2E9] mb-2 tracking-wide"
            >
              Contraseña
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A3B9A7] group-focus-within:text-[#3BFF8F] transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.75}
                  stroke="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                  />
                </svg>
              </div>
              <input
                id="password-input"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                className="w-full pl-11 pr-11 py-3 bg-white/[0.04] hover:bg-white/[0.06] focus:bg-white/[0.08] border border-white/10 focus:border-[#3BFF8F]/60 rounded-xl text-white placeholder-zinc-500 text-sm outline-none transition-all duration-200 focus:ring-4 focus:ring-[#1F7D53]/25"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#A3B9A7] hover:text-[#3BFF8F] transition-colors duration-150 cursor-pointer"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.75}
                    stroke="currentColor"
                    className="w-5 h-5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.75}
                    stroke="currentColor"
                    className="w-5 h-5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Botón de Ingreso */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#1F7D53] via-[#239261] to-[#2db679] hover:from-[#239261] hover:to-[#35c987] shadow-[0_4px_22px_rgba(31,125,83,0.35)] hover:shadow-[0_6px_28px_rgba(59,255,143,0.32)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Iniciando sesión...</span>
              </>
            ) : (
              <>
                <span>Iniciar sesión</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </>
            )}
          </motion.button>
        </form>

        {/* Separador sutil */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A3B9A7]">
          {/* Enlace de regreso */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-[#3BFF8F] transition-colors duration-150 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-3.5 h-3.5 transition-transform duration-150 group-hover:-translate-x-0.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            <span>Volver al portafolio</span>
          </Link>

          {/* Badge de Seguridad */}
          <div className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3.5 h-3.5 text-[#3BFF8F]/80"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                clipRule="evenodd"
              />
            </svg>
            <span>Cifrado SSL &bull; Firebase</span>
          </div>
        </div>
      </div>
    </div>
  );
}