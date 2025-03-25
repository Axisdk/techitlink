import {Injectable} from "@angular/core";
import {userTokenLocalstorageConst} from "../../consts/user-token-localstorage.const";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {}

  private _generateToken(): number {
    return new Date().getTime()
  }

  public getToken(): number | null {
    const userToken: string | null = localStorage.getItem(userTokenLocalstorageConst);
    return userToken ? +userToken : null;
  }

  public setToken(): void {
    const token: number = this._generateToken()
    localStorage.setItem(userTokenLocalstorageConst, JSON.stringify(token));
  }

  public checkToken(): boolean {
    const token: number | null = this.getToken()
    if (!token) return false

    const dateNow: Date = new Date();
    const tokenLifetimeMs: number = 24 * 60 * 60 * 1000;

    if (dateNow.getTime() - token > tokenLifetimeMs) {
      this.deleteToken()
      return false
    }

    return true
  }

  public deleteToken() {
    localStorage.removeItem(userTokenLocalstorageConst)
  }
}
