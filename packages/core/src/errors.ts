export class AccountConverterError extends Error {
  readonly code: string;
  readonly details: Readonly<Record<string, unknown>> | undefined;

  constructor(code: string, message: string, details?: Readonly<Record<string, unknown>>) {
    super(message);
    this.name = "AccountConverterError";
    this.code = code;
    this.details = details;
  }
}
