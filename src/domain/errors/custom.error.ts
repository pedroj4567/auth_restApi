export class CustumError extends Error {
  constructor(
    public readonly codeStatus: number,
    public readonly message: string
  ) {
    super(message);
  }

  static badRequest(message: string) {
    return new CustumError(400, message);
  }

  static unauthorized(message: string) {
    return new CustumError(401, message);
  }

  static forbidden(message: string) {
    return new CustumError(403, message);
  }

  static notfound(message: string) {
    return new CustumError(404, message);
  }

  static internalServer(message: string = "Internal Server Error") {
    console.log(message);
    return new CustumError(500, message);
  }
}
