"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CryptoJS from 'crypto-js';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
    const [user, setUser] = useState("");
    const [senha, setSenha] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const senhaCript = CryptoJS.MD5(senha).toString();

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario: user, senha: senhaCript }),
        });

        const data = await res.json();
        if (!res.ok) {
            toast.error(data.message);
        } else {
            localStorage.setItem('id_usuario', data.usuario.id);
            toast.success(data.message);
            router.push('/times');
        }
    };

    return (
        <div className="flex h-screen w-screen items-center justify-end">
            <Image src='/1249094.jpg' alt="Fundo" fill quality={100} style={{ objectFit: 'cover' }} priority />
            <div className="mr-25 z-10 w-full max-w-xl h-screen flex flex-col justify-center border border-gray-100 backdrop-blur-md bg-[#0F1923]/60">
                <h3 className="text-xl font-extrabold text-center mt-8">LOGIN</h3>
                <form className="w-full p-6" onSubmit={handleSubmit}>
                    <input value={user} onChange={(e) => setUser(e.target.value)} required placeholder="Usuário" className="w-full mb-4 p-2" />
                    <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required placeholder="Senha" className="w-full mb-4 p-2" />
                    <div className="flex justify-between">
                        <Link href="/cadastro"><button type="button">CRIAR CONTA</button></Link>
                        <button type="submit">ENTRAR</button>
                    </div>
                </form>
            </div>
        </div>
    );
}