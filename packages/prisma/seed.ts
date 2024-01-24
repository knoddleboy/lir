import { word, ip, cityName } from "minifaker";
import "minifaker/locales/en";

import { prisma, createUserAndDocuments } from "./seed-utils";

async function main() {
  await createUserAndDocuments({
    user: {
      name: "no documents",
      email: "no-documents@example.com",
      password: "Pass123!",
    },
  });

  await createUserAndDocuments({
    user: {
      name: "ten documents",
      email: "ten-documents@example.com",
      password: "Pass123!",
    },
    documents: Array.from({ length: 10 }).map((_) => ({
      title: `${word()} ${Math.random() > 0.5 ? ip() : cityName().toLowerCase()}`,
      content: {},
    })),
  });

  await createUserAndDocuments({
    user: {
      name: "fifty documents",
      email: "fifty-documents@example.com",
      password: "Pass123!",
    },
    documents: Array.from({ length: 50 }).map((_) => ({
      title: `${word()} ${Math.random() > 0.5 ? ip() : cityName().toLowerCase()}`,
      content: {},
    })),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
