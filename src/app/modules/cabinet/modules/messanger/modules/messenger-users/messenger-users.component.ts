import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MessengerInterface } from '../../../../../../core/interfaces/messenger.interface';
import { MessengerService } from '../../../../../../core/services/messanger/messenger.service';
import { FindUserService } from '../../../../../../shared/components/find-user/find-user.service';
import { CompanionInterface } from '../../../../../../core/interfaces/companion.interface';
import { MessengerHelperService } from '../../../../../../core/services/messanger/messenger-helper.service';
import { UserService } from '../../../../../../core/services/user/user.service';
import { UserRoleBadgeComponent } from '../../../../../../shared/components/user-role-badge/user-role-badge.component';
import { MessengerPopoverComponent } from '../../../../../../shared/components/messenger-popover/messenger-popover.component';
import { MessengerPopoverService } from '../../../../../../shared/components/messenger-popover/messenger-popover.service';
import { UserRoleEnum } from '../../../../../../core/enums/user-role.enum';

@Component({
	selector: 'app-messenger-users',
	templateUrl: './messenger-users.component.html',
	imports: [UserRoleBadgeComponent, MessengerPopoverComponent],
})
export class MessengerUsersComponent implements OnInit, OnDestroy {
	protected readonly UserRoleEnum = UserRoleEnum;

	private _destroy$: Subject<void> = new Subject<void>();

	protected userMessages: WritableSignal<MessengerInterface[]> = signal([]);
	protected isLoading: WritableSignal<boolean> = signal(false);
	protected companionsMap: WritableSignal<CompanionInterface[]> = signal([]);

	constructor(
		private _messengerService: MessengerService,
		private _messengerHelperService: MessengerHelperService,
		private _findUserService: FindUserService,
		private _userService: UserService,
		private _messengerPopoverService: MessengerPopoverService,
	) {}

	private _getDialogs(): void {
		const userId: number | null = this._userService.getIdThisUser();
		if (!userId) return;

		this.isLoading.set(true);
		this._messengerService.getMessengers(userId);

		setTimeout(() => {
			this._messengerService.messengers$
				.pipe(takeUntil(this._destroy$))
				.subscribe((messengers: MessengerInterface[] | null) => {
					if (!messengers) return;
					this.userMessages.set(messengers);
					this._getCompanionsUser();
					this.isLoading.set(false);
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

	protected openPopover(event: MouseEvent, messengerId: number): void {
		event.preventDefault();
		this._messengerPopoverService.openPopover();
		this._messengerPopoverService.setPopoverAction({ event, messengerId });
	}

	ngOnInit(): void {
		this._getDialogs();
	}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
