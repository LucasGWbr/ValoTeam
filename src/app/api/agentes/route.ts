import { NextResponse } from 'next/server';

const agentes = [
  { id: 1, nome: 'Sova', imagem: '/agents/sova.png' },
  { id: 2, nome: 'Jett', imagem: '/agents/jett.png' },
  { id: 3, nome: 'Phoenix', imagem: '/agents/phoenix.png' },
  { id: 4, nome: 'Sage', imagem: '/agents/sage.png' },
  { id: 5, nome: 'Reyna', imagem: '/agents/reyna.png' },
  { id: 6, nome: 'Killjoy', imagem: '/agents/killjoy.png' },
  { id: 7, nome: 'Viper', imagem: '/agents/viper.png' },
  { id: 8, nome: 'Breach', imagem: '/agents/breach.png' },
  { id: 9, nome: 'Omen', imagem: '/agents/omen.png' },
  { id: 10, nome: 'Raze', imagem: '/agents/raze.png' },
];

export async function GET() {
  return NextResponse.json({ agentes });
}