export default class ResponseError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    Object.setPrototypeOf(this, ResponseError.prototype);

    this.status = status;
  }
}
