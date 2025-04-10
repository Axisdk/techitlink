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
		const currentMessenger: MessengerInterface | null = this.messenger$.value;
		const allMessengers: MessengerInterface[] = this._getMessengerFromLocalStorage();

		const dialogIndex: number = allMessengers.findIndex(
			(messenger: MessengerInterface): boolean => messenger.id === dialogId,
		);

		if (dialogIndex !== -1) {
			const updatedDialog: MessengerInterface = { ...allMessengers[dialogIndex] };
			updatedDialog.messages = [...updatedDialog.messages, newMessage];
			allMessengers[dialogIndex] = updatedDialog;
		} else if (currentMessenger && currentMessenger.id === dialogId) {
			const newDialog: MessengerInterface = {
				...currentMessenger,
				messages: [...currentMessenger.messages, newMessage],
			};
			allMessengers.push(newDialog);
		} else {
			return;
		}

		this._setMessengersInLocalStorage(allMessengers);

		const filteredMessengers: MessengerInterface[] = allMessengers.filter((messenger: MessengerInterface) =>
			messenger.participants.includes(this._userService.getIdThisUser() || 0),
		);

		this.messengers$.next(filteredMessengers);
		this.getMessengerById(dialogId);
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
		let messengerWithUser: MessengerInterface | null = null;

		const hasMessengerUsers: boolean = messengers.some((messenger: MessengerInterface) => {
			const participants: number[] = messenger.participants;
			const hasDialog: boolean =
				participants.length === 2 && participants.includes(thisUser) && participants.includes(userId);

			if (hasDialog) {
				messengerWithUser = messenger;
				return true;
			}

			return false;
		});

		if (hasMessengerUsers && messengerWithUser) {
			const findCompanionById: CompanionInterface | null = this._userService.getUser(userId);
			if (!findCompanionById) return;

			this.companion$.next(findCompanionById);
			this.messenger$.next(messengerWithUser);
			return;
		}

		const dialogId: number = messengers.length + 1;
		const phantomMessenger: MessengerInterface = {
			id: dialogId,
			participants: [thisUser, userId],
			messages: [],
		};

		const findCompanionById: CompanionInterface | null = this._userService.getUser(userId);
		if (!findCompanionById) return;

		this.companion$.next(findCompanionById);
		this.messenger$.next(phantomMessenger);
	}

	public cleanMessenger(messengerId: number | undefined): boolean {
		if (!messengerId) return false;
		const messengers: MessengerInterface[] = this._getMessengerFromLocalStorage();
		const targetMessenger: MessengerInterface | undefined = messengers.find(
			(m: MessengerInterface) => m.id === messengerId,
		);

		if (!targetMessenger) return false;

		const updatedMessengers: MessengerInterface[] = messengers.map((messenger: MessengerInterface) =>
			messenger.id === messengerId ? { ...messenger, messages: [] } : messenger,
		);

		this._setMessengersInLocalStorage(updatedMessengers);

		const userId: number | null = this._userService.getIdThisUser();
		if (!userId) return false;

		this.getMessengers(userId);

		return true;
	}
}
