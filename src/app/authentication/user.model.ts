export class User {
  constructor(
    public email: string,
    public id: string,
    // tslint:disable-next-line: variable-name
    private _token: string,
    // tslint:disable-next-line: variable-name
    private _tokenExpiryDate: Date
  ) {}

  get token() {
    if (!this._tokenExpiryDate || new Date() > this._tokenExpiryDate) {
      return null;
    }
    return this._token;
  }

  get tokenExpiry() {
    return this._tokenExpiryDate;
  }
}
