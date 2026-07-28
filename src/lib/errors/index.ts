export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status = 400,
  ) {
    super(message)
  }
}

export function errorEnvelope(error: unknown) {
  if (error instanceof AppError) {
    return { ok: false as const, error: { code: error.code, message: error.message } }
  }
  return {
    ok: false as const,
    error: { code: 'INTERNAL_ERROR', message: 'The request could not be completed.' },
  }
}
