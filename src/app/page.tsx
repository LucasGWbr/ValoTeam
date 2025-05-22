import Image from 'next/image'

export default function Home() {
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
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-gray-800 px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-semibold">Login</h3>
                    <p className="text-sm text-gray-500">
                        Use seu usuario e senha para acessar
                    </p>
                </div>
                <form className="flex justify-center p-3 gap-5 align-items-center backdrop-blur-sm bg-white/50" name="login" action="login" method="post">
                    <div>
                        <div className="form-floating m-3">
                            <input name="nome" type="text" className="form-control" id="nome" placeholder="Nome"/>
                            <label htmlFor="nome">Nome</label>
                        </div>
                        <div className="form-floating m-3">
                            <input name="pass" type="password" className="form-control" id="pass" placeholder="Senha"/>
                            <label htmlFor="pass">Senha</label>
                        </div>
                    </div>
                    <div>
                        <button disabled id="enviar" type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
