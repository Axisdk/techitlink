import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { MessengerInterface } from '../../../core/interfaces/messenger.interface';
import { MessageModalComponent } from '../message-modal/message-modal.component';
import { Subject, takeUntil } from 'rxjs';
import { MessageModalService } from '../message-modal/message-modal.service';
import { CardComponent } from '../card/card.component';
import { MessengerService } from '../../../core/services/messanger/messenger.service';
import { RouterLink } from '@angular/router';
import { MessengerHelperService } from '../../../core/services/messanger/messenger-helper.service';
import { CompanionInterface } from '../../../core/interfaces/companion.interface';
import { UserService } from '../../../core/services/user/user.service';

@Component({
	selector: 'app-mini-messenger',
	templateUrl: 'mini-messenger.component.html',
	imports: [RouterLink, MessageModalComponent, CardComponent],
})
export class MiniMessengerComponent implements OnInit, OnDestroy {
	private _destroy$: Subject<void> = new Subject<void>();

	protected loadingStates: { [key: string]: boolean } = {};
	protected userMessages: WritableSignal<MessengerInterface[]> = signal([]);
	protected companionsMap: WritableSignal<CompanionInterface[]> = signal([]);
	protected isLoading: WritableSignal<boolean> = signal(false);
	protected isOpen: WritableSignal<boolean> = signal(false);

	constructor(
		private _messengerService: MessengerService,
		private _messengerHelperService: MessengerHelperService,
		private _messageModalService: MessageModalService,
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

	private _openMessageModal(): void {
		this._messageModalService.isOpen$
			.pipe(takeUntil(this._destroy$))
			.subscribe((isOpen: boolean) => this.isOpen.set(isOpen));
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

	public openMessage(messengerId: number, companion: CompanionInterface): void {
		this.loadingStates[messengerId] = true;

		setTimeout(() => {
			this._messageModalService.toggleModal();
			this._messengerService.getMessengerById(messengerId);
			this._messengerService.setCompanion(companion);
			this.loadingStates[messengerId] = false;
		}, 1500);
	}

	ngOnInit(): void {
		this._getDialogs();
		this._openMessageModal();
	}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
