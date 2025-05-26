"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
    const [modoCadastro, setModoCadastro] = useState(false);
    const [user, setUser] = useState("");
    const [senha, setSenha] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user || !senha) {
            toast.error("Preencha todos os campos");
            return;
        }

        if (modoCadastro) {
            const res = await fetch('/api/cadastro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: user, senha }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Erro no cadastro");
            } else {
                toast.success("Cadastro realizado! Faça login.");
                setModoCadastro(false);
                setSenha("");
            }
        } else {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario: user, senha }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Erro no login");
            } else {
                localStorage.setItem('id_usuario', data.usuario.id);
                toast.success(data.message);
                router.push('/times');
            }
        }
    };

    return (
        <div className="flex h-screen w-screen items-center justify-end">
            <Image src='/1249094.jpg' alt="Fundo" fill quality={100} style={{ objectFit: 'cover' }} priority />
            <div className="mr-25 z-10 w-full max-w-xl h-screen flex flex-col justify-center border border-gray-100 backdrop-blur-md bg-[#0F1923]/60">
                <h3 className="text-xl font-extrabold text-center mt-8">{modoCadastro ? "CADASTRO" : "LOGIN"}</h3>
                <form className="w-full p-6" onSubmit={handleSubmit}>
                    <input
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                        placeholder="Usuário"
                        className="w-full mb-4 p-2"
                    />
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        placeholder="Senha"
                        className="w-full mb-4 p-2"
                    />
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => {
                                setModoCadastro(!modoCadastro);
                                setSenha("");
                            }}
                        >
                            {modoCadastro ? "FAZER LOGIN" : "CRIAR CONTA"}
                        </button>
                        <button type="submit">{modoCadastro ? "CADASTRAR" : "ENTRAR"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}