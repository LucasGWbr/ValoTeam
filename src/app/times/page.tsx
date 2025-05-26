"use client";
import { useEffect, useState } from "react";

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

  function agentesDropdown() {
    return (
      <select
        value=""
        onChange={(e) => {
          const val = e.target.value;
          if (val && !agenteSelecionados.includes(val) && agenteSelecionados.length < 5) {
            setAgenteSelecionados([...agenteSelecionados, val]);
          }
        }}
        className="p-2 border mb-3"
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
    );
  }

  function sortearAleatorio() {
    if (agentes.length === 0) return;
    let agentesSorteados: string[] = [];
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
      const data = await res.json();
      const res2 = await fetch(`/api/times?id_usuario=${idUsuario}`);
      const dados = await res2.json();
      setTimes(dados.times || []);
    } else {
      alert("Erro ao salvar time");
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Criar Time de Valorant</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Nome do Time:</label>
        <input
          type="text"
          value={nomeTime}
          onChange={(e) => setNomeTime(e.target.value)}
          className="border p-2 w-full"
          placeholder="Nome do time"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Selecione até 5 agentes:</label>
        {agentesDropdown()}
        <div className="flex gap-2 flex-wrap mb-2">
          {agenteSelecionados.map((nome) => {
            const agente = agentes.find((a) => a.nome === nome);
            return (
              <div
                key={nome}
                className="border p-2 flex items-center gap-2 rounded cursor-pointer"
                onClick={() => toggleAgente(nome)}
                title="Clique para remover"
              >
                {agente && (
                  <img
                    src={agente.imagem}
                    alt={agente.nome}
                    width={30}
                    height={30}
                    className="rounded"
                  />
                )}
                <span>{nome}</span>
              </div>
            );
          })}
        </div>
        <button
          onClick={sortearAleatorio}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Aleatório
        </button>
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-1">Selecione o mapa:</label>
        <select
          value={mapaSelecionado}
          onChange={(e) => setMapaSelecionado(e.target.value)}
          className="p-2 border w-full"
        >
          <option value="">Selecione um mapa</option>
          {Array.isArray(mapas) &&
            mapas.map((m) => (
              <option key={m.id} value={m.nome}>
                {m.nome}
              </option>
            ))}
        </select>
      </div>

      <button
        onClick={salvarTime}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Salvar Time
      </button>

      <hr className="my-8" />

      <h2 className="text-2xl font-semibold mb-4">Meus Times</h2>
      {times.length === 0 && <p>Nenhum time salvo ainda.</p>}
      <ul>
        {times.map((time) => (
          <li key={time.id} className="mb-4 border p-4 rounded shadow">
            <h3 className="font-bold text-xl mb-2">{time.nome_time}</h3>
            <p>
              <strong>Mapa:</strong> {time.mapa}
            </p>
            <p>
              <strong>Agentes:</strong> {time.agentes.join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}