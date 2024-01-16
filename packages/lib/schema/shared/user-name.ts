import { z } from "zod";

const allowedLetters = "a-zA-ZА-Яа-яІіЇїҐґЁёĆćČčĐđŁłŃńŠšŚśŽžŹź";

export const userNameSchema = z
  .string()
  .min(3, { message: "Name must contain at least 3 characters" })
  .max(255, { message: "Name must not exceed 255 characters" })
  .regex(new RegExp(`^[${allowedLetters}\\s]+$`), {
    message: "Name can only contain letters and spaces",
  });
