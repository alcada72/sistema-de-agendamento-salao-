import nodemailer from "nodemailer";
import { FindUserEmail } from "./user.service";


export const VerifyEmailSend = async (email: string) => {
  const user = await FindUserEmail(email);
  if (!user) {
    throw new Error("Acesso negado");
  }

  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const verificationLink = `${user.emaiverificationid}`;

  const mailOptions = {
    from: `"JMC - prestacões de serviços" `,
    to: email,
    subject: "Confirmação de e-mail",
    text: `Olá ${user.nome || "Cliente"}!

Seja bem-vinda(o) a JMC ✨

Para concluir seu cadastro e começar a agendar seus serviços, utilize o código abaixo:

Código de verificação:
${verificationLink}

⏳ Este código é válido por 10 minutos.

Se você não solicitou este cadastro, pode ignorar este e-mail com tranquilidade.

Com carinho,  
Equipe JMC
     © ${new Date().getFullYear()} JMC - TODOS OS DIREITOS RESERVADOS`,

    html: `
<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; background: #ffffff; border-radius: 10px; border: 1px solid #f1f1f1;">
  
  <h2 style="color: #d6c633; text-align: center;">✨ Confirme seu e-mail ✨</h2>

  <p>Olá <strong>${user.nome || "Cliente"}</strong>,</p>

  <p>
    Estamos muito felizes em ter você na <strong>JMC</strong>!
  </p>

  <p>
    Para finalizar seu cadastro e começar a agendar seus serviços,
    utilize o código abaixo:
  </p>

  <div style="margin: 30px 0; text-align: center;">
    <span style="display: inline-block; background: #d69533; color: #ffffff; padding: 14px 28px; font-size: 20px; letter-spacing: 3px; border-radius: 8px; font-weight: bold;">
      ${verificationLink}
    </span>
  </div>    

  <p style="color: #999; font-size: 13px;">
    ⏳ Este código expira em 10 minutos.
  </p>

  <hr style="margin: 30px 0;" />

  <p style="font-size: 13px; color: #666;">
    Se você não solicitou este cadastro, pode ignorar este e-mail com segurança.
  </p>

  <!-- POLÍTICA DE PRIVACIDADE -->
  <p style="font-size: 12px; color: #888; margin-top: 20px; line-height: 1.5;">
    🔐 <strong>Política de Privacidade:</strong> A JMC – Prestação de Serviços utiliza 
    seus dados apenas para confirmar e gerir seu cadastro e agendamentos. 
    As informações não são vendidas nem partilhadas com terceiros e são protegidas 
    com medidas de segurança adequadas. Você pode solicitar acesso ou exclusão 
    dos seus dados a qualquer momento através do nosso contacto oficial.
  </p>

  <p style="font-size: 12px; color: #aaa; text-align: center; margin-top: 20px;">
    © ${new Date().getFullYear()} JMC - TODOS OS DIREITOS RESERVADOS
  </p>

</div>
`,
  };

  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(
          new Error("Erro ao enviar e-mail de verificação: " + error.message)
        );
      } else {
        resolve({
          success: "E-mail de verificação enviado com sucesso!",
          info,
        });
      }
    });
  });
};

