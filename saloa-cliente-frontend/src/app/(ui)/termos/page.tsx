import { NavLogout } from "@/components/nav/nav-logout";
import { GeneralHeader } from "@/components/ui/general-header";
import SwitchTheme from "@/components/ui/SwitchTheme";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <GeneralHeader>
        <div className="flex justify-between items-center gap-4 mt-5 md:mt-0">
          <div className="flex flex-col w-full flex-1">
            <section>
              <h1 className="text-3xl font-bold">Termos e Condições</h1>
            </section>
            <div>
              <span
                title="Ao utilizar
                nosso aplicativo de agendamento de serviços, você concorda
                integralmente com as regras abaixo descritas."
                className="text-gray-400 "
              >
                Leia atentamente os termos e condições da JMC.
              </span>
            </div>
          </div>
          <SwitchTheme hideLabel />
          <NavLogout hiddenLabel />
        </div>
      </GeneralHeader>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8 text-gray-600 dark:text-gray-300">
        {/* 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            1. Sobre a JMC
          </h2>
          <p>
            A JMC é uma empresa especializada em agendamento e gestão de
            serviços. Nosso aplicativo permite que clientes realizem reservas,
            acompanhem horários disponíveis e gerenciem seus agendamentos de
            forma prática e segura.
          </p>
        </section>

        {/* 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            2. Cadastro e Conta do Usuário
          </h2>
          <p>
            Para utilizar os serviços, o usuário deverá criar uma conta
            fornecendo informações verdadeiras, completas e atualizadas.
          </p>
          <p>
            O usuário é responsável por manter a confidencialidade de sua senha
            e por todas as atividades realizadas em sua conta.
          </p>
        </section>

        {/* 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            3. Agendamentos
          </h2>
          <p>
            Os agendamentos estão sujeitos à disponibilidade de horários. A
            confirmação será exibida no aplicativo após a finalização da
            reserva.
          </p>
          <p>
            A JMC reserva-se o direito de cancelar ou reagendar serviços em
            casos de força maior, notificando o usuário com antecedência sempre
            que possível.
          </p>
        </section>

        {/* 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            4. Cancelamentos e Reembolsos
          </h2>
          <p>
            O usuário poderá cancelar um agendamento dentro do prazo
            estabelecido no aplicativo. Cancelamentos fora do prazo podem estar
            sujeitos a taxas.
          </p>
          <p>
            Eventuais reembolsos serão processados conforme a política interna
            da JMC.
          </p>
        </section>

        {/* 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            5. Pagamentos
          </h2>
          <p>
            Caso o serviço exija pagamento antecipado, o usuário deverá efetuar
            o pagamento por meio das formas disponibilizadas na plataforma.
          </p>
          <p>
            A JMC não se responsabiliza por falhas decorrentes de sistemas de
            pagamento de terceiros.
          </p>
        </section>

        {/* 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            6. Responsabilidades do Usuário
          </h2>
          <p>
            O usuário compromete-se a utilizar o aplicativo de forma ética e
            legal, não praticando atividades que possam prejudicar a JMC ou
            outros usuários.
          </p>
        </section>

        {/* 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            7. Privacidade e Proteção de Dados
          </h2>
          <p>
            A JMC respeita a privacidade dos usuários e trata os dados pessoais
            de acordo com a legislação aplicável de proteção de dados.
          </p>
          <p>
            Ao utilizar o aplicativo, o usuário concorda com a coleta e uso de
            informações necessárias para a prestação do serviço.
          </p>
        </section>

        {/* 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            8. Alterações nos Termos
          </h2>
          <p>
            A JMC poderá atualizar estes Termos e Condições a qualquer momento.
            Recomendamos que o usuário revise periodicamente esta página.
          </p>
        </section>

        {/* 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            9. Aceitação dos Termos
          </h2>
          <p>
            Ao utilizar o aplicativo da JMC, o usuário declara ter lido,
            compreendido e aceitado todos os termos aqui descritos.
          </p>
        </section>
        <div>
          <p>
            Lia também as{" "}
            <Link
              href="/termos/politica"
              className="text-blue-500 hover:underline"
            >
              Políticas de Privacidade
            </Link>
          </p>
        </div>
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-400">
          Última atualização: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
