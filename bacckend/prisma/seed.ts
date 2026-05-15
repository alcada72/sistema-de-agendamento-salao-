import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt-ts";

const prisma = new PrismaClient();

async function main() {
  const pass = await hash("123456", 10);
  await prisma.user.upsert({
    where: { email: "admin@jmc.com" },
    update: {},
    create: {
      nome: "Admin",
      email: "admin@salon.com",
      password: pass,
      role: "ADMIN"
    }
  });

  await prisma.user.upsert({
    where: { email: "ana@salon.com" },
    update: {},
    create: {
      nome: "Ana Profissional",
      email: "ana@salon.com",
      password: pass,
      role: "PROFESSIONAL"
    }
  });

  console.log("Seed finalizado");
}
main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
