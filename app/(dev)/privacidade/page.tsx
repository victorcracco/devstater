export default function Privacidade() {
  return (
    <section className="py-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 prose prose-slate">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Política de Privacidade</h1>
        <p className="text-slate-600 mb-4">Última atualização: {new Date().toLocaleDateString()}</p>
        
        <p className="text-slate-600 mb-6">
          A sua privacidade é importante para nós. É política da DevStarter respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site DevStarter.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Coleta de Dados</h2>
        <p className="text-slate-600 mb-4">
          Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço (por exemplo, ao entrar em contato). Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Uso de Dados</h2>
        <p className="text-slate-600 mb-4">
          Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Protegemos os dados armazenados dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Compartilhamento</h2>
        <p className="text-slate-600 mb-4">
          Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
        </p>
      </div>
    </section>
  );
}