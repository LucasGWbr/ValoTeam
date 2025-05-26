import { NextResponse } from 'next/server';
import pool from '../../../lib/dbinfo';

export async function POST(request: Request) {
  try {
    const { usuario, senha } = await request.json();

    const result = await pool.query('SELECT * FROM usuario WHERE nome = $1', [usuario]);

    if (result.rows.length > 0) {
      if (result.rows[0].senha === senha) {
        return NextResponse.json({
          message: 'Login feito com sucesso',
          usuario: result.rows[0],
        });
      } else {
        return NextResponse.json({ message: 'Senha incorreta' }, { status: 401 });
      }
    } else {
      return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
    }
  } catch (erro) {
    console.error(erro);
    return NextResponse.json({ error: erro }, { status: 500 });
  }
}