import { NextResponse } from 'next/server';
import pool from '../../../lib/dbinfo';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id_usuario = url.searchParams.get('id_usuario');
    if (!id_usuario) {
      return NextResponse.json({ error: 'Usuário não informado' }, { status: 400 });
    }

    const result = await pool.query('SELECT * FROM times WHERE id_usuario = $1 ORDER BY id', [id_usuario]);

    return NextResponse.json({ times: result.rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar times' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id_usuario, nome_time, agentes, mapa } = await request.json();

    if (!id_usuario || !nome_time || !agentes || agentes.length === 0 || !mapa) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    const query =
      'INSERT INTO times (id_usuario, nome_time, agentes, mapa) VALUES ($1, $2, $3, $4) RETURNING *';

    const result = await pool.query(query, [id_usuario, nome_time, agentes, mapa]);

    return NextResponse.json({ message: 'Time criado com sucesso', time: result.rows[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao criar time' }, { status: 500 });
  }
}
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const idTime = url.searchParams.get('id');
    if (!idTime) {
      return NextResponse.json({ error: 'Time não informado' }, { status: 400 });
    }
    const query = await pool.query("DELETE FROM times WHERE id = $1", [idTime]);

    if(query.rowCount === 0){
      return NextResponse.json({ error: 'Erro ao excluir time 1' }, { status: 500 });
    }else{
      return NextResponse.json({ message: 'Time excluido com sucesso', time: query.rows[0] });
    }
  } catch (err) {
    return NextResponse.json({ error: 'Erro ao excluir time' + err}, { status: 500 });
  }
}
export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const idTime = url.searchParams.get('id');
    if (!idTime) {
      return NextResponse.json({ error: 'Time não informado' }, { status: 400 });
    }
    const { nome_time } = await request.json();

    const query = await pool.query("UPDATE times SET nome_time = $1 WHERE id=$2", [nome_time, idTime]);

    if(query.rowCount === 0){
      return NextResponse.json({ error: 'Erro ao atualizar time' }, { status: 500 });
    }else{
      return NextResponse.json({ message: 'Time atualizado com sucesso', time: query.rows[0] });
    }
  } catch (err) {
    return NextResponse.json({ error: 'Erro ao editar' + err}, { status: 500 });
  }
}