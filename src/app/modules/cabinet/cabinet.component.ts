import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { TopLineComponent } from '../../shared/components/top-line/top-line.component';
import { Subject, takeUntil } from 'rxjs';
import { UserInterface } from '../../core/interfaces/user.interface';
import { UserService } from '../../core/services/user/user.service';

@Component({
	selector: 'app-cabinet',
	templateUrl: './cabinet.component.html',
	imports: [MenuComponent, TopLineComponent, RouterOutlet],
})
export class CabinetComponent implements OnInit {
	public destroy$: Subject<void> = new Subject<void>();
	public user!: UserInterface;

	constructor(private _userService: UserService) {}

	ngOnInit(): void {
		this._userService.user$.pipe(takeUntil(this.destroy$)).subscribe((user: UserInterface | null) => {
			if (!user) return;
			this.user = user;
		});
	}
}
