import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt-ts";

const prisma = new PrismaClient();

async function main() {
  const pass = await hash("123456", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@salon.com" },
    update: {},
    create: {
      nome: "Admin",
      email: "admin@salon.com",
      password: pass  as string,
      role: "ADMIN"
    }
  });

  const prof = await prisma.user.upsert({
    where: { email: "ana@salon.com" },
    update: {},
    create: {
      nome: "Ana Profissional",
      email: "ana@salon.com",
      password: pass  as string,
      role: "PROFESSIONAL"
    }
  });

  await prisma.service.createMany({
    data: [
      { nome: "Corte Feminino", duration: 45, price: 150.0, professionalId: prof.id },
      { nome: "Corte Masculino", duration: 60, price: 1000.00, professionalId: prof.id },
      { nome: "Manicure", duration: 30, price: 700.0, professionalId: prof.id }
    ]
  }); 

  console.log("Seed finalizado");
}
main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
