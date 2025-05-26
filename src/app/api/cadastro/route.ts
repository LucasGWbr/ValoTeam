import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import pool from '../../../lib/dbinfo';

export async function POST(request: Request) {
  try {
    const { nome, senha } = await request.json();

    if (!nome || !senha) {
      return NextResponse.json({ message: 'Nome e senha são obrigatórios' }, { status: 400 });
    }

    const userCheck = await pool.query('SELECT * FROM usuario WHERE nome = $1', [nome]);
    if (userCheck.rowCount > 0) {
      return NextResponse.json({ message: 'Usuário já existe' }, { status: 400 });
    }

    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    const result = await pool.query(
      'INSERT INTO usuario (nome, senha) VALUES ($1, $2) RETURNING id, nome',
      [nome, senhaHash]
    );

    return NextResponse.json({ message: 'Usuário criado com sucesso', usuario: result.rows[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro no cadastro' }, { status: 500 });
  }
}
