import {Injectable} from "@angular/core";
import {userTokenLocalstorageConst} from "../consts/user-token-localstorage.const";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {}

  private _generateToken() {
    return Math.floor(Math.random() * 10000000).toString()
  }

  public clearStorage() {
    localStorage.clear()
  }

  public getToken(): string | null {
    return localStorage.getItem(userTokenLocalstorageConst) ?? null
  }

  public setToken() {
    const token: string = this._generateToken()
    localStorage.setItem(userTokenLocalstorageConst, token);
  }
}
