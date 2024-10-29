export default class FileServiceError extends Error {
  private _code: string;
  constructor(message: string, code?: string, path?: string) {
    super(message);
    this._code = code || 'FILE_ERROR';
  }

  get code() {
    return this._code;
  }
}
