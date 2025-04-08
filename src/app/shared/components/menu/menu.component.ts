import { Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserInterface } from '../../../core/interfaces/user.interface';
import { UserService } from '../../../core/services/user/user.service';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	imports: [RouterModule],
})
export class MenuComponent implements OnInit {
	@Input() user!: UserInterface;

	protected isLoading: WritableSignal<boolean> = signal(false);

	constructor(
		private _router: Router,
		private _userService: UserService,
	) {}

	public logout(): void {
		this._userService.logout();
		this._router.navigate(['/']).then();
		window.location.reload();
	}

	ngOnInit(): void {
		this.isLoading.update((value: boolean): boolean => !value);

		setTimeout(() => {
			if (!this.user) return;
			this.isLoading.update((value: boolean): boolean => !value);
		}, 1500);
	}
}
