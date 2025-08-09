import Link from "next/link";
import { Layout } from "../components/Layout";
import routes from "../lib/routes";
import { Text } from "../components/Text";
import { IconStar } from "../components/icons/IconStar";
import { IconNotebook } from "../components/icons/IconNotebook";
import { IconGift } from "../components/icons/IconGift";
import { IconOn } from "../components/icons/IconOn";

Layout

const vantagens = [
  {
    titulo: "Conta e cartão gratuitos",
    descricao: "Conta digital, sem custo fixo e sem tarifa de manutenção.",
    icon: IconGift,
  },
  {
    titulo: "Saques sem custo",
    descricao: "Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.",
    icon: IconOn,
  },
  {
    titulo: "Cartão internacional",
    descricao: "Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!",
    icon: IconStar,
  },
  {
    titulo: "Proteção digital",
    descricao: "Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica.",
    icon: IconNotebook,
  },
];


export default function Home() {
  return (
    <section id="sobre" className="bg-primary-gradient dark:bg-primary-gradient-dark">
      <div className="container flex flex-col gap-12 py-12">
        {/* Primeira dobra */}
        <div className="flex flex-col-reverse md:flex-col xl:flex-row justify-center items-center gap-12 xl:gap-16">
          <div className="w-full max-w-full md:max-w-[470px] flex justify-center text-center">
            <Text variant="title-bold" as="h1" color="text-white dark:text-gray-200">
              Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!
            </Text>
          </div>
          <img src="/grafic.svg" alt="" />
        </div>

        {/* Segunda dobra */}
        <div id="servico" className="flex flex-col gap-9 text-center">
          <Text variant="title-bold" as="h1" color="text-white dark:text-gray-200">
            Vantagens do nosso banco:
          </Text>
          <div className="flex flex-wrap lg:flex-row justify-center lg:justify-between gap-12 xl:py-[75px]">
            {vantagens.map((vantagem, idx) => {
              const Icon = vantagem.icon;
              return (
                <div key={idx} className="flex flex-col lg:col-span-2 items-center text-center gap-9 w-[260px]">
                  <Icon className="text-white dark:text-gray-200 w-24 h-24" />
                  <Text variant="subtitle" as="h2" color="text-white dark:text-gray-200">
                    {vantagem.titulo}
                  </Text>
                  <Text variant="text-regular" as="p" color="text-white dark:text-gray-200">
                    {vantagem.descricao}
                  </Text>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    <div className="p-8">
      <ul className="space-y-2 text-center title-bold text-white">
        <li><Link href={routes.transacoes}>📄 Ver Transações</Link></li>
        <li><Link href={routes.cadastro}>➕ Nova Transação</Link></li>
      </ul>
    </div>
    </section>


  );
}