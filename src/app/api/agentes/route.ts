import { NextResponse } from 'next/server';

const agentes = [
  { id: 1, nome: 'Sova', imagem: '/agents/Sova.png' },
  { id: 2, nome: 'Jett', imagem: '/agents/Jett.png' },
  { id: 3, nome: 'Phoenix', imagem: '/agents/Phoenix.png' },
  { id: 4, nome: 'Sage', imagem: '/agents/Sage.png' },
  { id: 5, nome: 'Reyna', imagem: '/agents/Reyna.png' },
  { id: 6, nome: 'Killjoy', imagem: '/agents/Killjoy.png' },
  { id: 7, nome: 'Viper', imagem: '/agents/Viper.png' },
  { id: 8, nome: 'Breach', imagem: '/agents/Breach.png' },
  { id: 9, nome: 'Omen', imagem: '/agents/Omen.png' },
  { id: 10, nome: 'Astra', imagem: '/agents/Astra.png' },
  { id: 11, nome: 'Brimstone', imagem: '/agents/Brimstone.png' },
  { id: 12, nome: 'Chamber', imagem: '/agents/Chamber.png' },
  { id: 13, nome: 'Clove', imagem: '/agents/Clove.png' },
  { id: 14, nome: 'Cypher', imagem: '/agents/Cypher.png' },
  { id: 15, nome: 'Deadlock', imagem: '/agents/Deadlock.png' },
  { id: 16, nome: 'Fade', imagem: '/agents/Fade.png' },
  { id: 17, nome: 'Gekko', imagem: '/agents/Gekko.png' },
  { id: 18, nome: 'Harbor', imagem: '/agents/Harbor.png' },
  { id: 19, nome: 'Iso', imagem: '/agents/Iso.png' },
  { id: 20, nome: 'KAYO', imagem: '/agents/KAYO.png' },
  { id: 21, nome: 'Neon', imagem: '/agents/Neon.png' },
  { id: 22, nome: 'Skye', imagem: '/agents/Skye.png' },
  { id: 23, nome: 'Tejo', imagem: '/agents/Tejo.png' },
  { id: 24, nome: 'Vyse', imagem: '/agents/Vyse.png' },
  { id: 25, nome: 'Waylay', imagem: '/agents/Waylay.png' },
  { id: 26, nome: 'Yoru', imagem: '/agents/Yoru.png' },
  { id: 27, nome: 'CORINGA', imagem: '/agents/Tactibear.png' },
];

export async function GET() {
  return NextResponse.json({ agentes });
}