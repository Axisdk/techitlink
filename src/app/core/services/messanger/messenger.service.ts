import { Injectable } from '@angular/core';
import { messengerLocalStorage } from '../../consts/messenger-localstorage';
import { MessengerInterface } from '../../interfaces/messenger.interface';
import { MessengersMocks } from '../../../mocks/messenger.mocks';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { UserService } from '../user/user.service';
import { MessageInterface } from '../../interfaces/message.interface';
import { CompanionInterface } from '../../interfaces/companion.interface';
import { UserInterface } from '../../interfaces/user.interface';

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

		allMessengers[dialogIndex] = {
			...allMessengers[dialogIndex],
			messages: [...allMessengers[dialogIndex].messages, newMessage],
		};

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
		console.log(filteredMessenger);
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
		let existingMessenger: MessengerInterface | null = null;

		const alreadyExists: boolean = messengers.some((messenger: MessengerInterface) => {
			const hasDialog: boolean =
				messenger.participants.includes(thisUser) && messenger.participants.includes(userId);
			if (hasDialog && messenger.participants.length === 2) {
				existingMessenger = messenger;
				return true;
			}
			return false;
		});

		const companion: UserInterface | null = this._userService.getUser(userId);
		if (!companion) return;

		if (alreadyExists && existingMessenger) {
			this.companion$.next(companion);
			this.messenger$.next(existingMessenger);
			return;
		}

		const newMessenger: MessengerInterface = {
			id: messengers.length > 0 ? Math.max(...messengers.map((m: MessengerInterface) => m.id)) + 1 : 1,
			participants: [thisUser, userId],
			messages: [],
		};

		messengers.push(newMessenger);
		this._setMessengersInLocalStorage(messengers);
		this.getMessengers(thisUser);

		this.companion$.next(companion);
		this.messenger$.next(newMessenger);
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

	public deleteMessenger(messengerId: number | undefined): boolean {
		if (!messengerId) return false;
		const messengers: MessengerInterface[] = this._getMessengerFromLocalStorage();
		const targetMessenger: MessengerInterface | undefined = messengers.find(
			(m: MessengerInterface) => m.id === messengerId,
		);

		if (!targetMessenger) return false;

		const updatedMessengers: MessengerInterface[] = messengers.filter(
			(messenger: MessengerInterface) => messenger.id !== messengerId,
		);

		this._setMessengersInLocalStorage(updatedMessengers);

		const userId: number | null = this._userService.getIdThisUser();
		if (!userId) return false;

		this.getMessengers(userId);
		this.messenger$.next(null);
		this.companion$.next(null);

		return true;
	}

	public deleteMessage(messageId: number | null): boolean {
		if (!messageId && !this.messenger$.value) return false;

		const messengers: MessengerInterface[] = this._getMessengerFromLocalStorage();
		const targetMessenger: MessengerInterface | undefined = messengers.find(
			(m: MessengerInterface) => m.id === this.messenger$.value?.id,
		);
		if (!targetMessenger) return false;

		targetMessenger.messages = targetMessenger.messages.filter(
			(message: MessageInterface) => message.id !== messageId,
		);

		const updateMessenger: MessengerInterface[] = messengers.map((messenger: MessengerInterface) => {
			if (messenger.id === targetMessenger.id) return targetMessenger;
			return messenger;
		});

		const userId: number | null = this._userService.getIdThisUser();
		if (!userId) return false;

		this._setMessengersInLocalStorage(updateMessenger);
		this.getMessengers(userId);

		return true;
	}
}
