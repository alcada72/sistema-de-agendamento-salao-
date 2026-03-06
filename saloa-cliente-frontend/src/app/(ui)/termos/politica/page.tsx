import { NavLogout } from "@/components/nav/nav-logout";
import { GeneralHeader } from "@/components/ui/general-header";
import SwitchTheme from "@/components/ui/SwitchTheme";

export default function Page() {
  return (
    <div>
      <GeneralHeader>
        <div className="flex justify-between items-center gap-4 mt-5 md:mt-0">
          <div className="flex flex-col w-full flex-1">
            <section>
              <h1 className="text-3xl font-bold">Política de Privacidade</h1>
            </section>
            <div>
              <span className="text-gray-400">
                Esta Política de Privacidade descreve como a JMC coleta,
                utiliza, armazena e protege as informações dos usuários do
                aplicativo de agendamento de serviços.
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
            1. Informações Coletadas
          </h2>
          <p>
            A JMC poderá coletar as seguintes informações ao utilizar o
            aplicativo:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>JMC-CACHIUNGO</li>
            <li>Endereço de e-mail</li>
            <li>Número de telefone</li>
            <li>Informações de agendamento e histórico de serviços</li>
            <li>Dados técnicos como IP, navegador e dispositivo</li>
          </ul>
        </section>

        {/* 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            2. Finalidade do Uso dos Dados
          </h2>
          <p>Os dados coletados são utilizados para:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Realizar e gerenciar agendamentos</li>
            <li>Confirmar serviços e enviar notificações</li>
            <li>Melhorar a experiência do usuário</li>
            <li>Garantir segurança e prevenção contra fraudes</li>
            <li>Cumprir obrigações legais</li>
          </ul>
        </section>

        {/* 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            3. Compartilhamento de Informações
          </h2>
          <p>
            A JMC não vende dados pessoais. As informações poderão ser
            compartilhadas apenas quando:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Necessário para execução do serviço contratado</li>
            <li>Exigido por lei ou autoridade competente</li>
            <li>
              Com fornecedores parceiros que auxiliem na operação do sistema
            </li>
          </ul>
        </section>

        {/* 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            4. Armazenamento e Segurança
          </h2>
          <p>
            A JMC adota medidas técnicas e administrativas para proteger os
            dados contra acessos não autorizados, perda, alteração ou divulgação
            indevida.
          </p>
          <p>
            Os dados são armazenados pelo tempo necessário para cumprimento das
            finalidades descritas nesta política.
          </p>
        </section>

        {/* 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            5. Direitos do Usuário
          </h2>
          <p>O usuário poderá, a qualquer momento:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Solicitar acesso aos seus dados</li>
            <li>Corrigir informações incorretas</li>
            <li>Solicitar exclusão de dados, quando permitido por lei</li>
            <li>Revogar consentimento</li>
          </ul>
        </section>

        {/* 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            6. Cookies e Tecnologias de Rastreamento
          </h2>
          <p>
            O aplicativo pode utilizar cookies e tecnologias semelhantes para
            melhorar a navegação, personalizar conteúdo e analisar o uso da
            plataforma.
          </p>
        </section>

        {/* 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            7. Alterações nesta Política
          </h2>
          <p>
            A JMC poderá atualizar esta Política de Privacidade a qualquer
            momento. Recomendamos a revisão periódica desta página.
          </p>
        </section>

        {/* 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            8. Contato
          </h2>
          <p>
            Em caso de dúvidas sobre esta Política de Privacidade ou sobre o
            tratamento de dados pessoais, entre em contato com a JMC através dos
            canais oficiais disponibilizados no aplicativo.
          </p>
        </section>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-400">
          Última atualização: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
