import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MessengerInterface } from '../../../../../../core/interfaces/messenger.interface';
import { MessengerService } from '../../../../../../core/services/messanger/messenger.service';
import { FindUserService } from '../../../../../../shared/components/find-user/find-user.service';
import { CompanionInterface } from '../../../../../../core/interfaces/companion.interface';
import { MessengerHelperService } from '../../../../../../core/services/messanger/messenger-helper.service';
import { UserService } from '../../../../../../core/services/user/user.service';

@Component({
	selector: 'app-messenger-users',
	templateUrl: './messenger-users.component.html',
})
export class MessengerUsersComponent implements OnInit, OnDestroy {
	private _destroy$: Subject<void> = new Subject<void>();

	protected userMessages: WritableSignal<MessengerInterface[]> = signal([]);
	protected isLoading: WritableSignal<boolean> = signal(false);
	protected companionsMap: WritableSignal<CompanionInterface[]> = signal([]);

	constructor(
		private _messengerService: MessengerService,
		private _messengerHelperService: MessengerHelperService,
		private _findUserService: FindUserService,
		private _userService: UserService,
	) {}

	private _getDialogs(): void {
		const userId: number | null = this._userService.getIdThisUser();
		if (!userId) return;
		this.isLoading.update((value: boolean): boolean => !value);
		this._messengerService.getMessengers(userId);

		setTimeout(() => {
			this._messengerService.messengers$
				.pipe(takeUntil(this._destroy$))
				.subscribe((messengers: MessengerInterface[] | null) => {
					if (!messengers) return;
					this.userMessages.set(messengers);
					this._getCompanionsUser();
					this.isLoading.update((value: boolean): boolean => !value);
				});
		}, 2000);
	}

	private _getCompanionsUser(): void {
		this.companionsMap.set(this._messengerHelperService.getCompanionsUser(this.userMessages()));
	}

	protected getCompanionName(companion: CompanionInterface): string {
		return this._messengerHelperService.getFullNameCompanion(companion);
	}

	protected getLastMessage(messages: MessengerInterface): string {
		return this._messengerHelperService.getLastMessage(messages);
	}

	protected openMessage(messengerId: number, companion: CompanionInterface): void {
		this._messengerService.getMessengerById(messengerId);
		this._messengerService.setCompanion(companion);
	}

	protected startDialog(): void {
		this._findUserService.toggleModal();
	}

	ngOnInit(): void {
		this._getDialogs();
	}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
