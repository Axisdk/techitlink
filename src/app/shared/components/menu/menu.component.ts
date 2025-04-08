import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserInterface } from '../../../core/interfaces/user.interface';
import { UserService } from '../../../core/services/user/user.service';
import { Subject, takeUntil } from 'rxjs';
import { UserHelperService } from '../../../core/services/user/user-helper.service';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	imports: [RouterModule],
})
export class MenuComponent implements OnInit, OnDestroy {
	private _destroy$: Subject<void> = new Subject();

	protected user: WritableSignal<UserInterface | null> = signal(null);
	protected isLoading: WritableSignal<boolean> = signal(false);

	get userName(): string {
		return this._userHelperService.getUserName(this.user()!);
	}

	constructor(
		private _router: Router,
		private _userService: UserService,
		private _userHelperService: UserHelperService,
	) {}

	private _initUser(): void {
		this._userService.user$.pipe(takeUntil(this._destroy$)).subscribe((user: UserInterface | null) => {
			if (!user) return;
			this.user.set(user);
		});
	}

	protected logout(): void {
		this._userService.logout();
		this._router.navigate(['/']).then();
		window.location.reload();
	}

	ngOnInit(): void {
		this.isLoading.update((value: boolean): boolean => !value);

		setTimeout(() => {
			this._initUser();
			this.isLoading.update((value: boolean): boolean => !value);
		}, 1500);
	}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
