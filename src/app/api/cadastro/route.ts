import { NextResponse } from 'next/server';
import pool from '../../../lib/dbinfo';


//CREATE TABLE usuario (id SERIAL PRIMARY KEY, nome VARCHAR(100) NOT NULL, senha varchar(400) NOT NULL);
export async function GET() {


}

export async function POST(request: Request) {
    try {
        const {usuario, senha} = await request.json();

        const query = "INSERT INTO usuario (nome,senha) VALUES($1,$2) RETURNING *";
        const data = [usuario, senha];

        const result = await pool.query(query,data);

        return NextResponse.json({
            message: "Usuario cadastrado com sucesso",
            usuario: result.rows[0],
        });
    }catch (erro) {
        console.error(erro);
        return NextResponse.json(
            {error: "Erro ao cadastrar usuario"},
            {status: 500}
        )

    }

}