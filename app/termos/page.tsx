export default function Termos() {
  return (
    <section className="py-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 prose prose-slate">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Termos de Uso</h1>
        <p className="text-slate-600 mb-4">Última atualização: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Termos</h2>
        <p className="text-slate-600 mb-4">
          Ao acessar ao site DevStarter, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Uso de Licença</h2>
        <p className="text-slate-600 mb-4">
          É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site DevStarter, apenas para visualização transitória pessoal e não comercial.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Isenção de responsabilidade</h2>
        <p className="text-slate-600 mb-4">
          Os materiais no site da DevStarter são fornecidos 'como estão'. DevStarter não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização.
        </p>
      </div>
    </section>
  );
}