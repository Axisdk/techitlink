import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, GuardResult, MaybeAsync, Router } from '@angular/router';
import { TokenService } from '../services/token/token.service';

@Injectable({
	providedIn: 'root',
})
export class TokenGuard implements CanActivate, CanActivateChild {
	constructor(
		private _router: Router,
		private _tokenService: TokenService,
	) {}

	canActivate(): MaybeAsync<GuardResult> {
		const hasToken: boolean = this._tokenService.checkToken();
		if (hasToken) return true;

		this._router.navigate(['./']);
		return false;
	}

	canActivateChild(): MaybeAsync<GuardResult> {
		return this.canActivate();
	}
}
