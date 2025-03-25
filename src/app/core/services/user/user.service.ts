import {Injectable} from "@angular/core";
import {userLocalstorageConst} from "../../consts/user-localstorage.const";
import {AuthInterface} from "../../interfaces/auth.interface";
import {userMocks} from "../../../mocks/user.mocks";
import {UserInterface} from "../../interfaces/user.interface";
import {BehaviorSubject} from "rxjs";
import {TokenService} from "../token/token.service";
import {LocalStorageService} from "../localstorage/localstorage.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  protected readonly userMocks: UserInterface[] = userMocks;

  public user$: BehaviorSubject<UserInterface | null> = new BehaviorSubject<UserInterface | null>(null);

  constructor(
    private _localStorageService: LocalStorageService,
  ) {}

  public checkAuthUser(): boolean {
    const user: UserInterface | null = this._localStorageService.getUser ?? null
    if (!user) {
      this.logout()
      return false
    }

    this.user$.next(user);
    return true
  }

  public setUser(userData: AuthInterface){
    localStorage.setItem(userLocalstorageConst, JSON.stringify(userData))
  }

  public getUser(id: number): UserInterface | null {
    const foundUser: UserInterface | undefined = this.userMocks.find((user: UserInterface): boolean => user.id === id);
    if (!foundUser) return null

    return foundUser
  }

  public getIdThisUser(): number | null {
    return this.user$.value?.id ?? null
  }

  public authUser(userData: AuthInterface): boolean {
    if (!userData) return false;

    const foundUser: UserInterface | undefined = this.userMocks.find((user: UserInterface) => {
      return user.email === userData.email && user.password === userData.password;
    });

    if (foundUser) {
      this._localStorageService.setUser(foundUser)
      this.user$.next(foundUser);
      return true;
    }

    return false;
  }

  public logout(): void {
    localStorage.removeItem(userLocalstorageConst)
  }
}
