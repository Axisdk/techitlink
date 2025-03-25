import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate, CanActivateChild,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import {TokenService} from "../services/token/token.service";

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate, CanActivateChild {

  constructor(
    private _router: Router,
    private _tokenService: TokenService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if(this._tokenService.checkToken()) {
      return true
    }

    this._router.navigate(['/login'])
    return false
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.canActivate(childRoute, state)
  }

}
