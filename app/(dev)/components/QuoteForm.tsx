"use client";

import { useState, FormEvent } from "react";
import { whatsappLink } from "@/lib/whatsapp";

interface QuoteFormProps {
  segment: string;
  necessidadeLabel: string;
  necessidadePlaceholder: string;
}

export default function QuoteForm({ segment, necessidadeLabel, necessidadePlaceholder }: QuoteFormProps) {
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [necessidade, setNecessidade] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const linhas = [
      `Olá! Vim pela página de ${segment} e quero um orçamento.`,
      `Nome: ${nome}`,
      `Cidade: ${cidade}`,
      `${necessidadeLabel}: ${necessidade}`,
    ];

    window.open(whatsappLink(linhas.join("\n")), "_blank");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-4">
      <div>
        <label htmlFor="nome" className="block text-sm font-semibold text-slate-700 mb-1">
          Seu nome
        </label>
        <input
          id="nome"
          type="text"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Como podemos te chamar?"
        />
      </div>

      <div>
        <label htmlFor="cidade" className="block text-sm font-semibold text-slate-700 mb-1">
          Cidade / região
        </label>
        <input
          id="cidade"
          type="text"
          required
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: Lins/SP"
        />
      </div>

      <div>
        <label htmlFor="necessidade" className="block text-sm font-semibold text-slate-700 mb-1">
          {necessidadeLabel}
        </label>
        <textarea
          id="necessidade"
          required
          rows={3}
          value={necessidade}
          onChange={(e) => setNecessidade(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={necessidadePlaceholder}
        />
      </div>

      <button
        type="submit"
        className="w-full py-3.5 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
      >
        Pedir orçamento pelo WhatsApp
      </button>
    </form>
  );
}
