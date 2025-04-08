import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, GuardResult, MaybeAsync, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
	constructor(
		private _router: Router,
		private _userService: UserService,
	) {}

	canActivate(): MaybeAsync<GuardResult> {
		if (this._userService.checkAuthUser()) {
			return true;
		}

		this._router.navigate(['/auth']);
		return false;
	}

	canActivateChild(): MaybeAsync<GuardResult> {
		return this.canActivate();
	}
}
