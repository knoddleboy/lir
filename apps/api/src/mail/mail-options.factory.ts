import { ISendMailOptions } from "@nestjs-modules/mailer";
import { InternalServerErrorException } from "@nestjs/common";

export type MailOptions = Omit<ISendMailOptions, "template"> & {
  templateType: "verify-email";
};

export const mailOptionsFactory = (options: MailOptions): ISendMailOptions => {
  const _options = {
    ...options,
  } as ISendMailOptions;

  switch (options.templateType) {
    case "verify-email": {
      _options.template = "./confirm-email.hbs";
      break;
    }

    default:
      throw new InternalServerErrorException(/** Invalid `templateType` */);
  }

  return _options;
};
