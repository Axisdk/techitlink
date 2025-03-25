import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate, CanActivateChild,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import {UserService} from "../services/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private _router: Router,
    private _userService: UserService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this._userService.checkAuthUser()) {
      return true
    }

    this._router.navigate(['/login'])
    return false
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.canActivate(childRoute, state)
  }
}
