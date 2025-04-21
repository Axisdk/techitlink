import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { RatingTableComponent } from '../../../../shared/components/rating-table/rating-table.component';
import { MiniMessengerComponent } from '../../../../shared/components/mini-messanger/mini-messenger.component';
import { Subject, takeUntil } from 'rxjs';
import { UserInterface } from '../../../../core/interfaces/user.interface';
import { UserService } from '../../../../core/services/user/user.service';
import { NewsComponent } from '../../../../shared/components/news/news.component';
import { CalendarComponent } from '../../../../shared/components/calendar/calendar.component';
import { UserHelperService } from '../../../../core/services/user/user-helper.service';
import { MessengerService } from '../../../../core/services/messanger/messenger.service';
import { UserRoleEnum } from '../../../../core/enums/user-role.enum';

@Component({
	selector: 'app-cabinet-info',
	templateUrl: './cabinet-info.component.html',
	imports: [RatingTableComponent, MiniMessengerComponent, NewsComponent, CalendarComponent],
})
export class CabinetInfoComponent implements OnInit, OnDestroy {
	private _destroy$: Subject<void> = new Subject<void>();
	protected user: WritableSignal<UserInterface | null> = signal(null);
	protected isLoading: WritableSignal<boolean> = signal(false);

	get userName(): string {
		return this._userHelperService.getUserName(this.user());
	}

	constructor(
		private _userService: UserService,
		private _userHelperService: UserHelperService,
		private _messengerService: MessengerService,
	) {}

	private _initUser(): void {
		this.isLoading.set(true);
		this._userService.user$.pipe(takeUntil(this._destroy$)).subscribe((user: UserInterface | null) => {
			if (!user) return;
			this.user.set(user);
			this.isLoading.set(false);
		});
	}

	ngOnInit(): void {
		this._initUser();
	}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
		this._messengerService.messengers$.next(null);
		this._messengerService.messenger$.next(null);
		this._messengerService.companion$.next(null);
	}

	protected readonly UserRoleEnum = UserRoleEnum;
}
