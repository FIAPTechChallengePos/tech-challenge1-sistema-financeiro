import Link from "next/link";
import { Layout } from "../components/Layout";
import routes from "../lib/routes";
import { Text } from "../components/Text";
import { Button } from "../components/Button";
import { useRouter } from "next/router";
import { IconDispositivos } from "../components/icons/IconDispositivos";
import { IconPresente } from "../components/icons/IconPresente";
import { IconPontos } from "../components/icons/IconPontos";
import { IconSaque } from "../components/icons/IconSaque";

Layout

const vantagens = [
  {
    titulo: "Conta e cartão gratuitos",
    descricao: "Conta digital, sem custo fixo e sem tarifa de manutenção.",
    icon: IconPresente,
  },
  {
    titulo: "Saques sem custo",
    descricao: "Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.",
    icon: IconSaque,
  },
  {
    titulo: "Cartão internacional",
    descricao: "Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!",
    icon: IconPontos,
  },
  {
    titulo: "Proteção digital",
    descricao: "Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica.",
    icon: IconDispositivos,
  },
];


export default function Home() {
  const router = useRouter();
  return (
    <section id="sobre" className="bg-primary-gradient dark:bg-primary-gradient-dark">
      <div className="container flex flex-col gap-10 py-12">
        {/* Primeira dobra */}
        <div className="flex flex-col md:flex-col xl:flex-row justify-center items-center gap-10 xl:gap-12">
          <div className="w-full max-w-full md:max-w-[700px] flex justify-center text-center">
            <Text variant="title-bold" as="h1" color="text-neutral dark:text-sky-200">
              Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!
            </Text>
          </div>
          <img src="/banner.svg"/>
        </div>

        {/* Segunda dobra */}
        <div id="servico" className="flex flex-col gap-2 text-left">
          <Text variant="title-bold" as="h1" color="text-neutral text-center dark:text-sky-200">
            Vantagens do nosso banco:
          </Text>
          <div className="text-green-600 flex flex-wrap lg:flex-row justify-center lg:justify-between gap-12 xl:py-[72px]">
            {vantagens.map((vantagem, idx) => {
              const Icon = vantagem.icon;
              return (
                <div key={idx} className="flex flex-col lg:col-span-2 items-center text-center gap-8 w-[200px]">
                  <Icon className="text-green-600 dark:text-sky-200 w-24 h-24" />
                  <Text variant="subtitle" as="h2" color="text-green-600 dark:text-sky-200">
                    {vantagem.titulo}
                  </Text>
                  <Text variant="text-regular" as="p" color="text-neutral-600 dark:text-sky-200">
                    {vantagem.descricao}
                  </Text>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    <div className="space-y-2 grid h-56 grid-cols content-center justify-center gap-4...">
        <Button label="➕ Nova Transação" onClick={() => router.push("/panel")}/>
        <Button label="📄 Ver Transações " onClick={() => router.push("/transactions")} />
    </div>
    </section>


  );
}