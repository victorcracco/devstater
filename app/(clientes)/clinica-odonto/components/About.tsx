import { CheckCircle } from "lucide-react";

const diferenciais = [
  "Equipamentos digitais de última geração",
  "Anestesia computadorizada sem dor",
  "Esterilização com autoclave classe B",
  "Atendimento humanizado e acolhedor",
  "Parcelamento em até 12x sem juros",
  "Horários flexíveis, incluindo sábados",
];

export default function About() {
  return (
    <section id="sobre" className="py-24 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Imagem */}
        <div className="relative">
          <div className="absolute -inset-4 bg-sky-100 rounded-3xl -rotate-2"></div>
          <img
            src="https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=1469&auto=format&fit=crop"
            alt="Clínica Sorriso Pleno"
            className="relative rounded-2xl w-full object-cover h-[500px]"
          />
          <div className="absolute -bottom-6 -right-6 bg-sky-500 text-white rounded-2xl p-6 shadow-xl">
            <p className="text-3xl font-extrabold">12+</p>
            <p className="text-sm text-sky-100">Anos de excelência</p>
          </div>
        </div>

        {/* Texto */}
        <div>
          <span className="text-sky-600 font-bold tracking-wider uppercase text-sm mb-2 block">Sobre a Clínica</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
            Mais de uma década<br />transformando sorrisos
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            A Sorriso Pleno nasceu da missão de oferecer odontologia de alta qualidade em um ambiente onde o paciente se sente seguro e acolhido. Nossa equipe é formada por especialistas com formação nas melhores universidades do país.
          </p>
          <p className="text-slate-600 leading-relaxed mb-8">
            Investimos constantemente em tecnologia de ponta — da tomografia 3D ao scanner intraoral — para diagnósticos mais precisos e tratamentos mais rápidos e confortáveis.
          </p>

          <ul className="space-y-3">
            {diferenciais.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700">
                <CheckCircle className="w-5 h-5 text-sky-500 flex-shrink-0" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
