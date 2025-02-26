import {Injectable} from "@angular/core";
import {userTokenLocalstorageConst} from "../../core/consts/user-token-localstorage.const";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  private _generateToken() {
    return Math.floor(Math.random() * 10000000).toString()
  }

  public setToken() {
    const token: string = this._generateToken()
    localStorage.setItem(userTokenLocalstorageConst, token);
  }
}
