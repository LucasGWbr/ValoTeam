"use client";
import Image from "next/image";
//npm install crypto-js
import CryptoJS from "crypto-js";
import { useState } from 'react';
import {useRouter} from "next/navigation";

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

        <div className="flex h-screen w-screen items-center justify-center">
            <Image
                src='/1249094.jpg'
                alt="Fundo"
                fill
                quality={100}
                style={{objectFit: 'cover'}}
                priority
            />
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div
                    className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-zinc-600 px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-semibold">Cadastro</h3>
                    <p className="text-sm ">
                        Crie uma conta com usuario e senha
                    </p>
                </div>
                <form className="flex justify-center p-3 gap-5 align-items-center backdrop-blur-sm bg-white/50"
                      name="login" onSubmit={handleSubmit} method="post">
                    <div>
                        <div className="form-floating m-3">
                            <input value={usuario} onChange={(e) => setUsuario(e.target.value)} required name="nome" type="text" className="form-control" placeholder="Nome"/>
                            <label htmlFor="nome">Usuario</label>
                        </div>
                        <div className="form-floating m-3">
                            <input value={senha} name="pass" onChange={(e) => setSenha(e.target.value)} required type="password" className="form-control" id="pass" placeholder="Senha"/>
                            <label htmlFor="pass">Senha</label>
                        </div>
                    </div>
                    <div>
                        <button id="enviar" type="submit" className="btn btn-primary">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    );

}