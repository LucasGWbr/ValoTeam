import { NextResponse } from 'next/server';

const mapas = [
  { id: 1, nome: 'Bind' },
  { id: 2, nome: 'Haven' },
  { id: 3, nome: 'Split' },
  { id: 4, nome: 'Ascent' },
  { id: 5, nome: 'Icebox' },
];

export async function GET() {
  return NextResponse.json({ mapas });
}