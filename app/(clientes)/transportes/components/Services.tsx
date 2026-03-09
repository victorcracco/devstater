import { Truck, ArrowRightLeft, Warehouse, Route, Snowflake, Flame, PackageOpen, Weight } from "lucide-react";

const services = [
  { icon: Truck, title: 'Transporte Rodoviário', desc: 'Cobertura nacional com frota rastreada e adequada para cada rota, garantindo o melhor SLA do mercado.' },
  { icon: ArrowRightLeft, title: 'Logística Integrada', desc: 'Gestão 360º da sua cadeia de suprimentos, da coleta no fabricante até a entrega B2B ou B2C.' },
  { icon: Warehouse, title: 'Armazenagem Premium', desc: 'Centros de distribuição estratégicos com controle de temperatura, segurança 24h e gestão de estoque WMS.' },
  { icon: Route, title: 'Cargas Fracionadas', desc: 'Otimização de custos para volumes menores, compartilhando rotas sem perder a pontualidade e segurança.' },
];

const cargoTypes = [
  { icon: PackageOpen, name: 'Carga Seca', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Snowflake, name: 'Refrigerada', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Flame, name: 'Perigosa (MOPP)', color: 'text-orange-600', bg: 'bg-orange-50' },
  { icon: Weight, name: 'Carga Pesada', color: 'text-slate-600', bg: 'bg-slate-100' },
];

export default function Services() {
  return (
    <section id="servicos" className="py-24 px-6 md:px-12 lg:px-24 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-2 block">Nossa Expertise</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Soluções Logísticas</h2>
          </div>
          <p className="text-slate-600 max-w-md text-lg">
            Desenhamos operações sob medida para reduzir seus custos e acelerar o tempo de entrega.
          </p>
        </div>
        
        {/* Grid de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className="group bg-white p-10 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Tipos de Carga - Design Premium */}
        <div className="bg-white p-10 md:p-14 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Homologados para transportar:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {cargoTypes.map((type, idx) => {
              const TypeIcon = type.icon;
              return (
                <div key={idx} className={`${type.bg} flex flex-col items-center justify-center p-6 rounded-2xl transition-transform hover:scale-105 cursor-default`}>
                  <TypeIcon className={`w-10 h-10 ${type.color} mb-3`} />
                  <span className="font-semibold text-slate-800 text-center">{type.name}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}