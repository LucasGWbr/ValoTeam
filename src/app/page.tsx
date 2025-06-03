"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
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
                sessionStorage.setItem('id_usuario', data.usuario.id);
                toast.success(data.message);
                router.push('/times');
            }
        }
    };

    return (
        <div className="flex h-screen w-screen items-center justify-end">
            <Image src='/1249094.jpg' alt="Fundo" fill quality={100} draggable={false} style={{ objectFit: 'cover', userSelect: 'none', pointerEvents: 'none'}} priority />
            <div className="mr-25 z-10 w-full max-w-xl h-screen flex flex-col justify-center border border-gray-100 backdrop-blur-md bg-[#0F1923]/60">

                <h3 className="text-white text-2xl font-bold mb-6 text-center">{modoCadastro ? "CADASTRO" : "LOGIN"}</h3>

                <form className="w-full p-6 " onSubmit={handleSubmit}>
                    <div className="flex items-center border-b border-gray-300 py-2 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 flex-shrink-0" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <input
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            required
                            placeholder="Usuário"
                            className="flex-1 bg-transparent focus:outline-none text-white placeholder-gray-300"
                        />
                    </div>

                    <div className="flex items-center border-b border-gray-300 py-2 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 flex-shrink-0" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M12 15v2m-6-6V9a6 6 0 1112 0v2m2 0H4v10h16V11z"/>
                        </svg>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                            placeholder="Senha"
                            className="flex-1 bg-transparent focus:outline-none text-white placeholder-gray-300"
                        />
                    </div>

                    <div className="flex gap-4 justify-center items-center my-4">
                        <button
                            className="bg-[#E8E5DF] hover:bg-[#d6d3cd] text-[#0F1923] hover:text-black font-semibold py-2 px-6 rounded transition"
                            type="button"
                                onClick={() => {
                                    setModoCadastro(!modoCadastro);
                                    setSenha("");
                                }}
                            >
                                {modoCadastro ? "FAZER LOGIN" : "CRIAR CONTA"}
                            </button>
                            <button
                                className="bg-[#F23D58] hover:bg-[#d62e47] text-white font-semibold py-2 px-6 rounded transition-shadow"
                                type="submit">{modoCadastro ? "CADASTRAR" : "ENTRAR"}</button>
                        </div>
                </form>
            </div>
        </div>
);
}