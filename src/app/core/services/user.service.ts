import {Injectable} from "@angular/core";
import {userLocalstorageConst} from "../consts/user-localstorage.const";
import {UserInterface} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor() {}

  public getUser(): string | null {
    return localStorage.getItem(userLocalstorageConst) ?? null
  }

  public setUser(userData: UserInterface){
    localStorage.setItem(userLocalstorageConst, JSON.stringify(userData))
  }

}
