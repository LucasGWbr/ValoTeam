import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import pool from '../../../lib/dbinfo';

export async function POST(request: Request) {
  try {
    const { usuario, senha } = await request.json();

    if (!usuario || !senha) {
      return NextResponse.json({ message: 'Usuário e senha são obrigatórios' }, { status: 400 });
    }

    const result = await pool.query('SELECT * FROM usuario WHERE nome = $1', [usuario]);

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'Usuário ou senha inválidos' }, { status: 401 });
    }

    const user = result.rows[0];

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return NextResponse.json({ message: 'Usuário ou senha inválidos' }, { status: 401 });
    }

    delete user.senha;
    return NextResponse.json({ message: 'Login realizado com sucesso', usuario: user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro no login' }, { status: 500 });
  }
}
