"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f0d] text-[#A3B9A7]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-[#3BFF8F] border-t-transparent rounded-full animate-spin" />
          <span>Verificando sesión...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0f0d] text-white selection:bg-[#196442] selection:text-white pb-16">
      {/* Header / Navbar */}
      <header className="border-b border-white/[0.08] bg-[#101713]/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#3BFF8F] animate-pulse" />
            <span className="font-semibold text-sm tracking-wide text-white">Panel de Administración</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-[#3BFF8F] border border-emerald-500/20 hidden sm:inline-block">
              {user.email}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-[#A3B9A7] hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/[0.05] transition"
            >
              Ver sitio
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition cursor-pointer"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Hero / Welcome */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Gestión de Contenidos
          </h1>
          <p className="text-sm text-[#A3B9A7]">
            Seleccioná la sección que deseás editar para actualizar tu portafolio en tiempo real.
          </p>
        </div>
      </section>

      {/* Cards de Secciones */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 gap-5">
          <AdminSectionCard
            title="Sobre Mí"
            description="Editá tu biografía, presentación personal y enlaces a tus redes sociales."
            href="/admin/sobre-mi"
            badge="Biografía & Redes"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            }
          />

          <AdminSectionCard
            title="Experiencia y Proyectos"
            description="Gestioná tus puestos laborales, proyectos destacados, fechas y enlaces a repositorios."
            href="/admin/trabajo"
            badge="Historial Laboral"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            }
          />
        </div>
      </section>
    </main>
  );
}

function AdminSectionCard({
  title,
  description,
  href,
  badge,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  badge: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative rounded-2xl bg-[#121915]/80 border border-emerald-500/15 hover:border-emerald-500/40 p-6 transition-all duration-200 hover:shadow-[0_8px_30px_rgba(31,125,83,0.15)] flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-[#3BFF8F] border border-emerald-500/20 group-hover:bg-emerald-500/20 transition">
            {icon}
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] text-[#A3B9A7] border border-white/10">
            {badge}
          </span>
        </div>
        <h2 className="text-lg font-bold text-white group-hover:text-[#3BFF8F] transition">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-[#A3B9A7] mt-1.5 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#3BFF8F]">
        <span>Gestionar sección</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 transition-transform group-hover:translate-x-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </Link>
  );
}