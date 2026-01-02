"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";

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

  if (!user) {
    return <p className="text-white text-center mt-20">Verificando sesión...</p>;
  }

  return (
    <main className="min-h-screen px-4 py-8 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Panel de Administración</h1>

      <div className="grid gap-6 max-w-xl mx-auto">
        <AdminCard title="Editar Sobre Mí" href="/admin/sobre-mi" />
        <AdminCard title="Editar Experiencia y Proyectos" href="/admin/trabajo" />
      </div>
    </main>
  );
}

function AdminCard({ title, href }: { title: string; href: string }) {
  return (
    <a
      href={href}
      className="block p-6 rounded-lg bg-white/10 hover:bg-white/20 transition text-center font-semibold"
    >
      {title}
    </a>
  );
}