import {Injectable} from "@angular/core";
import {userLocalstorageConst} from "../consts/user-localstorage.const";
import {AuthInterface} from "../interfaces/auth.interface";
import {userMocks} from "../../mocks/user.mocks";
import {UserInterface} from "../interfaces/user.interface";
import {BehaviorSubject} from "rxjs";
import {TokenService} from "./token.service";
import {LocalStorageService} from "./localstorage.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  protected readonly userMocks: UserInterface[] = userMocks;

  public user$: BehaviorSubject<UserInterface | null> = new BehaviorSubject<UserInterface | null>(null);

  constructor(
    private _router: Router,
    private _tokenService: TokenService,
    private _localStorageService: LocalStorageService,
  ) {}

  public initUser() {
    const activeToken: boolean = this._tokenService.checkToken(this._tokenService.getToken())

    console.log(123123123123, activeToken)

    if (!activeToken) this.logout()

    const user: UserInterface | null = this._localStorageService.getUser ?? null
    if (!user) {
      this.logout()
      return
    }

    this.user$.next(user);
  }

  public setUser(userData: AuthInterface){
    localStorage.setItem(userLocalstorageConst, JSON.stringify(userData))
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
    // this._tokenService.deleteToken()
    this._router.navigate(['/'])
  }
}
