"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

type Props = { empresa: string; whatsapp?: string; email?: string };

const CAMPOS = [
  { id: "nome", rotulo: "Seu nome", placeholder: "Como podemos te chamar?" },
  { id: "origem", rotulo: "Origem", placeholder: "Cidade de coleta" },
  { id: "destino", rotulo: "Destino", placeholder: "Cidade de entrega" },
  { id: "carga", rotulo: "O que precisa transportar", placeholder: "Tipo e quantidade" },
] as const;

// Monta o pedido e abre o WhatsApp (ou o e-mail) da empresa com a mensagem pronta
export default function FormularioOrcamento({ empresa, whatsapp, email }: Props) {
  const [valores, setValores] = useState({ nome: "", origem: "", destino: "", carga: "" });

  function enviar(evento: FormEvent) {
    evento.preventDefault();
    const mensagem = [
      `Olá, ${empresa}! Gostaria de um orçamento.`,
      `Nome: ${valores.nome}`,
      `Origem: ${valores.origem}`,
      `Destino: ${valores.destino}`,
      `Transporte: ${valores.carga}`,
    ].join("\n");
    const texto = encodeURIComponent(mensagem);
    const url = whatsapp
      ? `https://wa.me/${whatsapp}?text=${texto}`
      : `mailto:${email}?subject=${encodeURIComponent("Pedido de orçamento")}&body=${texto}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={enviar} className="rounded-2xl bg-white p-6 text-slate-900 shadow-2xl md:p-8">
      <h2 className="mb-1 text-2xl font-extrabold tracking-tight">Peça seu orçamento</h2>
      <p className="mb-5 text-sm text-slate-600">Preencha e envie direto para a nossa equipe.</p>
      <div className="space-y-4">
        {CAMPOS.map((campo) => (
          <div key={campo.id}>
            <label htmlFor={campo.id} className="mb-1 block text-sm font-bold">{campo.rotulo}</label>
            <input
              id={campo.id}
              required
              value={valores[campo.id]}
              onChange={(e) => setValores({ ...valores, [campo.id]: e.target.value })}
              placeholder={campo.placeholder}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900 focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-6 py-4 font-extrabold text-slate-950 transition-colors hover:bg-yellow-300"
      >
        <Send className="h-5 w-5" />
        {whatsapp ? "Enviar pelo WhatsApp" : "Enviar por e-mail"}
      </button>
    </form>
  );
}
