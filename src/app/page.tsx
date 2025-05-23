"use client";
import Image from 'next/image'
import {useState} from "react";
import {useRouter} from "next/navigation";
import CryptoJS from "crypto-js";
import toast from 'react-hot-toast';


export default function Home() {
    const [user, setUser] = useState("");
    const [senha, setSenha] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const senhaCript = CryptoJS.MD5(senha).toString();

        const res = await fetch('/api/login',{
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                usuario: user,
                senha: senhaCript
            })

        });
        const data = await res.json();
        if(!res.ok){
            toast.error(data.message);
        }else{
            toast.success(data.message);
            router.push('/LOLLLLL');
            console.log(data);
        }
    }



    return (

        <div className="flex h-screen w-screen items-center justify-center">
            <Image
                src='/1249094.jpg'
                alt="Fundo"
                fill
                quality={100}
                style={{ objectFit: 'cover' }}
                priority
            />
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-zinc-600 px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-semibold">Login</h3>
                    <p className="text-sm ">
                        Use seu usuario e senha para acessar
                    </p>
                </div>
                <form className="flex justify-center p-3 gap-5 align-items-center backdrop-blur-sm bg-white/50" name="login" onSubmit={handleSubmit} method="post">
                    <div>
                        <div className="form-floating m-3">
                            <input name="usuario" value={user} onChange={(e) => setUser(e.target.value)} required type="text" className="form-control" id="nome" placeholder="Nome"/>
                            <label htmlFor="nome">Usuario</label>
                        </div>
                        <div className="form-floating m-3">
                            <input value={senha} onChange={(e) => setSenha(e.target.value)} required name="pass" type="password" className="form-control" id="pass" placeholder="Senha"/>
                            <label htmlFor="pass">Senha</label>
                        </div>
                    </div>
                    <div>
                        <button id="enviar" type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
