"use client";
import Image from "next/image";
//npm install crypto-js
import CryptoJS from "crypto-js";
import { useState } from 'react';
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function cadastrarUser() {
    const router = useRouter();
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const senhaCript = CryptoJS.MD5(senha).toString();

        await fetch('/api/cadastro',{
           method: 'POST',
           headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                usuario: usuario,
                senha: senhaCript
            })

        });
    router.push('/');
    }


    return (

        <div className="flex h-screen w-screen items-center justify-end">
            <Image
                src='/1249094.jpg'
                alt="Fundo"
                fill
                quality={100}
                style={{ objectFit: 'cover' }}
                priority
            />
            <div className="mr-25 z-10 w-full max-w-xl h-screen overflow-hidden justify-content-center flex flex-col border border-gray-100 backdrop-blur-md bg-[#0F1923]/60">
                <div className="w-full max-h-45 flex flex-col items-center justify-center space-y-3 px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-extrabold">CADASTRO</h3>
                    <p className="text-sm font-medium">
                        Crie uma conta agora!
                    </p>
                </div>
                <form className="w-full p-3 gap-5 align-items-center" name="login" onSubmit={handleSubmit} method="post">
                    <div>
                        <div className="form-floating m-3">
                            <input name="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} required type="text" className="form-control" id="nome" placeholder="Nome"/>
                            <label htmlFor="nome">Usuario</label>
                        </div>
                        <div className="form-floating m-3 ">
                            <input value={senha} onChange={(e) => setSenha(e.target.value)} required name="pass" type="password" className="form-control" id="pass" placeholder="Senha"/>
                            <label htmlFor="pass">Senha</label>
                        </div>
                    </div>
                    <div className="flex gap-4 justify-center items-center">
                        <Link href="/">
                            <button className="bg-[#E8E5DF] hover:bg-[#d6d3cd] text-[#0F1923] hover:text-black font-semibold py-2 px-6 rounded transition">
                                VOLTAR
                            </button>
                        </Link>
                        <button id="enviar" type="submit" className="bg-[#F23D58] hover:bg-[#d62e47] text-white font-semibold py-2 px-6 rounded transition">
                            CRIAR CONTA
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}