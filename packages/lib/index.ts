/**
 * Currently to use this lib inside `@lir/api` you need to
 * transpile it manually into distributable javascript since NestJS
 * does not provide a feature similar to NextJS's `transpilePackages`
 * @see https://github.com/nestjs/nest/issues/12251
 */

export * from "./error/response-code";
