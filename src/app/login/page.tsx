"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  async function fazerLogin() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, senha }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("id_usuario", data.usuario.id.toString());
      router.push("/times");
    } else {
      const err = await res.json();
      alert(err.message || "Erro no login");
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      <input
        type="text"
        placeholder="Usuário"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      <button
        onClick={fazerLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Entrar
      </button>
    </div>
  );
}