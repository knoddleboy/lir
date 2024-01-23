import type { SingupUserInput, CreateDocumentInput } from "@lir/lib/schema";

import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";

export const prisma = new PrismaClient();

export async function createUserAndDocuments({
  user,
  documents,
}: {
  user: SingupUserInput;
  documents?: CreateDocumentInput[];
}) {
  const docs = documents?.map((document) => ({
    ...document,
    content: document.content || {},
  }));

  const createdUser = await prisma.user.upsert({
    where: { email: user.email },
    create: {
      ...user,
      password: hashSync(user.password, 10),
    },
    update: {
      ...user,
      password: hashSync(user.password, 10),
    },
  });

  const userDocuments = await prisma.document.count({
    where: {
      userId: createdUser.id,
    },
  });

  if (!userDocuments && docs) {
    docs.map(async (doc) => {
      await prisma.document.create({
        data: {
          ...doc,
          user: {
            connect: createdUser,
          },
        },
      });
    });
  }
}
