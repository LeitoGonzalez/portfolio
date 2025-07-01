"use client";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/meoknrdv", {
        method: "POST",
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Error al enviar el mensaje.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Error de conexión, intenta más tarde.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto text-white font-mono">
      <label className="flex flex-col">
        Nombre
        <input
          type="text"
          name="name"
          required
          className="mt-1 p-2 rounded bg-[#181818] border border-white/20 text-white"
          disabled={status === "sending"}
        />
      </label>
      <label className="flex flex-col">
        Email
        <input
          type="email"
          name="email"
          required
          className="mt-1 p-2 rounded bg-[#181818] border border-white/20 text-white"
          disabled={status === "sending"}
        />
      </label>
      <label className="flex flex-col">
        Mensaje
        <textarea
          name="message"
          required
          rows={5}
          className="mt-1 p-2 rounded bg-[#181818] border border-white/20 text-white resize-none"
          disabled={status === "sending"}
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 px-4 py-2 rounded bg-[#1F7D53] text-white font-bold hover:bg-[#16613f] transition disabled:opacity-50"
      >
        {status === "sending" ? "Enviando..." : "Enviar"}
      </button>

      {status === "success" && <p className="mt-2 text-green-500">¡Mensaje enviado con éxito! Gracias por contactarme.</p>}
      {status === "error" && <p className="mt-2 text-red-500">Error: {errorMsg}</p>}
    </form>
  );
}
