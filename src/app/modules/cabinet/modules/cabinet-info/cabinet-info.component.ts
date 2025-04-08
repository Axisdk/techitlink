import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { RatingTableComponent } from '../../../../shared/components/rating-table/rating-table.component';
import { MiniMessengerComponent } from '../../../../shared/components/mini-messanger/mini-messenger.component';
import { Subject, takeUntil } from 'rxjs';
import { UserInterface } from '../../../../core/interfaces/user.interface';
import { UserService } from '../../../../core/services/user/user.service';
import { NewsComponent } from '../../../../shared/components/news/news.component';
import { CalendarComponent } from '../../../../shared/components/calendar/calendar.component';
import { UserHelperService } from '../../../../core/services/user/user-helper.service';

@Component({
	selector: 'app-cabinet-info',
	templateUrl: './cabinet-info.component.html',
	imports: [RatingTableComponent, MiniMessengerComponent, NewsComponent, CalendarComponent],
})
export class CabinetInfoComponent implements OnInit {
	public destroy$: Subject<void> = new Subject<void>();
	public user: WritableSignal<UserInterface | null> = signal(null);
	public isLoading: WritableSignal<boolean> = signal(false);

	get userName(): string {
		return this._userHelperService.getUserName(this.user());
	}

	constructor(
		private _userService: UserService,
		private _userHelperService: UserHelperService,
	) {}

	private _initUser(): void {
		this.isLoading.set(true);
		this._userService.user$.pipe(takeUntil(this.destroy$)).subscribe((user: UserInterface | null) => {
			if (!user) return;
			this.user.set(user);
			this.isLoading.set(false);
		});
	}

	ngOnInit(): void {
		this._initUser();
	}
}
