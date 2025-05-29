"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";

interface Agente {
  id: number;
  nome: string;
  imagem: string;
}

interface Time {
  id: number;
  id_usuario: number;
  nome_time: string;
  agentes: string[];
  mapa: string;
}

interface Mapa {
  id: number;
  nome: string;
}

export default function Times() {
  const [idUsuario, setIdUsuario] = useState<string | null>(null);
  const [agentes, setAgentes] = useState<Agente[]>([]);
  const [mapas, setMapas] = useState<Mapa[]>([]);
  const [nomeTime, setNomeTime] = useState("");
  const [agenteSelecionados, setAgenteSelecionados] = useState<string[]>([]);
  const [mapaSelecionado, setMapaSelecionado] = useState("");
  const [times, setTimes] = useState<Time[]>([]);

  useEffect(() => {
    const id = localStorage.getItem("id_usuario");
    if (id) setIdUsuario(id);
  }, []);

  useEffect(() => {
    async function carregarAgentes() {
      const res = await fetch("/api/agentes");
      const data = await res.json();
      setAgentes(data.agentes || []);
    }
    async function carregarMapas() {
      const res = await fetch("/api/mapas");
      const data = await res.json();
      setMapas(data.mapas || []);
    }
    carregarAgentes();
    carregarMapas();
  }, []);

  useEffect(() => {
    if (!idUsuario) return;
    async function carregarTimes() {
      const res = await fetch(`/api/times?id_usuario=${idUsuario}`);
      const data = await res.json();
      setTimes(data.times || []);
    }
    carregarTimes();
  }, [idUsuario]);

  function toggleAgente(nome: string) {
    if (agenteSelecionados.includes(nome)) {
      setAgenteSelecionados(agenteSelecionados.filter((a) => a !== nome));
    } else {
      if (agenteSelecionados.length < 5) {
        setAgenteSelecionados([...agenteSelecionados, nome]);
      }
    }
  }

  function sortearAleatorio() {
    if (agentes.length === 0) return;
    const agentesSorteados: string[] = [];
    while (agentesSorteados.length < 5) {
      const aleatorio = agentes[Math.floor(Math.random() * agentes.length)].nome;
      if (!agentesSorteados.includes(aleatorio)) agentesSorteados.push(aleatorio);
    }
    setAgenteSelecionados(agentesSorteados);
  }

  async function salvarTime() {
    if (!idUsuario) {
      alert("Usuário não logado.");
      return;
    }
    if (!nomeTime || agenteSelecionados.length === 0 || !mapaSelecionado) {
      alert("Preencha todos os campos.");
      return;
    }
    const res = await fetch("/api/times", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_usuario: Number(idUsuario),
        nome_time: nomeTime,
        agentes: agenteSelecionados,
        mapa: mapaSelecionado,
      }),
    });
    if (res.ok) {
      alert("Time salvo com sucesso!");
      setNomeTime("");
      setAgenteSelecionados([]);
      setMapaSelecionado("");
      const res2 = await fetch(`/api/times?id_usuario=${idUsuario}`);
      const dados = await res2.json();
      setTimes(dados.times || []);
    } else {
      alert("Erro ao salvar time");
    }
  }

  async function removerTime(id: number) {
    const confirmar = confirm("Deseja remover este time?");
    if (!confirmar) return;
    const res = await fetch(`/api/times/${id}`, { method: "DELETE" });
    if (res.ok) {
      setTimes(times.filter((t) => t.id !== id));
    } else {
      alert("Erro ao remover time");
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-red-500">Criar Time de Valorant</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Nome do Time:</label>
        <input
          type="text"
          value={nomeTime}
          onChange={(e) => setNomeTime(e.target.value)}
          className="border border-red-500 bg-black text-white p-2 w-full rounded"
          placeholder="Nome do time"
        />
      </div>

      <div className="mb-4 text-right">
        <label className="block font-semibold mb-1 text-left">Selecione até 5 agentes:</label>
        <div className="flex justify-end items-center gap-2 mb-3">
          <select
            value=""
            onChange={(e) => {
              const val = e.target.value;
              if (val && !agenteSelecionados.includes(val) && agenteSelecionados.length < 5) {
                setAgenteSelecionados([...agenteSelecionados, val]);
              }
            }}
            className="p-2 border border-red-500 bg-black text-white rounded"
          >
            <option value="">Selecione um agente</option>
            {agentes
              .filter((a) => !agenteSelecionados.includes(a.nome))
              .map((agente) => (
                <option key={agente.id} value={agente.nome}>
                  {agente.nome}
                </option>
              ))}
          </select>
          <button
            onClick={sortearAleatorio}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Aleatório
          </button>
        </div>
        <div className="flex justify-end gap-2 flex-wrap mb-4">
          {agenteSelecionados.map((nome) => {
            const agente = agentes.find((a) => a.nome === nome);
            return (
              <div
                key={nome}
                className="border border-red-500 p-2 flex items-center gap-2 rounded cursor-pointer bg-black"
                onClick={() => toggleAgente(nome)}
                title="Clique para remover"
              >
                {agente && (
                  <Image
                    src={agente.imagem}
                    alt={agente.nome}
                    width={30}
                    height={30}
                    className="rounded"
                    unoptimized
                  />
                )}
                <span>{nome}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Selecione o mapa:</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {mapas.map((mapa) => (
            <div
              key={mapa.id}
              onClick={() => setMapaSelecionado(mapa.nome)}
              className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                mapaSelecionado === mapa.nome ? "border-red-500" : "border-gray-700"
              }`}
            >
              <Image
                src={`/maps/${mapa.nome}.png`}
                alt={mapa.nome}
                width={300}
                height={150}
                unoptimized
                className="object-cover w-full h-32"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-1 text-sm font-medium">
                {mapa.nome}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={salvarTime}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Salvar Time
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-red-500">Meus Times</h2>
      {times.length === 0 && <p className="text-gray-400">Nenhum time salvo ainda.</p>}
      <ul>
        {times.map((time) => (
          <li key={time.id} className="flex bg-zinc-900 text-white border border-red-500 rounded-lg overflow-hidden shadow mb-6">
            <div className="relative">
              <Image
                src={`/maps/${time.mapa}.png`}
                alt={time.mapa}
                width={180}
                height={120}
                unoptimized
                className="object-cover h-full w-[180px]"
              />
              <button
                onClick={() => removerTime(time.id)}
                className="absolute top-2 right-2 text-white hover:text-red-400"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <div className="p-4 flex flex-col justify-center gap-2">
              <h3 className="text-xl font-bold text-red-400">{time.nome_time}</h3>
              <p><strong>Mapa:</strong> {time.mapa}</p>
              <p><strong>Agentes:</strong> {time.agentes.join(", ")}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}