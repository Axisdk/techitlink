import { Injectable } from '@angular/core';
import { MessageInterface } from '../../interfaces/message.interface';
import { UserService } from '../user/user.service';
import { MessengerInterface } from '../../interfaces/messenger.interface';
import { CompanionInterface } from '../../interfaces/companion.interface';
import { UserInterface } from '../../interfaces/user.interface';

@Injectable()
export class MessengerHelperService {
	constructor(private _userService: UserService) {}

	public getLastMessage(messages: MessengerInterface): string {
		if (!messages) return '';
		return messages.messages[messages.messages.length - 1].message;
	}

	public getFullNameCompanion(companion: CompanionInterface): string {
		if (!companion) return '';
		return companion.lname + ' ' + companion.fname;
	}

	public setMessage(message: string): MessageInterface {
		return {
			id: new Date().getTime(),
			senderId: this._userService.getIdThisUser() ?? 0,
			message: message,
		};
	}

	public getCompanionsUser(userMessages: MessengerInterface[]): CompanionInterface[] {
		const companionsMap: CompanionInterface[] | null = [];

		const uniqueCompanions: Set<number> = new Set<number>();

		userMessages.forEach((message: MessengerInterface) => {
			const companionId: number | undefined = message.participants.find(
				(id: number): boolean => id !== this._userService.getIdThisUser(),
			);

			if (companionId && !uniqueCompanions.has(companionId)) {
				uniqueCompanions.add(companionId);

				const user: UserInterface | null = this._userService.getUser(companionId);

				if (user) {
					companionsMap.push({
						id: user.id,
						fname: user.fname,
						lname: user.lname,
						avatar_url: user.avatar_url,
						role: user.role,
					});
				}
			}
		});

		return companionsMap;
	}
}
