import { Injectable } from '@angular/core';
import { messengerLocalStorage } from '../../consts/messenger-localstorage';
import { MessengerInterface } from '../../interfaces/messenger.interface';
import { MessengersMocks } from '../../../mocks/messenger.mocks';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { UserService } from '../user/user.service';
import { MessageInterface } from '../../interfaces/message.interface';
import { CompanionInterface } from '../../interfaces/companion.interface';

@Injectable()
export class MessengerService {
	protected readonly MessengerMocks: MessengerInterface[] = MessengersMocks;

	public messengers$: BehaviorSubject<MessengerInterface[] | null> = new BehaviorSubject<MessengerInterface[] | null>(
		null,
	);
	public messenger$: BehaviorSubject<MessengerInterface | null> = new BehaviorSubject<MessengerInterface | null>(
		null,
	);

	public companion$: BehaviorSubject<CompanionInterface | null> = new BehaviorSubject<CompanionInterface | null>(
		null,
	);

	private _destroy$: Subject<void> = new Subject();

	constructor(private _userService: UserService) {}

	private _setMessengersInLocalStorage(messenger: MessengerInterface[]): void {
		localStorage.setItem(messengerLocalStorage, JSON.stringify(messenger));
	}

	private _getMessengerFromLocalStorage(): MessengerInterface[] {
		const messenger: string | null = localStorage.getItem(messengerLocalStorage);
		if (messenger) return JSON.parse(messenger);

		this._setMessengersInLocalStorage(this.MessengerMocks);
		return this.MessengerMocks;
	}

	public sendMessage(dialogId: number, newMessage: MessageInterface): void {
		const allMessengers: MessengerInterface[] = this._getMessengerFromLocalStorage();
		const dialogIndex: number = allMessengers.findIndex(
			(messenger: MessengerInterface): boolean => messenger.id === dialogId,
		);

		if (dialogIndex === -1) return;

		const updatedDialog: MessengerInterface = { ...allMessengers[dialogIndex] };
		updatedDialog.messages = [...updatedDialog.messages, newMessage];
		allMessengers[dialogIndex] = updatedDialog;

		this._setMessengersInLocalStorage(allMessengers);

		const filteredMessengers: MessengerInterface[] = allMessengers.filter((messenger: MessengerInterface) =>
			messenger.participants.includes(this._userService.getIdThisUser() || 0),
		);

		this.messengers$.next(filteredMessengers);
	}

	public getMessengers(userId: number): void {
		const messengers: MessengerInterface[] = this._getMessengerFromLocalStorage();

		const filteredMessenger: MessengerInterface[] = messengers.filter((messenger: MessengerInterface) =>
			messenger.participants.includes(userId),
		);

		this.messengers$.next(filteredMessenger);
	}

	public getMessengerById(messengerId: number): void {
		this.messengers$.pipe(takeUntil(this._destroy$)).subscribe((messengers: MessengerInterface[] | null) => {
			if (!messengers) return;

			const foundMessenger: MessengerInterface | undefined = messengers.find(
				(messenger: MessengerInterface) => messenger.id === messengerId,
			);

			if (!foundMessenger) return;

			this.messenger$.next(foundMessenger);
		});
	}

	public setCompanion(companion: CompanionInterface): void {
		this.companion$.next(companion);
	}

	public createMessengers(userId: number): void {
		const thisUser: number | null = this._userService.getIdThisUser();
		if (!thisUser) return;

		const messengers: MessengerInterface[] = this._getMessengerFromLocalStorage();

		const hasMessengerUsers: boolean = messengers.some((messenger: MessengerInterface) => {
			const participants: number[] = messenger.participants;
			return participants.length === 2 && participants.includes(thisUser) && participants.includes(userId);
		});

		if (hasMessengerUsers) console.log(hasMessengerUsers);

		// const newMessenger: MessengerInterface = {
		//   id: messengers.length + 1,
		//   participants: [thisUser, userId],
		//   messages: []
		// }
		//
		// messengers.push(newMessenger)
		// this.setMessengersInLocalStorage(messengers)
	}
}
