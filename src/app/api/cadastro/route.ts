import { NextResponse } from 'next/server';
import pool from '../../../lib/dbinfo';

export async function POST(request: Request) {
  try {
    const { usuario, senha } = await request.json();

    const query = 'INSERT INTO usuario (nome, senha) VALUES ($1, $2) RETURNING *';
    const data = [usuario, senha];

    const result = await pool.query(query, data);

    return NextResponse.json({
      message: 'Usuário cadastrado com sucesso',
      usuario: result.rows[0],
    });
  } catch (erro) {
    console.error(erro);
    return NextResponse.json({ error: 'Erro ao cadastrar usuário' }, { status: 500 });
  }
}