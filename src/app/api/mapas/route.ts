import { NextResponse } from "next/server";

const mapas = [
  { id: 1, nome: "Abyss", imagem: "/maps/Abyss.png" },
  { id: 2, nome: "Ascent", imagem: "/maps/Ascent.png" },
  { id: 3, nome: "Bind", imagem: "/maps/Bind.png" },
  { id: 4, nome: "Haven", imagem: "/maps/Haven.png" },
  { id: 5, nome: "Split", imagem: "/maps/Split.png" },
  { id: 6, nome: "Icebox", imagem: "/maps/Icebox.png" },
  { id: 7, nome: "Breeze", imagem: "/maps/Breeze.png" },
  { id: 8, nome: "Fracture", imagem: "/maps/Fracture.png" },
  { id: 9, nome: "Pearl", imagem: "/maps/Pearl.png" },
  { id: 10, nome: "Lotus", imagem: "/maps/Lotus.png" },
  { id: 11, nome: "Sunset", imagem: "/maps/Sunset.png" }
];

export async function GET() {
  return NextResponse.json({ mapas });
}