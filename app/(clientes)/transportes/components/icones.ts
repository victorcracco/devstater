import {
  ArrowRightLeft, Award, BadgeCheck, Boxes, Building2, CalendarDays, Clock4, Flame, Headset,
  MapPin, PackageOpen, Route, ShieldCheck, Snowflake, Sofa, TrendingUp, Truck, Users, Warehouse,
  Weight, type LucideIcon,
} from "lucide-react";
import type { Icone } from "../site";

export const ICONES: Record<Icone, LucideIcon> = {
  caminhao: Truck,
  setas: ArrowRightLeft,
  armazem: Warehouse,
  rota: Route,
  floco: Snowflake,
  chama: Flame,
  caixa: PackageOpen,
  peso: Weight,
  pessoas: Users,
  premio: Award,
  grafico: TrendingUp,
  escudo: ShieldCheck,
  pino: MapPin,
  relogio: Clock4,
  atendimento: Headset,
  calendario: CalendarDays,
  predio: Building2,
  caixas: Boxes,
  sofa: Sofa,
  selo: BadgeCheck,
};
